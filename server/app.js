#!/usr/bin/env node
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var router = express.Router();
var fs = require('fs');
var url = require('url');
var multer = require('multer');
var moment = require('moment');

var app = express();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Access-Control-Allow-Headers, X-Requested-With');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



var marked = require('marked');
marked.setOptions({
    highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value
    }
})

router.get('/getNoteDetail', function(req, res, next) {
  var params = url.parse(req.url, true).query;
  var id = params.id;
  var name = params.name;
  var filename =  `${__dirname}/note/${id}/${name}`;
  var markData = fs.readFileSync(filename,'utf-8').replace(/\[slide\]/g,"");
  var htmlData = marked(markData);
  res.send( JSON.stringify(htmlData) );
});

router.get('/getMDDetail', function(req, res, next) {
  var params = url.parse(req.url, true).query;
  var id = params.id;
  var name = params.name;
  var filename =  `${__dirname}/note/${id}/${name}`;
  var markData = fs.readFileSync(filename,'utf-8').replace(/\[slide\]/g,"");
  res.send( JSON.stringify(markData) );
});

router.get('/getNoteList', function(req, res, next) {
  var params = url.parse(req.url, true).query;
  var id = params.id;
  var ret = [];
  var path = `${__dirname}/note/${id}/`;

  fs.readdir(path ,function(err,files){
    files.forEach(v=>{
      if (v.split('.')[1] === 'md') {
        ret.push(v);
      }
    })
    res.send(JSON.stringify(ret));
  })
});

router.get('/getMoocDetail', function(req, res, next) {
  var params = url.parse(req.url, true).query;
  var mpath = params.mpath;
  var filename =  `${__dirname}/mooc/${mpath}.md`;
  var markData = fs.readFileSync(filename,'utf-8').replace(/\[slide\]/g,"");
  var htmlData = marked(markData);
  res.send( JSON.stringify(htmlData) );
});

router.get('/getMoocList', function(req, res, next) {
  var ret = [];
  var path = `${__dirname}/mooc/`;

  const files = fs.readdirSync(path);
  files.forEach(function (mooc, index) {
    let moocpath = `${path}${mooc}`;
    let stat = fs.lstatSync(moocpath);
    if (stat.isDirectory() === true) { 
      let mooclList = []
      const moocfiles = fs.readdirSync(moocpath);
      moocfiles.forEach(function (moocChap, index) {
        let moocChapPath = `${path}${mooc}/${moocChap}`;
        let stat = fs.lstatSync(moocChapPath);
        if (stat.isDirectory() === true) { 
          let cntList = [];
          const moocItemFile = fs.readdirSync(moocChapPath);
          moocItemFile.forEach(function (moocItem, index) {
            let moocItemPath = `${path}${mooc}/${moocChap}/${moocItem}`;
            let stat = fs.lstatSync(moocItemPath);
            if (stat.isFile() === true) { 
              cntList.push(moocItem.split('.')[0]);
            }
          })
          mooclList.push({chap:moocChap,list:cntList})
        }
      })
      ret.push({mooc:mooc,list:mooclList})
    }
  })
  res.send(JSON.stringify(ret));
});

router.get('/getProjectList', function(req, res, next) {
  var ret = [];
  var path = `${__dirname}/project/`;

  const files = fs.readdirSync(path);
  files.forEach(function (proj, index) {
    let projPath = `${path}${proj}`;
    let stat = fs.lstatSync(projPath);
    if (stat.isDirectory() === true) { 
      let jsonData;
      const projFiles = fs.readdirSync(projPath);
      projFiles.forEach(function (projInfo, index) {
        let projInfoPath = `${path}${proj}/${projInfo}`;
        let stat = fs.lstatSync(projInfoPath);
        if (stat.isFile() === true) { 
          // read json file's info
          if (projInfoPath.split('.')[1] === 'json') {
            let pname = proj.split('#')[1];
            let date = proj.split('#')[0];
            jsonData = JSON.parse(fs.readFileSync(projInfoPath,'utf-8'));
            jsonData.pname = pname;
            jsonData.date = date;
          }
        }
      })
      ret.push(jsonData);
    }
  })
  res.send(JSON.stringify(ret));
});

router.get('/getProjectDetail', function(req, res, next) {
  let params = url.parse(req.url, true).query;
  let pid = params.pid;
  let descFilename = `${__dirname}/project/${pid}/desc.md`;
  let markData = fs.readFileSync(descFilename,'utf-8');
  let htmlData = marked(markData);
  let pname = pid.split('#')[1];
  let date = pid.split('#')[0];

  let baseFilename = `${__dirname}/project/${pid}/base.json`;
  let jsonData = JSON.parse(fs.readFileSync(baseFilename,'utf-8'));
  jsonData.desc = htmlData;
  jsonData.pname = pname;
  jsonData.date = date;
  
  res.send(JSON.stringify(jsonData));
});


router.get('/doLogin', function(req, res, next) {
  var params = url.parse(req.url, true).query;
  var usr = params.usr;
  var pwd = params.pwd;
  var filename =  `${__dirname}/note/${usr}/config`;
  var code, msg;

  fs.readFile(filename,'utf-8', function(error,dat){
    if(error){
      if (error.errno === -2) {
        code = 1;
        msg = "用户名错误!";
      }else{
        console.log(error);
      }
    }else{
      if ( pwd === dat) {
        code = 0;
        msg = "登录成功！";
      }else{
        code = 1;
        msg = "密码错误!";
      }
    }

    var ret = {
      code: code,
      msg: msg,
      data: { user:usr,pwd:pwd }
    }
    // console.log(ret)
    res.send(JSON.stringify(ret));
  });
  
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let id = req.body.id;
    cb(null, `${__dirname}/note/${id}`)
  },
  filename: function (req, file, cb) {
    let dt = moment().format("YYYYMMDD");
    let filename = `${dt}@${file.originalname}`; 
    cb(null, filename)
  }
})
var upload = multer({ storage: storage })

router.post('/uploadFile', upload.single('file'), function(req, res, next) {
  var ret = {
    msg: `${req.file.filename}文件上传成功！`,
  }
  res.send(JSON.stringify(ret));
});

router.post('/saveMDDetail', function(req, res, next) {
  let md = req.body.md;
  let id = req.body.id;
  let name = req.body.name;

  var filename =  `${__dirname}/note/${id}/${name}`;

  fs.writeFile(filename, md, function (err) {
    if (err) console.error(err);
    var ret = { msg: `文件保存成功！` };
    res.send(JSON.stringify(ret));
  });
});

router.get('/getCount', function(req, res, next) {
  var filename =  `${__dirname}/count`;

  var count = fs.readFileSync(filename,'utf-8');
  count++;
  fs.writeFile(filename, count, function (err) {
    if (err) console.error(err);
    res.send(JSON.stringify( count ));
  });
});










// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var debug = require('debug')('cl-moocs:server');
var http = require('http');

var port = normalizePort(process.env.PORT || '4000');
app.set('port', port);
var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
