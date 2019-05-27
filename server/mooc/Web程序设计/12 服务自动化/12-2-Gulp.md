title: Less  

author:
  name: LI YANG
  url: http://mooc1.chaoxing.com/course/87155873.html
output: 17-web-gulp&webpack.html




--
# Gulp & webpack

--
#### 目录

<script src="http://code.jquery.com/jquery-1.7.2.min.js"></script>
<script type="text/javascript">
 $(document).ready(function(){
      $("h2,h3,h4,h5,h6").each(function(i,item){
        var tag = $(item).get(0).localName;
        $(item).attr("id","wow"+i);
        $("#category").append('<a class="new'+tag+'" href="#wow'+i+'">'+$(this).text()+'</a></br>');
        $(".newh2").css("margin-left",0);
        $(".newh3").css("margin-left",20);
        $(".newh4").css("margin-left",40);
        $(".newh5").css("margin-left",60);
        $(".newh6").css("margin-left",80);
      });
 });
</script>
<div id="category"></div>

--
### 1. Gulp VS webpack 比较

Gulp 是一个任务管理工具，让简单的任务更清晰，让复杂的任务易于掌控；而 webpack 的理念是，一切皆为模块，每个模块在打包的时候都会经过一个叫做 loader 的东西，它具备非常强大的精细化管理能力，主要解决的是依赖分析问题。

Gulp：搞清楚 `gulp.src`, `gulp.dest`, `gulp.task`, `gulp.watch` 四个 API 就差不多了，它的底层原理是使用 Node 的 Transform Streams，这是一个可读可写可做中间转换的 Streams 管道，由于从 src 到 dest 过程中，文件一直停留在 Streams 中，没有落地成为实体文件，所以整体运作效率非常高。

> gulp 常用插件：

> - `gulp-load-plugins`：自动加载 package.json 中的 gulp 插件
- `gulp-rename`： 重命名
- `gulp-uglify`：文件压缩
- `gulp-concat`：文件合并
- `gulp-less`：编译 less
- `gulp-sass`：编译 sass
- `gulp-clean-css`：压缩 CSS 文件
- `gulp-htmlmin`：压缩 HTML 文件
- `gulp-babel`：使用 babel 编译 JS 文件
- `gulp-jshint`：jshint 检查
- `gulp-imagemin`：压缩 jpg、png、gif 等图片
- `gulp-livereload`：当代码变化时，它可以帮我们自动刷新页面

Webpack 概念很多，但搞清楚 `entry`，`output` 和 `loader` 三个关键点，基本上就可以解决简单的问题了，稍微复杂的场景主要包括对资源的合并处理、分拆处理、多次打包等，部分这样的问题可以使用插件辅助解决，但是 Webpack 的强大并不在文件处理，而是依赖分析，所以在流程操作特别复杂的情况，webpack 并不能胜任工作，往往会被作为 gulp 的一个 task，整体工作流交给 gulp 主导。

> webpack 常用的 `loader` 和 `plugin`：

> Loader 列表

> - `less-loader`, `sass-loader`：处理样式
- `url-loader`, `file-loader`：两个都必须用上。否则超过大小限制的图片无法生成到目标文件夹中
- `babel-loader`，`babel-preset-es2015`，`babel-preset-react`：js 处理，转码
- `expose-loader`： 将 js 模块暴露到全局

> Plugin 列表

> - `NormalModuleReplacementPlugin`：匹配 resourceRegExp，替换为 newResource
- `ContextReplacementPlugin`：替换上下文的插件
- `IgnorePlugin`：不打包匹配文件
- `PrefetchPlugin`：预加载的插件，提高性能
- `ResolverPlugin`：替换上下文的插件
- `DedupePlugin`：打包的时候删除重复或者相似的文件
- `MinChunkSizePlugin`：把多个小模块进行合并，以减少文件的大小
- `LimitChunkCountPlugin`：限制打包文件的个数
- `MinChunkSizePlugin`：根据 chars 大小，如果小于设定的最小值，就合并这些小模块，以减少文件的大小
- `OccurrenceOrderPlugin`：根据模块调用次数，给模块分配 ids，常被调用的 ids 分配更短的 id，使得 ids 可预测，降低文件大小，该模块推荐使用
- `UglifyJsPlugin`：压缩 js
- `CommonsChunkPlugin`：多个 html 共用一个 js 文件(chunk)
- `HotModuleReplacementPlugin`：模块热替换么，如果不在 dev-server 模式下，需要记录数据，recordPath，生成每个模块的热更新模块
- `ProgressPlugin`：编译进度
- `NoErrorsPlugin`：报错但不退出 webpack 进程
- `HtmlWebpackPlugin`：生成 html




