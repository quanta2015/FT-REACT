title: Express 详解
theme: light

[slide] 
# TASK.11 上传文件任务

[slide] 
# formidable组件
使用formidable组件(https://github.com/felixge/node-formidable)可以方便建立文件上传的逻辑；

通过formidable组件的progress方法，可以获取文件上传的数据。
```js
form.on('progress', function(bytesReceived, bytesExpected) {
    //将进度发送到客户端
});
```

[slide] 
# Ajax方法获取进度
传统获取进度的方法是采用Ajax调用，在上传文件的过程中，同时发送一个获取进度的服务请求，不断递归执行，直到文件上传完毕为止。也就是说，一个文件上传的逻辑过程，需要一次ajax调用上传路由服务 ` /upload ` ，若干次调用获取上传进度服务 ` /getUploadProg ` 。其具体实现如下：



[slide] 
# **前端JS代码**
```js
var prog ;
var startReq = true;

$(init); 

function init() {
  $("#UploadBtn").click(upload);                //调用上传函数
  $("#uploadFile").change(setProgressBar);      //选择文件时调用重置函数
}

//重置进度条到初始化状态
function setProgressBar() {
  prog = 0;
  $(".progress-bar").css( "width", "0%" ).attr( "aria-valuenow", 0);
}

//调用服务获取上传进度
function getUploadProg(url,proc) {
  $.ajax({
    url: url,
    type: "POST",
    success: function(result) {
      prog = result.progress;
      $(".progress-bar").width(prog + "%");
      proc();
    }
  });
}

//开始请求获取上传进度
function startRequest() {
  setTimeout("getUploadProg('/upload/getUploadProg', dealResponse)", 100);
}

//递归调用startRequest()函数，直到上传完毕
function dealResponse() {
  if (startReq) {
    startRequest();
  }
}

//上传文件
function upload() {
  
  startReq = true;
  var file = $("#uploadFile")[0].files[0];
  var form = new FormData();
  form.append("file", file);
  form.append("usr", "liyang");
  form.append("addr", "shanghai");

  //启动获取上传进度的请求
  startRequest();

  $.ajax({
    url: "/upload",
    type: "POST",
    data: form,
    async: true,
    processData: false,
    contentType: false,
    success: function(result) {
      startReq = false;   
      if (result.code == 0) {
        console.log(result.data);
      }
    }
  });
}
```


[slide] 
# **后端NODEJS代码**
```js
var express = require('express');
var router = express.Router();
var entries = require('../db/jsonRes');
var formidable = require('formidable');

var uploadprogress = 0; //全局变量，存进度

router.get('/', function(req, res) {
  res.render('upload');
})

router.post('/', function(req, res) {

  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';                  //上传文件编码格式
  form.uploadDir = "uploadFile";            //上传文件保存路径（必须在public下面新建）
  form.keepExtensions = true;               //保持上传文件后缀
  form.maxFieldsSize = 300 * 1024 * 1024;   //上传文件最大值

  var path = "";
  var fields = [];
  uploadprogress = 0;
  console.log("start:upload----"+uploadprogress);

  form.parse(req);

  form
    .on('field', function(field, value) {
      console.log(field + ":" + value);     //上传的参数数据
    })
    .on('file', function(field, file) {
      path = file.path;                     //上传的文件数据
    })
    .on('progress', function(bytesReceived, bytesExpected) {
      uploadprogress = bytesReceived / bytesExpected * 100;     //计算上传进度
    })
    .on('end', function() {
      //上传完发送成功的json数据
      console.log('-> upload done\n');
      entries.code = 0;
      entries.data = path;
      res.send(JSON.stringify(entries));
    });
})

router.post('/getUploadProg', function(req, res) {

  console.log("curent prog is:" + uploadprogress);
  res.send(JSON.stringify({
    "progress": uploadprogress
  }));
})

module.exports = router;
```

