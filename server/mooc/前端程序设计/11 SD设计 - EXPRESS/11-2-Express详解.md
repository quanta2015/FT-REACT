title: Express 详解
theme: light

[slide]  
# Express
Express 是一个第三方模块，对原生模块封装了一套更灵活、更简洁的应用框架，其在 Node.js 环境的地位和作用好比 jQuery 在前端的地位和作用。


[slide]  
# 路由
在 BS 架构中，路由的概念都是一样的，可理解为根据客户端请求的 URL 映射到不同的方法实现，更多的一般都是针对 URL 中的路径，或者是参数，又或者是锚点这些信息进行映射。


[slide]  
# Express 使用
- 因为 Express 是第三方模块，所以在使用前要先安装 `npm install express`
- 加载模块
```javascript
var express = require('express');
var app = express();
```


[slide]  

- 开启服务器，定义端口8080：
```javascript
app.listen(8080, function(){
    console.log('Server running on http://localhost:8080');
});
```


[slide]  
# Express -- GET
- 定义根路由，我们定义端口为 8080，当我们访问：http://localhost:8080/，会自动触发方法，会在页面上显示 Root Page。
- `response.send()` 可理解为 `response.end()`，其中一个不同点在于 `response.send()` 参数可为对象。
- 只有 GET 访问能触发
```js
app.get('/', function(request, response){
    response.send('Root Page');
})
```


[slide]  
# app.js逻辑
app是Express的主要逻辑框架，它主要包括4部分内容：

1. 初始化各种依赖模块，比如 `cookie` 、`body-parser`、`session` 等；  
2. 创建视图模板,比如`handlebar`;
3. 创建路由映射；  
4. 创建错误处理逻辑，主要包括`500错误`和`404错误`  



[slide]  
```js
var express = require('express');                       //express对象
var path = require('path');                             //路径对象
var favicon = require('serve-favicon');                 //图标对象
var logger = require('morgan');                         //日志对象
var cookieParser = require('cookie-parser');            //cooke对象
var bodyParser = require('body-parser');                //req的body对象

var routes = require('./routes/index');                 //index路由对象
var users = require('./routes/users');                  //user路由对象

var app = express();

app.set('views', path.join(__dirname, 'views'));        //设置视图模板存放的路径
app.set('view engine', 'hbs');                          //设置视图模板的类型为handlebar

app.use(logger('dev'));                                 //开发模式启用日志
app.use(bodyParser.json());                             //接受json请求
app.use(bodyParser.urlencoded({ extended: false }));    //接受form请求
app.use(cookieParser());                                //启用cookie解析
app.use(express.static(path.join(__dirname, 'public')));//设置静态文件路径

app.use('/', routes);                                   //设置根目录路由
app.use('/users', users);                               //设置users目录路由

//处理404错误
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//处理500错误
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
```



[slide]  

- 定义 getUsers 路由，当我们访问：http://localhost:8080/getusers，会自动触发方法，会在页面上显示 getUsers Page。
```javascript
app.get('/getUsers', function(request, response){
    response.send('getUsers Page');
})
```

[slide]  

- Node.js 默认是不能访问静态资源文件（*.html、*.js、*.css、*.jpg 等），如果要访问服务端的静态资源文件则要用到方法 `sendFile`
- __dirname 为 Node.js 的系统变量，指向文件的绝对路径。
```javascript
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
});
```


[slide]  
### Express -- GET 参数接收之 Query Strings
访问地址：`http://localhost:8080/getusers?username=dk&age=18`，可通过 `request.query` 来获取参数
```javascript
app.get('/getUsers', function(request, response){
    var params = {
        username: request.query.username,
        age: request.query.age
    }
    response.send(params);
})
```

[slide]  
### Express -- GET 参数接收之路径方式
访问地址：`http://localhost:8080/getusers/admin/18`，可通过 `request.params` 来获取参数
```javascript
app.get('/getUsers/:username/:age', function(request, response){
    var params = {
        username: request.params.username,
        age: request.params.age
    }
    response.send(params);
})
```