--
### 2. Gulp 简介
Gulp.js 是一个自动化构建工具，开发者可以使用它在项目开发过程中自动执行常见任务。Gulp.js 是基于 Node.js 构建的，利用 Node.js 流的威力，你可以快速构建项目并减少频繁的 IO 操作。Gulp.js 源文件和你用来定义任务的 Gulp 文件都是通过 JavaScript（或者 CoffeeScript ）源码来实现的。

--
#### 2.1  安装 Gulp
1 . 全局安装 gulp
```
npm install --global gulp
```

2 . 作为项目的开发依赖（devDependencies）安装：
```
npm install --save-dev gulp
```

> 我们全局安装了gulp，项目也安装了gulp，全局安装gulp是为了执行gulp任务，本地安装gulp则是为了调用gulp插件的功能。


#### 2.2 配置Gulp 
在项目根目录下创建一个名为 gulpfile.js 的文件，gulpfile.js是gulp项目的配置文件
```
var gulp = require('gulp');

gulp.task('default', function() {
  // 将你的默认的任务代码放在这
});
```

#### 2.3 运行gulp
在命令提示符执行 ` gulp 任务名称`
```
<!-- 调用默认任务default -->
gulp  或者  gulp default
```

#### 2.4 清除文件
通过gulp删除某个文件夹的文件

1 . 安装 `gulp-clean`
```
npm i gulp-clean --save-dev
```

2 . 编写 `gulpfile.js` 代码
```js
var clean = require('gulp-clean');

gulp.task('clean', function() {
    return gulp.src(['dist/css', 'dist/js'], { read: false })
               .pipe(clean());
});
```

#### 2.5 编译less
通过gulp编译LESS代码

1 . 安装 `gulp-less`
```
npm i gulp-less --save-dev
```

2 . 编写 `gulpfile.js` 代码
```js
var less = require('gulp-less');

gulp.task('styles', function() {
    return gulp.src('src/less/*.less') //源文件路径
        .pipe(less()) //less编译
        .pipe(gulp.dest('dist/css')) //目的路径
});
```

#### 2.6 自动前缀
通过gulp处理css的自动前缀

1 . 安装 `gulp-autoprefixer`
```
npm i gulp-autoprefixer --save-dev
```

2 . 编写 `gulpfile.js` 代码
```js
var autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function() {
    return gulp.src('src/css/*.css') //源文件路径
        .pipe(autoprefixer()) //自动前缀
        .pipe(gulp.dest('dist/css')) //目的路径
});
```

#### 2.7 base64编码
通过gulp将css中的图片转换成base65编码

1 . 安装 `gulp-base64`
```
npm i gulp-base64 --save-dev
```

2 . 编写 `gulpfile.js` 代码
```js
var base64 = require('gulp-base64');

gulp.task('styles', function() {
    return gulp.src('src/css/*.css') //源文件路径
        .pipe(base64()) //base64编码
        .pipe(gulp.dest('dist/css')) //目的路径
});
```

#### 2.8 css压缩
通过gulp将css进行压缩

1 . 安装 `gulp-minify-css`
```
npm i gulp-minify-css --save-dev
```

2 . 编写 `gulpfile.js` 代码
```js
var cssmin = require('gulp-minify-css');

gulp.task('styles', function() {
    return gulp.src('src/css/*.css') //源文件路径
        .pipe(cssmin()) //css压缩
        .pipe(gulp.dest('dist/css')) //目的路径
});
```

#### 2.9 排列文件顺序
通过gulp将js调整前后顺序

1 . 安装 `gulp-order`
```
npm i gulp-order --save-dev
```

2 . 编写 `gulpfile.js` 代码
```js
var order = require("gulp-order");

gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')  //源文件路径
        .pipe(order([
            "src/js/config.js",
            "src/js/index.js"
        ]))
        .pipe(gulp.dest('dist/js')) //目的路径
})
```

#### 2.10 合并文件
通过gulp将多个文件进行合并

1 . 安装 `gulp-concat`
```
npm i gulp-concat --save-dev
```

