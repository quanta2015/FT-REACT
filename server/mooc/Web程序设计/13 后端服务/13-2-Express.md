Express

1. 初始化Express
首先，我们新建一个目录 myblog，在该目录下运行 npm init 生成一个 package.json。一般直接采用默认值即可，即直接回车，否则输入自定义内容后回车。

然后安装 express 并写入 package.json：

npm i express@4.14.0 --save
新建 index.js，添加如下代码：

var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('hello, express');
});

app.listen(3000);
以上代码的意思是：生成一个 express 实例 app，挂载了一个根路由控制器，然后监听 3000 端口并启动程序。运行 node index，打开浏览器访问 localhost:3000 时，页面应显示 hello, express。

这是最简单的一个使用 express 的例子，后面会介绍路由及模板的使用。

2. supervisor自动更新
在开发过程中，每次修改代码保存后，我们都需要手动重启程序，才能查看改动的效果。使用 supervisor 可以解决这个繁琐的问题，全局安装 supervisor：

npm install -g supervisor
运行 supervisor --harmony index 启动程序。supervisor 会监听当前目录下 node 和 js 后缀的文件，当这些文件发生改动时，supervisor 会自动重启程序。

3. 路由
前面我们只是挂载了根路径的路由控制器，现在修改 index.js 如下：

var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('hello, express');
});

app.get('/users/:name', function(req, res) {
  res.send('hello, ' + req.params.name);
});

app.listen(3000);
以上代码的意思是：当访问根路径时，依然返回 hello, express，当访问如 localhost:3000/users/nswbmw 路径时，返回 hello, nswbmw。路径中 :name 起了占位符的作用，这个占位符的名字是 name，可以通过 req.params.name 取到实际的值。

小提示：express 使用了 path-to-regexp 模块实现的路由匹配。

不难看出：req 包含了请求来的相关信息，res 则用来返回该请求的响应，更多请查阅 express 官方文档。下面介绍几个常用的 req 的属性：

req.query: 解析后的 url 中的 querystring，如 ?name=haha，req.query 的值为 {name: 'haha'}

req.params: 解析 url 中的占位符，如 /:name，访问 /haha，req.params 的值为 {name: 'haha'}

req.body: 解析后请求体，需使用相关的模块，如 body-parser，请求体为 {"name": "haha"}，则 req.body 为 {name: 'haha'}

4. express.Router
上面只是很简单的路由使用的例子（将所有路由控制函数都放到了 index.js），但在实际开发中通常有几十甚至上百的路由，都写在 index.js 既臃肿又不好维护，这时可以使用 express.Router 实现更优雅的路由解决方案。在 myblog 目录下创建空文件夹 routes，在 routes 目录下创建 index.js 和 users.js。最后代码如下：

index.js

var express = require('express');
var app = express();
var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', userRouter);

app.listen(3000);
routes/index.js

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('hello, express');
});

module.exports = router;
routes/users.js

var express = require('express');
var router = express.Router();

router.get('/:name', function(req, res) {
  res.send('hello, ' + req.params.name);
});

module.exports = router;
以上代码的意思是：我们将 / 和 /users/:name 的路由分别放到了 routes/index.js 和 routes/users.js 中，每个路由文件通过生成一个 express.Router 实例 router 并导出，通过 app.use 挂载到不同的路径。这两种代码实现了相同的功能，但在实际开发中推荐使用 express.Router 将不同的路由分离到不同的路由文件中。

更多 express.Router 的用法见 express 官方文档。

模板引擎（Template Engine）是一个将页面模板和数据结合起来生成 html 的工具。上例中，我们只是返回纯文本给浏览器，现在我们修改代码返回一个 html 页面给浏览器。

5. ejs模板
模板引擎有很多，ejs 是其中一种，因为它使用起来十分简单，而且与 express 集成良好，所以我们使用 ejs。安装 ejs：

npm i ejs --save
修改 index.js 如下：

index.js

var path = require('path');
var express = require('express');
var app = express();
var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');

app.set('views', path.join(__dirname, 'views'));// 设置存放模板文件的目录
app.set('view engine', 'ejs');// 设置模板引擎为 ejs

app.use('/', indexRouter);
app.use('/users', userRouter);

app.listen(3000);
通过 app.set 设置模板引擎为 ejs 和存放模板的目录。在 myblog 下新建 views 文件夹，在 views 下新建 users.ejs，添加如下代码：

views/users.ejs

<!DOCTYPE html>
<html>
  <head>
    <style type="text/css">
      body {padding: 50px;font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;}
    </style>
  </head>
  <body>
    <h1><%= name.toUpperCase() %></h1>
    <p>hello, <%= name %></p>
  </body>
</html>
修改 routes/users.js 如下：

routes/users.js

var express = require('express');
var router = express.Router();

router.get('/:name', function(req, res) {
  res.render('users', {
    name: req.params.name
  });
});

module.exports = router;
通过调用 res.render 函数渲染 ejs 模板，res.render 第一个参数是模板的名字，这里是 users 则会匹配 views/users.ejs，第二个参数是传给模板的数据，这里传入 name，则在 ejs 模板中可使用 name。res.render 的作用就是将模板和数据结合生成 html，同时设置响应头中的 Content-Type: text/html，告诉浏览器我返回的是 html，不是纯文本，要按 html 展示。现在我们访问 localhost:3000/users/haha，如下图所示：