[slide]  
## Express -- POST
- post 参数接收，可依赖第三方模块 body-parser 进行转换会更方便、更简单，该模块用于处理 JSON, Raw, Text 和 URL 编码的数据。
- 安装 body-parser `npm install body-parser`
- 参数接受和 GET 基本一样，不同的在于 GET 是 `request.query` 而 POST 的是 `request.body`
```javascript
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/getUsers', urlencodedParser, function (request, response) {
    var params = {
        username: request.body.username,
        age: request.body.age
    }
   response.send(params);
});
```


[slide]  
# 跨域支持

- 通过代码设置头文件
- 加载cors包

```js
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") {
      res.send(200);/*让options请求快速返回*/
    } else{
      next();
    }
});
```




[slide]  
# 过滤器
在进入某个路由前先经过一个过滤逻辑，这个称之为过滤器。最常用的就是身份认证之类的操作。


[slide]  
## 简单使用
```javascript
const express = require('express')
const app = express();
let filter = (req, res, next) => {
    if(req.params.name == 'admin' && req.params.pwd == 'admin'){
        next()
    } else {
        next('用户名密码不正确')
    }
    
}
app.get('/:name/:pwd', filter, (req, res) => {
    res.send('ok')
}).listen(88)
```


[slide]  
### 运行规则
- 访问 `http://localhost:88/admin/admin`
- 首先会进入过滤器方法 filter
- next()，不带任何参数，表示会直接进入目标路由，执行路由逻辑
- next('')，带参数，表示不会进入目标路由，并抛出错误。


[slide]  
## 全局使用--use
表示进入所有目标路由前都会先进入过滤器方法


[slide]  
### 简单使用
```javascript
const express = require('express')
const app = express();
let filter = (req, res, next) => {
    if(req.params.name == 'admin' && req.params.pwd == 'admin'){
        next()
    } else {
        next('用户名密码不正确')
    }
}
app.use(filter);
app.get('/:name/:pwd', (req, res) => {
    res.send('ok')
}).listen(88)
```


[slide]  
### 访问所有静态资源文件
```javascript
app.use(express.static(path.join(__dirname, '/')));
```


[slide]  
### 所有 post 使用 body-parser
```javascript
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
```


[slide]  
# 文件上传
- body-parser 并不支持文件上传，所以这里要用到另一个第三方模块 multer
- 安装 multer `npm install multer`
- 使用前先定义上传的路径


[slide]  
## 单文件上传
```javascript
//引入express模块  
var express = require('express');  
//引入multer模块  
var multer = require ('multer');
var path = require('path')  ;
//设置上传的目录，  
var upload = multer({ dest:  path.join(__dirname,'temp')});  
var app = express(); 
app.use(express.static(path.join(__dirname, '/')));
app.post('/singleUpload', upload.single('avatar'), function (req, res, next) {  
    console.log(req.file);  
    console.log(req.body);  
    res.end("上传成功");  
});  
app.listen(88)  
```

```html
<form action="http://localhost:88/singleUpload" method="post" enctype="multipart/form-data">
    <input type="text" name="username" id="">
    <input type="text" name="pwd" id="">
    <input type="file" name="avatar" id="">
    <input type="submit" value="submit">
</form>
```


[slide]  
## 多文件上传  
```javascript
//注意上传界面中的 <input type="file" name="photos"/>中的name必须是下面代码中指定的名  
app.post('/mulUpload', upload.array('photos', 12), function (req, res, next) {  
  console.log(req.files);  
  console.log(req.body);  
  res.end(req.file + "<br/><br/>" + req.body);  
}) 
```