2 . 编写 `gulpfile.js` 代码
```js
var concat = require('gulp-concat');

gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')  //源文件路径
        .pipe(concat('main.js'))  //合并文件
        .pipe(gulp.dest('dist/js')) //目的路径
})
```

#### 2.11 重命名文件
通过gulp将文件名进行更改

1 . 安装 `gulp-rename`
```
npm i gulp-rename --save-dev
```

2 . 编写 `gulpfile.js` 代码
```js
var rename = require('gulp-rename');

gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')  //源文件路径
         .pipe(rename({  
              suffix: '.min'
          }))   //修改文件名     
         .pipe(gulp.dest('dist/js')) //目的路径
})
```

#### 2.12 JS文件压缩
通过gulp将js文件进行压缩

1 . 安装 `gulp-uglify`
```
npm i gulp-uglify --save-dev
```

2 . 编写 `gulpfile.js` 代码
```js
var rename = require('gulp-rename');

gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')  //源文件路径
         .pipe(uglify())   //压缩js
         .pipe(gulp.dest('dist/js')) //目的路径
})
```

#### 2.13 图片压缩
通过gulp将图片进行压缩

1 . 安装 `gulp-imagemin`
```
npm i gulp-imagemin --save-dev
```

2 . 编写 `gulpfile.js` 代码
```js
gulp.task('images', function() {
    return gulp.src('src/img/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/img'))
});
```


#### 2.14 eslint语法检查
1 . 安装 `gulp-eslint`
```
npm i gulp-eslint --save-dev
```

2. 编写` .eslintrc `
```
{
  "env": {
    "es6": true,
    "browser": true,
    "jquery": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "no-console":0
  }
}
```

3 . 添加eslint编译
```js
const eslint = require('gulp-eslint');

gulp.task('lint', () => {
    return gulp.src('src/sys/js/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
```

#### 2.15 处理串行任务
定义多个任务的顺序执行关系，否则默认情况下，任务会以最大的并发数同时运行。

```js
//清除任务
gulp.task('clean', function() {
    return gulp.src('dist/css', { read: false })
        .pipe(clean());
});

//编译任务
gulp.task('styles', function() {
    return gulp.src('src/less/*.less') //源文件路径
        .pipe(less()) //less编译                       
        .pipe(gulp.dest('dist/css')) //目的路径
});

//先清空目录，然后再执行编译CSS
gulp.task('default', ['clean'], function() {
    gulp.start('styles')
});
```

#### 2.16 热加载服务
使用 `BrowserSync` 服务实现文件变更的实时编译调试

1 . 安装 `browser-sync`
```
npm i browser-sync --save-dev
```

2 . 编写 `gulpfile.js` 代码
```js
var browserSync = require('browser-sync').create();

gulp.task('dev', function() {
    //初始化browser-sync服务
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    
    //检测less文件是否更改，来调用重新编译css
    gulp.watch('src/less/*', ['styles']);  

    //如果css文件更改过则刷新服务器
    gulp.watch( ['./dist/sys/css/*'] ).on("change", browserSync.reload)
});
```



--
### 3. Webpack 简介
WebPack可以看做是模块打包机：把你的项目当做一个整体，通过一个给定的主文件（如：index.js），从这个文件开始分析你的项目结构，找到项目的所有依赖文件，使用loaders处理它们，最后打包为一个浏览器可识别的JavaScript文件。

![img/webpack01.png](img/webpack01.png)

--
#### 3.1 配置webpack
1 . 新建一个项目文件夹，并且安装webpack
```
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install --save-dev webpack
```

2 . 新建html以及js文件如下
```html
<html>
    <head>
        <title>webpack</title>
    </head>
    <body>
        <div class="g-index"></div>
        
        <script src="dist/bundle.js"></script>
    </body>
</html>
```

```js
<!-- common.js -->
exports.printmsg = function(msg) {
    console.log(msg);
}

<!-- index.js -->
var lib = require('./common.js')
lib.printmsg('good')
```


3 . 编译webpack
```
webpack src/js/index.js dist/bundle.js
```

可以看到打包结果如下：
```bash
$ webpack src/js/index.js dist/bundle.js
Hash: 39e1d99d27c58dd34eb1
Version: webpack 2.5.1
Time: 81ms
    Asset     Size  Chunks             Chunk Names
bundle.js  2.82 kB       0  [emitted]  main
   [0] ./src/js/common.js 58 bytes {0} [built]
   [1] ./src/js/index.js 50 bytes {0} [built]
```