nodeexp01.png

上面代码可以看到，我们在模板 <%= name.toUpperCase() %> 中使用了 JavaScript 的语法 .toUpperCase() 将名字转化为大写，那这个 <%= xxx %>是什么东西呢？ejs 有 3 种常用标签：

<% code %>：运行 JavaScript 代码，不输出

<%= code %>：显示转义后的 HTML内容

<%- code %>：显示原始 HTML 内容

注意：<%= code %> 和 <%- code %> 都可以是 JavaScript 表达式生成的字符串，当变量 code 为普通字符串时，两者没有区别。当 code 比如为 <h1>hello</h1> 这种字符串时，<%= code %> 会原样输出 <h1>hello</h1>，而 <%- code %> 则会显示 H1 大的 hello 字符串。

下面的例子解释了 <% code %> 的用法：

Data

supplies: ['mop', 'broom', 'duster']
Template

<ul>
<% for(var i=0; i<supplies.length; i++) {%>
   <li><%= supplies[i] %></li>
<% } %>
</ul>
Result

<ul>
  <li>mop</li>
  <li>broom</li>
  <li>duster</li>
</ul>
更多 ejs 的标签请看 官方文档。

6. includes
我们使用模板引擎通常不是一个页面对应一个模板，这样就失去了模板的优势，而是把模板拆成可复用的模板片段组合使用，如在 views 下新建 header.ejs 和 footer.ejs，并修改 users.ejs：

views/header.ejs

<!DOCTYPE html>
<html>
  <head>
    <style type="text/css">
      body {padding: 50px;font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;}
    </style>
  </head>
  <body>
views/footer.ejs

  </body>
</html>
views/users.ejs

<%- include('header') %>
  <h1><%= name.toUpperCase() %></h1>
  <p>hello, <%= name %></p>
<%- include('footer') %>
我们将原来的 users.ejs 拆成出了 header.ejs 和 footer.ejs，并在 users.ejs 通过 ejs 内置的 include 方法引入，从而实现了跟以前一个模板文件相同的功能。

小提示：拆分模板组件通常有两个好处：

模板可复用，减少重复代码

主模板结构清晰

注意：要用 <%- include('header') %> 而不是 <%= include('header') %>

前面我们讲解了 express 中路由和模板引擎 ejs 的用法，但 express 的精髓并不在此，在于中间件的设计理念。

7. 中间件与 next
express 中的中间件（middleware）就是用来处理请求的，当一个中间件处理完，可以通过调用 next() 传递给下一个中间件，如果没有调用 next()，则请求不会往下传递，如内置的 res.render 其实就是渲染完 html 直接返回给客户端，没有调用 next()，从而没有传递给下一个中间件。看个小例子，修改 index.js 如下：

index.js

var express = require('express');
var app = express();

app.use(function(req, res, next) {
  console.log('1');
  next();
});

app.use(function(req, res, next) {
  console.log('2');
  res.status(200).end();
});

app.listen(3000);
此时访问 localhost:3000，终端会输出：

1
2
通过 app.use 加载中间件，在中间件中通过 next 将请求传递到下一个中间件，next 可接受一个参数接收错误信息，如果使用了 next(error)，则会返回错误而不会传递到下一个中间件，修改 index.js 如下：

index.js

var express = require('express');
var app = express();

app.use(function(req, res, next) {
  console.log('1');
  next(new Error('haha'));
});

app.use(function(req, res, next) {
  console.log('2');
  res.status(200).end();
});

app.listen(3000);
此时访问 localhost:3000，终端会输出错误信息：



nodeexp02.png

浏览器会显示：



nodeexp03.png

小提示：app.use 有非常灵活的使用方式，详情见 官方文档。

express 有成百上千的第三方中间件，在开发过程中我们首先应该去 npm 上寻找是否有类似实现的中间件，尽量避免造轮子，节省开发时间。下面给出几个常用的搜索 npm 模块的网站：

http://npmjs.com(npm 官网)

http://node-modules.com

https://npms.io

https://nodejsmodules.org

小提示：express@4 之前的版本基于 connect 这个模块实现的中间件的架构，express@4 及以上的版本则移除了对 connect 的依赖自己实现了，理论上基于 connect 的中间件（通常以 connect- 开头，如 connect-mongo）仍可结合 express 使用。

注意：中间件的加载顺序很重要！比如：通常把日志中间件放到比较靠前的位置，后面将会介绍的 connect-flash 中间件是基于 session 的，所以需要在 express-session 后加载。

8. 错误处理
上面的例子中，应用程序为我们自动返回了错误栈信息（express 内置了一个默认的错误处理器），假如我们想手动控制返回的错误内容，则需要加载一个自定义错误处理的中间件，修改 index.js 如下：

index.js

var express = require('express');
var app = express();

app.use(function(req, res, next) {
  console.log('1');
  next(new Error('haha'));
});

app.use(function(req, res, next) {
  console.log('2');
  res.status(200).end();
});

//错误处理
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000);
此时访问 localhost:3000，浏览器会显示 Something broke!。

小提示：关于 express 的错误处理，详情见 官方文档。





9. 解决跨域访问 Access-Control-Allow-Origin
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type,Accept');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
    next();
});