[slide]  
### 原生js
```html
    <form>
        <input type="text" name="username" id="username">
        <input type="text" name="pwd" id="pwd">
        <input type="file" name="photos" id="photos" multiple>
        <input type="button" value="submit" id="btn_submit">
    </form>
    <script>
        window.onload = function(){
            document.getElementById('btn_submit').onclick = function(){
                var myForm = new FormData();    // 创建一个空的FormData对象
                myForm.append("username", document.querySelector('#username').value);       // append()方法添加字段
                myForm.append("pwd", document.querySelector('#pwd').value);   // 数字123456立即被转换成字符串“123456”
                
                let files = document.querySelector('[type=file]').files;
                for(var i = 0; i < files.length; i++){
                    myForm.append("photos", files[i]);                
                }                

                var xhr = new XMLHttpRequest();
                xhr.open("POST","mulUpload");
                xhr.send(myForm);
            }
        }
    </script>    
```


[slide]  
### jquery
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="https://cdn.bootcss.com/jquery/3.1.1/jquery.js"></script>
</head>
<body>
    <form>
        <input type="text" name="username" id="username">
        <input type="text" name="pwd" id="pwd">
        <input type="file" name="photos" id="photos" multiple>
        <input type="button" value="submit" id="btn_submit">
    </form>

    <script>
        $(function(){
            $('#btn_submit').click(function(){
                var myForm = new FormData();    // 创建一个空的FormData对象
                myForm.append("username", document.querySelector('#username').value);       // append()方法添加字段
                myForm.append("pwd", document.querySelector('#pwd').value);   // 数字123456立即被转换成字符串“123456”
                let files = document.querySelector('[type=file]').files;
                for(var i = 0; i < files.length; i++){
                    myForm.append("photos", files[i]);                
                }
                $.ajax({
                    url: 'mulUpload',
                    type: 'post',
                    data: myForm,
                    contentType: false,
                    processData: false,
                    success: function(res){
                        console.log(res)
                    }
                })
            })
        })
    </script>
</body>
</html>
```


[slide]  
## 全局本地存储
```javascript
var express = require('express');  
var multer = require ('multer');
var path = require('path')  ;
var fs = require('fs');
// 设置上传的目录
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var _path = path.join(__dirname, "../uploadFile");
        if(!fs.existsSync(_path)){
            fs.mkdirSync(_path);
        }
        cb(null, _path);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null, file.originalname);  
    }
});
// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage })
var app = express(); 
app.use(express.static(path.join(__dirname, '/')));
app.post('/singleUpload', upload.single('photos'), function (req, res, next) {  
    console.log(req.file);  
    console.log(req.body);  
    res.end("上传成功");  
});  

app.post('/mulUpload', upload.array('photos', 12), function (req, res, next) {  
    console.log(req.files);  
    console.log(req.body);  
    res.end("上传成功");  
})
app.listen(88)
```





[slide]  
# 操作 MongoDB
官方 api `http://mongodb.github.io/node-mongodb-native/`

```javascript
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var db;
MongoClient.connect("mongodb://localhost:27017/test1705candel", function(err, database) {
  if(err) throw err;
  db = database;
});
module.exports = {
    insert: function(_collection, _data, _callback){
        var i = db.collection(_collection).insert(_data).then(function(result){
            _callback(result);
        });
    },
    select: function(_collection, _condition, _callback){
        var i = db.collection(_collection).find(_condition || {}).toArray(function(error, dataset){
            _callback({status: true, data: dataset});
        })
    }
}
```


[slide]  
# 操作 MySql
```javascript
var mysql = require('mysql');
//创建连接池
var pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  port: 3306,
  database: '1000phone',
  multipleStatements: true
});
module.exports = {
    select: function(tsql, callback){
        pool.query(tsql, function(error, rows){
      if(rows.length > 1){
        callback({rowsCount: rows[1][0]['rowsCount'], data: rows[0]});
      } else {
        callback(rows);
      }
        })
    }
}
```