> 项目结构如下：  
> 
![img/webpack02.png](img/webpack02.png)

--
#### 3.2 编写配置文件 
Webpack拥有很多高级的功能，这些功能其实都可以通过命令行模式实现，但是正如已经提到的，这样不太方便且容易出错的，一个更好的办法是定义一个配置文件，这个配置文件其实也是一个简单的JavaScript模块，可以把所有的与构建相关的信息放在里面。下面来说明如何定义一个配置文件：

1 . 在根目录下面新建 `webpack.config.js` 
```js
var path = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

2 . 修改 `package.json`，添加条目如下
```
{
  ...
  "scripts": {
    "build": "webpack",
  },
  ...
}
```

3 . 使用命令行编译项目
```
npm run build
```


--
#### 3.3 调试webpack
开发总是离不开调试，如果可以更加方便的调试当然就能提高开发效率，不过打包后的文件有时候你是不容易找到出错了的地方对应的源代码的位置的，Source Maps就是来帮我们解决这个问题的。通过简单的配置后，Webpack在打包时可以为我们生成的source maps，这为我们提供了一种对应编译文件和源文件的方法，使得编译后的代码可读性更高，也更容易调试。

| devtool选项 | 配置结果 |
|------|----|
| source-map | 在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的source map，但是它会减慢打包文件的构建速度； |
| cheap-module-source-map | 在一个单独的文件中生成一个不带列映射的map，不带列映射提高项目构建速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便； |
| eval-source-map | 使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。不过在开发阶段这是一个非常好的选项，但是在生产阶段一定不要用这个选项； |
| cheap-module-eval-source-map | 这是在打包文件时最快的生成source map的方法，生成的Source Map 会和打包后的JavaScript文件同行显示，没有列映射，和eval-source-map选项具有相似的缺点； |


在学习阶段以及在小到中性的项目上，`eval-source-map` 是一个很好的选项，不过记得只在开发阶段使用它，继续上面的例子，进行如下配置

```js
var path = require('path');
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'eval-source-map'
};
```

--
#### 3.4 建立本地开发服务器
Webpack提供一个可选的本地开发服务器，这个本地服务器基于node.js构建，可以实现代码的热加载功能，可以通过它方便的进行代码的开发。其构建方法如下：

1 . 安装 `webpack-dev-server`
```
npm install --save-dev webpack-dev-server
```

2 . 修改配置文件 `webpack.config.js`
```js
var path = require('path');
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: "./",
        port: 9000,
        inline: true
    }
};
```

3 . 修改 `package.json`，添加条目如下
```
{
  ...
  "scripts": {
    "dev": "webpack-dev-server",
  },
  ...
}
```
4 . 输入 ` npm run dev ` 启动 `webpack-dev-server`

```bash
$ npm run dev                                                                            
                                                                                         
> webpackproj@1.0.0 dev F:\Project\DEMO\webpackdemo                                      
> webpack-dev-server                                                                     
                                                                                         
Project is running at http://localhost:9000/                                             
webpack output is served from /                                                          
Content not from webpack is served from ./                                               
Hash: 1aca755d21fcb2c76314                                                               
Version: webpack 2.5.1                                                                   
Time: 918ms                                                                              
        Asset    Size  Chunks                    Chunk Names                             
    bundle.js  316 kB       0  [emitted]  [big]  main                                    
bundle.js.map  375 kB       0  [emitted]         main                                    
chunk    {0} bundle.js, bundle.js.map (main) 302 kB [entry] [rendered]                   
   [35] (webpack)-dev-server/client?http://localhost:9000 5.68 kB {0} [built]            
   [36] ./src/js/index.js 69 bytes {0} [built]                                           
   [37] ./~/ansi-html/index.js 4.26 kB {0} [built]                                       
   [38] ./~/ansi-regex/index.js 135 bytes {0} [built]                                    
   [40] ./~/events/events.js 8.33 kB {0} [built]                                         
   [41] ./~/html-entities/index.js 231 bytes {0} [built]                                 
   [48] ./~/querystring-es3/index.js 127 bytes {0} [built]                               
   [76] ./~/strip-ansi/index.js 161 bytes {0} [built]                                    
   [78] ./~/url/url.js 23.3 kB {0} [built]                                               
   [79] ./~/url/util.js 314 bytes {0} [built]                                            
   [80] (webpack)-dev-server/client/overlay.js 3.73 kB {0} [built]                       
   [81] (webpack)-dev-server/client/socket.js 897 bytes {0} [built]                      
   [83] (webpack)/hot/emitter.js 77 bytes {0} [built]                                    
   [84] ./src/js/common.js 58 bytes {0} [built]                                          
   [85] multi (webpack)-dev-server/client?http://localhost:9000 ./src/js/index.js 40 byte
