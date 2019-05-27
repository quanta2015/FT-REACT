Nodejs安装配置
How to install node and config envirment
1. Windows 和 Mac 安装：
第一步：

打开 Node.js 官网，可以看到两个下载选项，左边的是 LTS 版，即长期支持版本，大多数人用这个就可以了。右边是最新版，支持最新的语言特性（比如对 ES6 的支持更全面），想尝试新特性的开发者可以安装这个版本。我们选择左边的 v6.9.1 LTS 点击下载。

小提示：从 http://node.green 上可以看到 Node.js 各个版本对 ES6 的支持情况。

第二步：

安装 Node.js，这个没什么好说的，一直点击 继续 即可。

第三步：

提示安装成功后，打开终端输入以下命令，可以看到 node 和 npm 都已经安装好了。

node -v
npm -v
安装完之后，打开console窗口，输入node --version命令，检查Node.js版本

2. Linux 安装：
Linux 用户可通过源码编译安装：

curl -O https://nodejs.org/dist/v6.9.1/node-v6.9.1.tar.gz
tar -xzvf node-v6.9.1.tar.gz
cd node-v6.9.1
./configure
make
make install
注意: 如果编译过程报错，可能是缺少某些依赖包。因为报错内容不尽相同，

3. nrm
nrm 是一个管理 npm 源的工具。用过 ruby 和 gem 的同学会比较熟悉，通常我们会把 gem 源切到国内的淘宝镜像，这样在安装和更新一些包的时候比较快。nrm 同理，用来切换官方 npm 源和国内的 npm 源（如: cnpm），当然也可以用来切换官方 npm 源和公司私有 npm 源。

# 全局安装 nrm
npm i nrm -g

# 查看当前 nrm 内置的几个 npm 源的地址
nrm ls

# 切换到 cnpm
nrm use cnpm
4. NPM包管理器
NPM（Node Package Manager）是程序包管理工具，我们用它来下载、安装，管理第三方模块。

NPM包含三部分：

一个用来存放第三方包的代码库

一个管理本地已经安装包的机制

一个用来定义包依赖关系的标准

NPM提供了一个公共的注册服务，它包含了大家发布的所有包，并提供了一个命令行工具，用来下载，安装和管理这些包。你可以按照Node的包格式标准来制定你的包或者应用需要依赖的其他第三方包。

5. NPM模块的全局和本地模式
NPM的操作主要有两种模式：全局和本地。

本地模式 ： NPM的默认操作模式，在这个模式下，NPM只工作在工作目录下，不会造成系统范围的修改，这个模式让你在某个Node程序下尽情地安装，测试模块，而不会影响你电脑上的其他Node程序。

全局模式 ：适合那些将被很多程序使用，而且总是被全局加载的公共模块，比如命令行工具这些公不会被应用程序直接使用的模块。

6. 全局模式
如果你安装Node时使用的默认目录，在全局模式下面，NPM会把包安装到C:\Users\用户名\AppData\Roaming\npm\node_modules

$ npm install –g <package name>

//范例 
$ npm install –g express
随后在你的Node脚本里需要express模块的时候，使用下面的语句来加载：

var sax = require('express');
7. 本地模式
本地模式是Node包依赖机制的默认推荐模式，这个模式下，NPM安装的所有东西都在当前工作目录（根目录也不例外），而不会影响任何全局的设置。这种机制可以让你一个个的设置应用程序的依赖模块以及它们的版本，而不用担心会污染全局的模块空间。这意味着你可以有依赖同一个模块不同版本的两个应用，它们却不会产生冲突。

在这个模式下，NPM使用当前工作目录下的node_modules目录来存放模块。如果你在代码里使用模块名来引用模块，Node首先会到这个本地的node_modules目录下查找，如果没找到才会去搜索全局的node_modules目录，本地模块优先级总是高于全局模块。

$ npm install <package name>

//范例
$ npm install express

//可以将安装的包属性直接写入package.json文件
//–save参数表示将该模块写入dependencies属性
//–save-dev表示将该模块写入devDependencies属性。
npm install express –save
npm install express –save-dev
你也可以通过下面的命令，来选择安装某个特定的版本：

$ npm install <package name>@<version spec>
8. 卸载模块
使用下面命令可以卸载一个本地模块：

$ npm uninstall <package name>      //本地卸载
$ npm uninstall -g <package name>   //全局卸载
9. 更新模块
$ npm update <package name>      //本地更新
$ npm update -g <package name>   //全局更新
10. 使用package.json文件定义依赖关系
当开始编写一个应用程序时，可以在应用程序根目录创建一个package.json文件来定义应用程序的元数据, 包括程序依赖的外部模块。
可以通过调用npm install来一次性安装所有依赖包，npm会通过package.json内指定的依赖关系来自动完成依赖模块的下载安装，不用自己一个个去操作。