[slide]  
# Session
Session 是一种记录客户状态的机制，不同的是 Cookie 保存在客户端浏览器中，而 Session 保存在服务器上的进程中。

客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上，这就是 Session。客户端浏览器再次访问时只需要从该 Session 中查找该客户的状态就可以了。

如果说 Cookie 机制是通过检查客户身上的“通行证”来确定客户身份的话，那么 Session 机制就是通过检查服务器上的“客户明细表”来确认客户身份。

Session 相当于程序在服务器上建立的一份客户档案，客户来访的时候只需要查询客户档案表就可以了。

Session 不能跨域


[slide]  
## Session 与 Cookie 的区别
- Cookie 数据存放在客户的浏览器上，Session 数据放在服务器上的进程中。
- Cookie 不是很安全，别人可以分析存放在本地的 Cookie 并进行 Cookie 欺骗 考虑到安全应当使用 Session。
- Session 会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能
- 单个 Cookie 保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个 Cookie。


[slide]  
## Session 应用
```javascript
const express = require('express')
const path = require('path')
const app = express();
const bodyParser = require('body-parser');
const cp = require('cookie-parser');
const session = require('express-session');
app.use(cp());
app.use(session({
    secret: '12345',//用来对session数据进行加密的字符串.这个属性值为必须指定的属性
    name: 'testapp', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 5000 }, //设置maxAge是5000ms，即5s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,    
}))
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/')));

app.get('/setsession', (request, response) => {
    request.session.user = {username: 'admin'};
    response.send('set session success');
})
app.get('/getsession', (request, response) => {
    response.send(request.session.user);
})
app.get('/delsession', (request, response) => {
    delete reqeust.session.user;
    response.send(request.session.user);
})
app.listen(88)
```


[slide]  
# 路由

*路由*表示应用程序端点 (URI) 的定义以及端点响应客户机请求的方式。
有关路由的简介，请参阅[基本路由](/{{ page.lang }}/starter/basic-routing.html)。


[slide]  
以下代码是非常基本的路由示例。

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});
</code>
</pre>


[slide]  
# 路由方法

路由方法派生自 HTTP 方法之一，附加到 `express` 类的实例。

以下代码是为访问应用程序根目录的 GET 和 POST 方法定义的路由示例。

<pre>
<code class="language-javascript" translate="no">
// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage');
});

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage');
});
</code>
</pre>


[slide]  

Express 支持对应于 HTTP 方法的以下路由方法：`get`、`post`、`put`、`head`、`delete`、`options`、`trace`、`copy`、`lock`、`mkcol`、`move`、`purge`、`propfind`、`proppatch`、`unlock`、`report`、`mkactivity`、`checkout`、`merge`、`m-search`、`notify`、`subscribe`、`unsubscribe`、`patch`、`search` 和 `connect`。


要路由会转换为无效 JavaScript 变量名称的方法，请使用括号表示法。例如，`app['m-search']('/', function ...`

有一种特殊路由方法：`app.all()`，它并非派生自 HTTP 方法。该方法用于在所有请求方法的路径中装入中间件函数。


[slide]  

在以下示例中，无论您使用 GET、POST、PUT、DELETE 还是在 [http 模块](https://nodejs.org/api/http.html#http_http_methods)中支持的其他任何 HTTP 请求方法，都将为针对“/secret”的请求执行处理程序。

<pre>
<code class="language-javascript" translate="no">
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});
</code>
</pre>


[slide]  
# 路由路径

路由路径与请求方法相结合，用于定义可以在其中提出请求的端点。路由路径可以是字符串、字符串模式或正则表达式。

Express 使用 [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) 来匹配路由路径；请参阅 path-to-regexp 文档以了解定义路由路径时所有的可能性。[Express Route Tester](http://forbeslindesay.github.io/express-route-tester/) 

查询字符串不是路由路径的一部分。


[slide]  
基于字符串的路由路径的范例，此路由路径将请求与根路由 `/` 匹配。

<pre>
<code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.send('root');
});
</code>
</pre>