s {0} [built]                                                                            
     + 71 hidden modules                                                                 
webpack: Compiled successfully.                                                                                                                                  
```



--
#### 3.5 配置HTML代码热加载
`webpack-dev-server` 只能监控入口文件（JS/LESS/CSS/IMG）的变化，因此 HTML文件的变化必须依赖插件来进行监控。

1 . 安装 `html-webpack-plugin`
```js
npm install html-webpack-plugin --save-dev
```

2 . 修改配置文件 `webpack.config.js`, 把  `index.html` 加入监控
```js
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({   // html代码热加载
            template: './index.html'
        }),
    ],
    devServer: {
        contentBase: "./",
        port: 9000,
        inline: true
    }
};
```

> 此时可以取消 html 文件内的 js 引用，因为  `html-webpack-plugin` 会自动加载编译完的 js 文件



--
#### 3.6 配置自动打开浏览器
通过配置 `open-browser-webpack-plugin` 可以在webpack编译完之后自动打开浏览器；

1 . 安装 `open-browser-webpack-plugin`
```js
npm install open-browser-webpack-plugin --save-dev
```

2 . 修改配置文件 `webpack.config.js`
```js
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({ // html代码热加载
            template: './index.html'
        }),
        new OpenBrowserPlugin({ //自动打开浏览器
            url: 'http://localhost:9000'
        })
    ],
    devServer: {
        contentBase: "./",
        port: 9000,
        inline: true
    }
};
```


--
#### 3.7 配置 `json` 加载器
使用 json 解析器可以将常量数据定义在 json文件中，然后在 js 文件中调用。

1 . 在项目根目录下面创建 config.json 文件，内容如下
```json
{
    "name": "demo",
    "type": "HTML5"
}
```

2 . 修改 index.js 
```js
var config = require('../../config.json')
var lib = require('./common.js')
lib.printmsg(config.name)
```

3 . 修改配置文件 `webpack.config.js`
```js
var path = require('path');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: { 
        rules: [{
            test: /\.json$/,
            loader: "json-loader"
        }]
    }
};
```

> 项目结构如下：  
> 
![](img/webpack03.png)

--
#### 3.8 配置 `LESS` 编译
1 . 安装 `less style-loader css-loader less-loader`
```js
npm install less style-loader css-loader less-loader --save-dev
```

2 . 在项目的css目录下面创建 index.less 文件，内容如下
```less
@charset "utf-8";
@gray-base:  #000;
@gray-light:  lighten(@gray-base, 46.7%); 

.g-index {
    height: 100vh;
    background: @gray-light;
}
```

3 . 修改 index.js 
```js
require('../css/index.less')

var lib = require('./common.js')
lib.printmsg('good')
```

4 . 修改配置文件 `webpack.config.js`
```js
var path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: './src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: { 
        rules: [
        {
            test: /\.less$/, // less解析器
            loader: 'style-loader!css-loader!less-loader'
        },]
    }
};
```

> 项目结构如下：  
> 
![](img/webpack04.png)

--
#### 3.9 配置 `Babel` 编译
1 . 安装 `babel-core babel-loader babel-preset-es2015`
```js
 npm install babel-core babel-loader babel-preset-es2015 --save-dev
