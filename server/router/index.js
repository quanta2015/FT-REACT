
var express = require('express');
var fs = require('fs');
var path = require('path');
var url = require('url');
var multer = require('multer');
var moment = require('moment');
var router = express.Router();
var __projdir = path.resolve(__dirname,'../');
// console.log(__projdir);
var genppt = require('../lib/generate');

var marked = require('marked');
marked.setOptions({
    highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value
    }
})

router.get('/ppt', function(req, res, next) {
  var id = req.query.id;
  var filename= path.resolve(__dirname,'../public')+`/ppt${id}.html`;
  res.sendfile(filename);
});

router.get('/getPPT', function(req, res, next) {
  var params = url.parse(req.url, true).query;
  var mpath = params.mpath;
  var filename =  `${__projdir}/mooc/${mpath}.md`;
  var outdir = path.resolve(__dirname,'../public');

  let files = fs.readdirSync(outdir);
  files.forEach((file,index)=>{
    let filePath = `${outdir}/${file}`;
    if (( file.indexOf("ppt")===0)&&(fs.statSync(filePath).isFile())) {
      fs.unlinkSync(filePath);
    }
  })

  //编译ppt成html,返回文件id
  var fileId = genppt(filename,outdir,'.');
  var ret = { file: fileId };
  res.send( JSON.stringify(ret) );
});

router.get('/getNoteDetail', function(req, res, next) {
  var params = url.parse(req.url, true).query;
  var id = params.id;
  var name = params.name;
  var filename =  `${__projdir}/note/${id}/${name}`;
  var markData = fs.readFileSync(filename,'utf-8').replace(/\[slide\]/g,"");
  var htmlData = marked(markData);
  res.send( JSON.stringify(htmlData) );
});

router.get('/getMDDetail', function(req, res, next) {
  var params = url.parse(req.url, true).query;
  var id = params.id;
  var name = params.name;
  var filename =  `${__projdir}/note/${id}/${name}`;
  var markData = fs.readFileSync(filename,'utf-8').replace(/\[slide\]/g,"");
  res.send( JSON.stringify(markData) );
});

router.get('/getNoteList', function(req, res, next) {
  var params = url.parse(req.url, true).query;
  var id = params.id;
  var ret = [];
  var path = `${__projdir}/note/${id}/`;

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
  var filename =  `${__projdir}/mooc/${mpath}.md`;
  var markData = fs.readFileSync(filename,'utf-8').replace(/\[slide\]/g,"");
  var htmlData = marked(markData);
  res.send( JSON.stringify(htmlData) );
});

router.get('/getMoocList', function(req, res, next) {
  var ret = [];
  var path = `${__projdir}/mooc/`;

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
  var path = `${__projdir}/project/`;

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
  let descFilename = `${__projdir}/project/${pid}/desc.md`;
  let markData = fs.readFileSync(descFilename,'utf-8');
  let htmlData = marked(markData);
  let pname = pid.split('#')[1];
  let date = pid.split('#')[0];

  let baseFilename = `${__projdir}/project/${pid}/base.json`;
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
  var filename =  `${__projdir}/note/${usr}/config`;
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
    res.send(JSON.stringify(ret));
  });
  
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let id = req.body.id;
    cb(null, `${__projdir}/note/${id}`)
  },
  filename: function (req, file, cb) {
    let dt = moment().format("YYYYMMDD");
    let filename = `${dt}@${file.originalname}`; 
    cb(null, filename)
  }
})
var upload = multer({ storage: storage })

router.post('/uploadFile', upload.single('file'), function(req, res, next) {
  let id = req.body.id;
  let path = `${__projdir}/note/${id}/`;
  let noteList = [];
  fs.readdir(path ,function(err,files){
    files.forEach(v=>{
      if (v.split('.')[1] === 'md') {
        noteList.push(v);
      }
    })
    var ret = { msg: `${req.file.filename}文件上传成功！`,noteList:noteList };
    res.send(JSON.stringify(ret));
  })
});

router.post('/saveMDDetail', function(req, res, next) {
  let md = req.body.md;
  let id = req.body.id;
  let name = req.body.name;

  var filename =  `${__projdir}/note/${id}/${name}`;

  fs.writeFile(filename, md, function (err) {
    if (err) console.error(err);
    var ret = { msg: `文件保存成功！` };
    res.send(JSON.stringify(ret));
  });
});

router.post('/delMDDetail', function(req, res, next) {
  let id = req.body.id;
  let name = req.body.name;
  let path = `${__projdir}/note/${id}/`;
  let filename =  `${path}${name}`;
  let noteList = [];
  fs.unlinkSync(filename); 
  fs.readdir(path ,function(err,files){
    files.forEach(v=>{
      if (v.split('.')[1] === 'md') {
        noteList.push(v);
      }
    })
    var ret = { msg: `成功删除文章！`,noteList:noteList };
    res.send(JSON.stringify(ret));
  })
});

router.get('/getCount', function(req, res, next) {
  var filename =  `${__projdir}/count`;

  var count = fs.readFileSync(filename,'utf-8');
  count++;
  fs.writeFile(filename, count, function (err) {
    if (err) console.error(err);
    res.send(JSON.stringify( count ));
  });
});


module.exports = router;