[slide]  
此路由路径将请求与 `/about` 匹配。

<pre>
<code class="language-javascript" translate="no">
app.get('/about', function (req, res) {
  res.send('about');
});
</code>
</pre>


[slide]  
此路由路径将请求与 `/random.text` 匹配。

<pre>
<code class="language-javascript" translate="no">
app.get('/random.text', function (req, res) {
  res.send('random.text');
});
</code>
</pre>


[slide]  
此路由路径将匹配 `acd` 和 `abcd`。

<pre>
<code class="language-javascript" translate="no">
app.get('/ab?cd', function(req, res) {
  res.send('ab?cd');
});
</code>
</pre>


[slide]  
此路由路径将匹配 `abcd`、`abbcd`、`abbbcd` 等。

<pre>
<code class="language-javascript" translate="no">
app.get('/ab+cd', function(req, res) {
  res.send('ab+cd');
});
</code>
</pre>


[slide]  
此路由路径将匹配 `abcd`、`abxcd`、`abRABDOMcd`、`ab123cd` 等。

<pre>
<code class="language-javascript" translate="no">
app.get('/ab*cd', function(req, res) {
  res.send('ab*cd');
});
</code>
</pre>


[slide]  
此路由路径将匹配 `/abe` 和 `/abcde`。

<pre>
<code class="language-javascript" translate="no">
app.get('/ab(cd)?e', function(req, res) {
 res.send('ab(cd)?e');
});
</code>
</pre>


[slide]  

字符 ?、+、* 和 () 是其正则表达式同应项的子集。基于字符串的路径按字面理解连字符 (-) 和点 (.)。



[slide]  
基于正则表达式的路由路径的示例：


[slide]  
此路由路径将匹配名称中具有“a”的所有路由。

<pre>
<code class="language-javascript" translate="no">
app.get(/a/, function(req, res) {
  res.send('/a/');
});
</code>
</pre>


[slide]  
此路由路径将匹配 `butterfly` 和 `dragonfly`，但是不匹配 `butterflyman`、`dragonfly man` 等。

<pre>
<code class="language-javascript" translate="no">
app.get(/.*fly$/, function(req, res) {
  res.send('/.*fly$/');
});
</code>
</pre>

[slide]  
# 路由处理程序

您可以提供多个回调函数，以类似于[中间件](/{{ page.lang }}/guide/using-middleware.html)的行为方式来处理请求。唯一例外是这些回调函数可能调用 `next('route')` 来绕过剩余的路由回调。您可以使用此机制对路由施加先决条件，在没有理由继续执行当前路由的情况下，可将控制权传递给后续路由。



[slide]  
路由处理程序的形式可以是一个函数、一组函数或者两者的结合，如以下示例中所示。单个回调函数可以处理一个路由。例如：

<pre>
<code class="language-javascript" translate="no">
app.get('/example/a', function (req, res) {
  res.send('Hello from A!');
});
</code>
</pre>


[slide]  
多个回调函数可以处理一个路由（确保您指定 `next` 对象）。例如：

<pre>
<code class="language-javascript" translate="no">
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});
</code>
</pre>


[slide]  
一组回调函数可以处理一个路由。例如：

<pre>
<code class="language-javascript" translate="no">
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

var cb2 = function (req, res) {
  res.send('Hello from C!');
}

app.get('/example/c', [cb0, cb1, cb2]);
</code>
</pre>



[slide]  
独立函数与一组函数的组合可以处理一个路由。例如：

<pre>
<code class="language-javascript" translate="no">
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from D!');
});
</code>
</pre>


[slide]  
# 响应方法

下表中响应对象 (`res`) 的方法可以向客户机发送响应，并终止请求/响应循环。如果没有从路由处理程序调用其中任何方法，客户机请求将保持挂起状态。

