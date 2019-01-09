var fs = require('fs');
var path = require('path');
var md_parser = require('./md_parser');
var $ = require('./helper');
var nodeModules = path.normalize(path.join(__dirname, 'node_modules')) + path.sep;


module.exports = function (filepath, outputDir, rDir) {
    rDir = rDir || '.';
    // var templateMd = $.readFile(templateDir + 'markdown.ejs');
    // var templateList = $.readFile(templateDir + 'list.ejs');
    var content = $.readFile(filepath);
    copyLinkToOutput(content, filepath, outputDir, rDir);
    var html = parser(content,{
        assetPath: rDir
    });

    var id;

    if (html) {
        html = handlerHTML(html, rDir);
        id = Date.now();
        $.writeFile(path.join(outputDir, `ppt${id}.html`), html);
    }
    return id;
};

function parser(content,config) {
    try {
        var html = md_parser(content, null, null, null, $.mix({
            generate: true,
        },config));
        return html;
    } catch (e) {
        console.log('ERROR: '.bold.red + e.toString());
    }
    return false;
}


//处理绝对路径的url
function handlerHTML(html, rDir) {
    rDir = rDir.replace(/\/$/,'');
    html = html.replace(/(src|href|url)([=|\(])(["'])\/\//gi, '$1$2$3<=PLACEHOLDER=>//')
        .replace(/(src|href|url)([=|\(])(["'])\//gi, '$1$2$3' + rDir + '/')
        .replace(/(src|href|url)([=|\(])(["'])<=PLACEHOLDER=>\//gi, '$1$2$3//')
        .replace(/loadJS\(['"]\/js/g, "loadJS($1" + rDir + "/js").replace(/dir:\s*(["'])\/js\/\1,/g, "dir: $1" + rDir + "/js/$1,");

    return html;
}

//处理页面相对url，到目标文件夹
function copyLinkToOutput(content, filepath, outputDir) {
    var files = [];
    content.replace(/(!)?\[.+?\]\(\s?(.*?)\s?\)/g, function (i, isImg, file) {
        //处理markdown内部，[inline模式](/assets/box-fe-road/img/inline-mode.png)
        if (isImg && file) {
            file = file.split(/\s+/)[0];
        }
        // console.log(file);
        files.push(file);
    }).replace(/(?:href|src|url)[=|\(](['"])?(.+?)\1/g, function (i, q, file) {
        files.push(file);
    });
    //解析cover
    var json = md_parser.parseCover(content.split(/\[slide.*\]/i)[0]);
    if (json.files) {
        files = files.concat(json.files.split(/\s?,\s?/));
    }
    if (json.usemathjax === 'yes') {
        $.copy(nodeModules + 'mathjax/', outputDir + 'js/mathjax/', function (filename, dir, subdir) {
            if (/^(?:docs|unpacked|test)/.test(subdir)) {
                //不复制
                return false;
            }
            var ext = path.extname(filename);
            // console.log(ext);
            if (!ext || ['.md', '.txt', '.json'].indexOf(ext) !== -1) {
                return false;
            }
            return true;
        });
    }
    files.filter(function (f) {
        if (/^http[s]?:\/\//.test(f) || /^\/\//.test(f) || ['#', '/'].indexOf(f) !== -1 || /^\?/.test(f) || /^about\:/.test(f)) {
            //过滤掉外链
            return false;
        }
        return true;
    }).forEach(function (f) {
        var topath = path.join(outputDir, f);
        var realpath = path.join(path.dirname(filepath), f);
        if ($.exists(realpath) && $.isFile(realpath)) {
            var data = fs.readFileSync(String(realpath));
            $.writeFile(topath, data);
        }

    });
}

