title: Nodejs 详解
theme: light

[slide]  
# 认识Node.js
- Node 是一个服务器端 JavaScript 解释器
- Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境
- Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效
- Node.js 的包管理器 npm，是全球最大的开源库生态系统
- Node.js 是一门动态语言，运行在服务端的 Javascript


[slide]  
# 版本介绍
- 在命令窗口中输入 node -v 可以查看版本
- 0.x 完全不技术 ES6
- 4.x 部分支持 ES6 特性
- 5.x 部分支持ES6特性（比4.x多些），属于过渡产品，现在来说应该没有什么理由去用这个了
- 6.x 支持98%的 ES6 特性
- 8.x 支持 ES6 特性


[slide]  
# 环境搭建
- Node官网[下载安装文件](https://nodejs.org/en/download/)
- 下载完后进行安装，建议安装到默认路径，注意不要有中文路径
- 配置环境变量
- 在命令窗口中输入 node -v，如果正常显示版本号则表示安装成功


[slide]  
# REPL(交互式解释器)
在命令窗口输入 node 后回车，便可进入到 REPL 模式，在这个模式里可以输入 Javascript 的脚本语法，node 会自动将语法执行。类似于在浏览器的开发人员工具的控制台。不同的在于 REPL 是在服务端解析 Javascript，而控制台是在客户端解析 Javascript。按 CTRL + C 可退出 REPL 模式。


[slide]  
# 运行Node.js
REPL 只适用于一些简单的 Javascript 语法，对于稍复杂的程序，可以直接写到 js 文件当中。在前端可以直接在 html 页面中通过 script 标签引入 js 然后在浏览器运行，则可以通过浏览器来解析 js 文件。在 node 环境下，可通过命令窗口输入命令： node *.js ，便可直接执行 js 文件。

> Chrome浏览器 = NodeJS(控制台,JS) + 界面(HTML,CSS)

> Nodejs想做一件事情，把浏览器的JS引擎拿出来，放到世界上任何设备上来跑JS


[slide]  
# Node.js模块
模块系统是 Node.js 最基本也是最常用的。一般情况模块可分为四类：
- 原生模块
- 文件模块
- 第三方模块
- 自定义模块


[slide]  
以前我们在JS里面实现模块，有以下几种方案

1. 顺序问题，分开每一个JS去使用
```html
<script src="./lib/jquery.js"></script>
<script src="./lib/common.js"></script>
<script src="./lib/core.js"></script>
```
它会全局污染，就比如jquery如果引入两次，那最后一次会覆盖前面的那一份，原因是因为jquery是把$挂载到全局的window上面

2. requirejs
这种是前端模块化，需要额外引入一份`requirejs`去管理其他JS

3. ES5
- 导出`module.exports`
- 导入`require`

4. ES6
- 导出`export`
- 导入`import`


[slide]  
## 自定义模块
1. 创建模块(b.js)
```javascript
//b.js
function FunA(){
    return 'Tom';
}
//暴露方法 FunA
module.exports = FunA;
```
2. 加载模块(a.js)
```javascript
//a.js
var FunA = require('./b.js');//得到 b.js => FunA
var name = FunA();// 运行 FunA，name = 'Tom'
console.log(name); // 输出结果
```


[slide]  
### module.exports
module.exports 就 Node.js 用于对外暴露，或者说对外开放指定访问权限的一个对象。如上面的案例，如果没有这段代码
```javascript
module.exports = FunA;
```
那么 require('./b.js') 就会为 undefined。
一个模块中有且仅有一个 module.exports，如果有多个那后面的则会覆盖前面的。


[slide]  
### exports
exports 是 module 对象的一个属性，同时它也是一个对象。在很多时候一个 js 文件有多个需要暴露的方法或是对象，module.exports 又只能暴露一个，那这个时候就要用到 exports:
```javascript
function FunA(){
    return 'Tom';
}

function FunB(){
    return 'Sam';
}

exports.FunA = FunA;
exports.FunB = FunB;
```
```javascript
//FunA = exports,exports 是一个对象
var FunA = require('./b.js');
var name1 = FunA.FunA();// 运行 FunA，name = 'Tom'
var name2 = FunA.FunB();// 运行 FunB，name = 'Sam'
console.log(name1);
console.log(name2);
```
当然在引入的时候也可以这样写
```javascript
//FunA = exports,exports 是一个对象
var {FunA, FunB} = require('./b.js');
var name1 = FunA();// 运行 FunA，name = 'Tom'
var name2 = FunB();// 运行 FunB，name = 'Sam'
console.log(name1);
console.log(name2);
```


[slide]  
# npm


[slide]  
### 什么是 npm 脚本
npm 允许在package.json文件里面，使用scripts字段定义脚本命令。package.json 里面的scripts 字段是一个对象。它的每一个属性，对应一段脚本。定义在package.json里面的脚本，就称为 npm 脚本。

查看当前项目的所有 npm 脚本命令，可以使用不带任何参数的npm run命令。


[slide]  
### 使用
- npm run 脚本名称
- 如果是并行执行（即同时的平行执行），可以使用&符号。
npm run script1.js & npm run script2.js
- 如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用&&符号。
npm run script1.js && npm run script2.js


[slide]  
### 简写形式
- npm start 即 npm run start
- npm stop 即 npm run stop 
- npm test 即 npm run test
- npm restart 即 npm run stop && npm run restart && npm run start

[slide]  
# forever


[slide]  
## forever 介绍
forever是一个简单的命令式nodejs的守护进程，能够启动，停止，重启App应用。forever完全基于命令行操作，在forever进程之下，创建node的子进程，通过monitor监控node子进程的运行情况，一旦文件更新，或者进程挂掉，forever会自动重启node服务器，确保应用正常运行。


[slide]  
## forever 安装
- 全局安装forever npm install -g forever
- 查看forever帮助 forever -h


[slide]  
## forever 命令行的中文解释
### 子命令actions：
    - start:启动守护进程
    - stop:停止守护进程
    - stopall:停止所有的forever进程
    - restart:重启守护进程
    - restartall:重启所有的foever进程
    - list:列表显示forever进程
    - config:列出所有的用户配置项
    - set <key> <val>: 设置用户配置项
    - clear <key>: 清楚用户配置项
    - logs: 列出所有forever进程的日志
    - logs <script|index>: 显示最新的日志
    - columns add <col>: 自定义指标到forever list
    - columns rm <col>: 删除forever list的指标
    - columns set<cols>: 设置所有的指标到forever list
    - cleanlogs: 删除所有的forever历史日志


[slide]  
### forever 常用命令
- forever start app.js
- forever stop app.js


[slide]  
### 配置参数options：
    - -m MAX: 运行指定脚本的次数
    - -l LOGFILE: 输出日志到LOGFILE
    - -o OUTFILE: 输出控制台信息到OUTFILE
    - -e ERRFILE: 输出控制台错误在ERRFILE
    - -p PATH: 根目录
    - -c COMMAND: 执行命令，默认是node
    - -a, –append: 合并日志
    - -f, –fifo: 流式日志输出
    - -n, –number: 日志打印行数
    - –pidFile: pid文件
    - –sourceDir: 源代码目录
    - –minUptime: 最小spinn更新时间(ms)
    - –spinSleepTime: 两次spin间隔时间
    - –colors: 控制台输出着色
    - –plain: –no-colors的别名，控制台输出无色
    - -d, –debug: debug模式
    - -v, –verbose: 打印详细输出
    - -s, –silent: 不打印日志和错误信息
    - -w, –watch: 监控文件改变
    - –watchDirectory: 监控顶级目录
    - –watchIgnore: 通过模式匹配忽略监控
    - -h, –help: 命令行帮助信息


[slide]  
# 文件模块 fs
出于安全因互，javascript 是不能操作本地文件，所以文件的处理都会放到服务端去处理。Node.js 作为一门后端动态语言，同样具备了操作文件的功能，这一操作需要用到 Node.js 的原生模块：fs。


[slide]  
## 读取文本 -- 异步读取
```javascript
var fs = require('fs');
// 异步读取
// 参数1：文件路径，
// 参数2：读取文件后的回调
fs.readFile('demoFile.txt', function (err, data) {
   if (err) {
       return console.error(err);
   }
   console.log("异步读取: " + data.toString());
});
```


[slide]  
## 读取文本 -- 同步读取
```javascript
var fs = require('fs');
var data = fs.readFileSync('demoFile.txt');
console.log("同步读取: " + data.toString());
```


[slide]  
## 写入文本 -- 覆盖写入
```javascript
var fs = require('fs');
//每次写入文本都会覆盖之前的文本内容
fs.writeFile('input.txt', '抵制一切不利于中国和世界和平的动机！',  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("数据写入成功！");
   console.log("--------我是分割线-------------")
   console.log("读取写入的数据！");
   fs.readFile('input.txt', function (err, data) {
      if (err) {
         return console.error(err);
      }
      console.log("异步读取文件数据: " + data.toString());
   });
});
```


[slide]  
## 写入文本 -- 追加写入
```javascript
var fs = require('fs');
fs.appendFile('input.txt', '愿世界和平！', function (err) {
   if (err) {
       return console.error(err);
   }
   console.log("数据写入成功！");
   console.log("--------我是分割线-------------")
   console.log("读取写入的数据！");
   fs.readFile('input.txt', function (err, data) {
      if (err) {
         return console.error(err);
      }
      console.log("异步读取文件数据: " + data.toString());
   });
});
```


[slide]  
## 图片读取
图片读取不同于文本，因为文本读出来可以直接用 console.log() 打印，但图片则需要在浏览器中显示，所以需要先搭建 web 服务，然后把以字节方式读取的图片在浏览器中渲染。

1. 图片读取是以字节的方式
2. 图片在浏览器的渲染因为没有 img 标签，所以需要设置响应头为 image

```javascript
var http = require('http');
var fs = require('fs');
var content =  fs.readFileSync('001.jpg', "binary");

http.createServer(function(request, response){
    response.writeHead(200, {'Content-Type': 'image/jpeg'});
    response.write(content, "binary");
    response.end();
}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');
```


[slide]  
# http 模块
所有后端动态语言要想运行起来，都得先搭建服务器。Node.js 搭建服务器需要用到一个原生的模块 http。
1. 加载 http 模块
2. 调用 http.createServer() 方法创建服务，方法接受一个回调函数，回调函数中有两个参数，第一个是请求体，第二个是响应体。
3. 在回调函数中一定要使用 response.end() 方法，用于结束当前请求，不然当前请求会一直处在等待的状态。
4. 调用 listen 监听一个端口。
```javascript
//原生模块
var http = require('http');

http.createServer(function(reqeust, response){
    response.end('Hello Node');
}).listen(8080);
```


[slide]  
## 参数接受 -- GET
当以 GET 请求服务器的时候，服务器可以通过 request.mothod 来判断当前的请求方式并通过 request.url 来获取当前请求的参数。

```javascript
var http = require('http');
var url = require('url');
 
http.createServer(function(req, res){
    var params = url.parse(req.url, true).query;
    res.end(params);
 
}).listen(3000);
```


[slide]  
## 参数接受 -- POST
不同于 GET 请求，POST 请求不能通协 url 进行获取，这个时候就需要用到请求体的事件进行监听获取
```javascript
var http = require('http');
var util = require('util');
var querystring = require('querystring');
 
http.createServer(function(req, res){
    // 定义了一个post变量，用于暂存请求体的信息
    var post = '';     
    // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    req.on('data', function(chunk){    
        post += chunk;
    });
    // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    req.on('end', function(){    
        post = querystring.parse(post);
        res.end(util.inspect(post));
    });
}).listen(3000);
```


[slide]  
## Stream 介绍
Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。例如，对http 服务器发起请求的request 对象就是一个 Stream，还有stdout（标准输出）。往往用于打开大型的文本文件，创建一个读取操作的数据流。所谓大型文本文件，指的是文本文件的体积很大，读取操作的缓存装不下，只能分成几次发送，每次发送会触发一个data事件，发送结束会触发end事件。


[slide]  
## 读取流
```javascript
var fs = require("fs");
var data = '';
// 创建可读流
var readerStream = fs.createReadStream('input.txt');
// console.log(readerStream);

// 设置编码为 utf8。
readerStream.setEncoding('UTF8');
// 处理流事件 --> data, end, and error
readerStream.on('data', function(chunk) {
   data += chunk;
});
readerStream.on('end',function(){
   console.log(data);
});
readerStream.on('error', function(err){
   console.log(err.stack);
});
console.log("程序执行完毕");
```


[slide]  
## 写入流
创建一个可以写入的流，写入到文件 output.txt 中
```javascript
var fs = require("fs");
var data = '中国';

// 创建一个可以写入的流，写入到文件 output.txt 中
// var writerStream = fs.createWriteStream('output.txt', {'flags': 'a'}); //追加文本
var writerStream = fs.createWriteStream('output.txt');
// 使用 utf8 编码写入数据
writerStream.write(data,'UTF8');
// 标记文件末尾
writerStream.end();
// 处理流事件 --> data, end, and error
writerStream.on('finish', function() {
    console.log("写入完成。");
});
writerStream.on('error', function(err){
   console.log(err.stack);
});
console.log("程序执行完毕");
```


[slide]  
## 管道流
<img src="https://sfault-image.b0.upaiyun.com/eb/90/eb907d19321d2aa50a6853acbb543fbc_articlex" height = "300" />
管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。我们把文件比作装水的桶，而水就是文件里的内容，我们用一根管子(pipe)连接两个桶使得水从一个桶流入另一个桶，这样就慢慢的实现了大文件的复制过程。以下实例我们通过读取一个文件内容并将内容写入到另外一个文件中。


[slide]  

```javascript
var fs = require("fs");
// 创建一个可读流
var readerStream = fs.createReadStream('input.txt');
// 创建一个可写流 
// {'flags': 'a'}//追加文本
var writerStream = fs.createWriteStream('output.txt');
// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream.pipe(writerStream);
console.log("程序执行完毕");
```


[slide]  
## 链式流
链式是通过连接输出流到另外一个流并创建多个对个流操作链的机制。链式流一般用于管道操作。接下来我们就是用管道和链式来压缩和解压文件。


[slide]  
### 压缩
```javascript
var fs = require("fs");
//压缩和解压的模块
var zlib = require('zlib');
// 压缩 input.txt 文件为 input.txt.gz
// 以流的方式读取文本
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip()) //把读取出来的文本调用压缩模块进行压缩
  .pipe(fs.createWriteStream('input.zip'));//把压缩好的流进行保存
  
console.log("文件压缩完成。");
```


[slide]  
### 解压
```javascript
var fs = require("fs");
//压缩和解压的模块
var zlib = require('zlib');
fs.createReadStream('input.zip')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('input1.txt'));
  
console.log("文件解压完成。")
```