|   方法               | 描述
|----------------------|--------------------------------------
| [res.download()](/{{ page.lang }}/4x/api.html#res.download)     | 提示将要下载文件。
| [res.end()](/{{ page.lang }}/4x/api.html#res.end)               | 结束响应进程。
| [res.json()](/{{ page.lang }}/4x/api.html#res.json)             | 发送 JSON 响应。
| [res.jsonp()](/{{ page.lang }}/4x/api.html#res.jsonp)           | 在 JSONP 的支持下发送 JSON 响应。
| [res.redirect()](/{{ page.lang }}/4x/api.html#res.redirect)     | 重定向请求。
| [res.render()](/{{ page.lang }}/4x/api.html#res.render)         | 呈现视图模板。
| [res.send()](/{{ page.lang }}/4x/api.html#res.send)             | 发送各种类型的响应。
| [res.sendFile](/{{ page.lang }}/4x/api.html#res.sendFile)       | 以八位元流形式发送文件。
| [res.sendStatus()](/{{ page.lang }}/4x/api.html#res.sendStatus) | 设置响应状态码并以响应主体形式发送其字符串表示。



[slide]  
# app.route()

您可以使用 `app.route()` 为路由路径创建可链接的路由处理程序。
因为在单一位置指定路径，所以可以减少冗余和输入错误。有关路由的更多信息，请参阅 [Router() 文档](/{{ page.lang }}/4x/api.html#router)。


[slide]  
以下是使用 `app.route()` 定义的链式路由处理程序的示例。

<pre>
<code class="language-javascript" translate="no">
app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });
</code>
</pre>



[slide]  
# express.Router

使用 `express.Router` 类来创建可安装的模块化路由处理程序。`Router` 实例是完整的中间件和路由系统；因此，常常将其称为“微型应用程序”。

以下示例将路由器创建为模块，在其中装入中间件，定义一些路由，然后安装在主应用程序的路径中。


[slide]  
在应用程序目录中创建名为 `birds.js` 的路由器文件，其中包含以下内容：

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// define the about route
router.get('/about', function(req, res) {
  res.send('About birds');
});

module.exports = router;
</code>
</pre>


[slide]  
接着，在应用程序中装入路由器模块：

<pre>
<code class="language-javascript" translate="no">
var birds = require('./birds');
...
app.use('/birds', birds);
</code>
</pre>

此应用程序现在可处理针对 `/birds` 和 `/birds/about` 的请求，调用特定于此路由的 `timeLog` 中间件函数。



[slide]  
# 创建全局的配置文件
为了更好的维护项目，定义一个配置文件（config.js）来定义基本信息，放到项目根目录下。
```js 
var Config = {
    site: {
        title: '前端社区',
        description: '用Coding创造财富',
        version: '1.0',
    },
    db: {
        cookieSecret: 'frontendblog',
        name: 'blog',
        host: 'localhost',
        url: 'mongodb://127.0.0.1:27017/blog'
    },
    site: {
        pagesize: 6
    }
};
module.exports = Config;
```



[slide] 
# handlebars模版
新建好的工程默认使用的是hbs，需要安装使用express-handlebars模板；

1 . 卸载hbs,安装express-handlebars
```js
npm uninstall hbs                       //
npm install --save express-handlebars   
```

2 . 修改模版集成, 在`app.js`中添加`express-handlebars`
```js
var exphbs = require('express-handlebars');

//配置hbs基础模板和分块模板
var hbs = exphbs.create({
  partialsDir: 'views/partials',        //partialsDir: 指定partial页面的目录。
  layoutsDir: "views/layouts/",         //layouts：指定布局页面的目录
  defaultLayout: 'main',                //defaultLayout：指定默认布局文件(没带后缀)
  extname: '.hbs',                      //extname: 指定handlebars文件后缀
  helpers: hbsHelper                    //helpers: 指定模板函数对象
});
app.engine('hbs', hbs.engine);
```