```

2 . 修改 `common.js` 为 `ES6` 格式
```js
exports.printmsg = (msg) => {
    console.log(msg);
}
```

3 . 修改配置文件 `webpack.config.js`
```js
var path = require('path');
module.exports = {
    devtool: 'source-map',
    entry: './src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: { 
        rules: [{
            test: /\.js$/,   //babel解析器
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    }
};
```


--
#### 3.10 配置 `jQuery` 解析器
1 . 安装 `jquery`
```js
 npm install jquery --save-dev
```

2 . 修改 `index.js` 调用 `jquery` 函数
```js
require('jquery')

$(init)
function init() {
    var lib = require('./common.js')
    lib.printmsg('good')
}
```

3 . 修改配置文件 `webpack.config.js`
```js
var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: './src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {   
        rules: [{
            test: /\.js$/,  //babel代码解析
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({   //jquery解析器
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]
};
```


--
#### 3.11 配置 `js` 代码压缩
1 . 修改配置文件 `webpack.config.js`, 在 plugin 中添加 `webpack.optimize.UglifyJsPlugin` 模块
```js
var path = require('path');
var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
    devtool: 'source-map',
    entry: './src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: { //在配置文件里添加JSON loader
        rules: [{
            test: /\.js$/,   //babel代码解析
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    },
    plugins: [
         new uglifyJsPlugin({ //js代码压缩
            compress: {
                warnings: false
            }
        })
    ]
};

```

--
#### 3.12 配置 `eslint` 语法解析
1 . 安装 `esline` 库
```js
 npm install eslint eslint-loader eslint-friendly-formatter eslint-plugin-html babel-eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard --save-dev
```

2 . 在项目根目录下添加eslint 配置文件` .eslintrc.js `
```js
// http://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    "indent": [2, 4],//缩进风格
    'no-undef': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
```

3 . 修改配置文件 `webpack.config.js`
```js
var path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: './src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: { 
        rules: [{
            test: /\.js$/,   //babel代码解析
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.js$/, //eslint语法解析
            exclude: /node_modules/,
            loader: 'eslint-loader',
            enforce: 'pre',
            options: {
                formatter: require('eslint-friendly-formatter')
            }
        }]
    }
};
```


--
#### 3.13 配置图片压缩器
1 . 安装 `url-loader` 库
```js
 npm install url-loader --save-dev
```

2 . 修改 index.less 文件 
```less
@charset "utf-8";
@gray-base:  #000;
@gray-light:  lighten(@gray-base, 46.7%); 

.g-index {
    height: 100vh;
    background: @gray-light;
    background: url('../img/small.png') no-repeat;
}
```

3 . 修改配置文件 `webpack.config.js`
```js
var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: './src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [ {
            test: /\.less$/, // less解析器
            loader: 'style-loader!css-loader!less-loader'
        }, {
            test: /\.(png|jpg)$/, // img压缩器
            loader: 'url-loader?limit=8192'
        }]
    }
```

> 项目结构如下：  
> ![](img/webpack05.png)

--
#### 3.14 配置公共库抽取


1 . 安装 `chunk-manifest-webpack-plugin `  `webpack-chunk-hash` 库
```js
 npm install chunk-manifest-webpack-plugin webpack-chunk-hash  --save-dev
```


3 . 修改配置文件 `webpack.config.js`
```js
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var WebpackChunkHash = require("webpack-chunk-hash");
var ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");

module.exports = {
    devtool: 'source-map',
    entry: { 
        main: './src/js/index.js',
        vendor: ['jquery']
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [ {
            test: /\.less$/, // less解析器
            loader: 'style-loader!css-loader!less-loader'
        }, {
            test: /\.(png|jpg)$/, // img压缩器
            loader: 'url-loader?limit=8192'
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({ // html代码热加载
            template: './index.html'
        }),
        new webpack.ProvidePlugin({ //jquery解析器
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin({  //公共库抽取
            name: ["vendor", "manifest"], // vendor libs + extracted manifest
            minChunks: Infinity,
        }),
        new webpack.HashedModuleIdsPlugin(),
        new WebpackChunkHash(),
        new ChunkManifestPlugin({
          filename: "chunk-manifest.json",
          manifestVariable: "webpackManifest"
        })
    ]
};
```

--
#### 3.15 配置模块分析器
在项目复杂的情况下，为了分析多个模块的相互依赖以及打包的关系，通常引入模块打包分析工具，可以清晰的给出每个模块的依赖关系。


1 . 安装 `webpack-bundle-analyzer ` 库
```js
 npm install webpack-bundle-analyzer  --save-dev
```

2 . 修改配置文件 `webpack.config.js`
```js
var path = require('path');
var { BundleAnalyzerPlugin }  = require('webpack-bundle-analyzer')

module.exports = {
    devtool: 'source-map',
    entry: { 
        main: './src/js/index.js',
        vendor: ['jquery']
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new BundleAnalyzerPlugin()
    ]
};
```
