title: E01. 编程环境安装配置
speaker: LI YANG
transition: slide3
files: /js/demo.js,/css/demo.css
theme: moon
usemathjax: yes
--
# 编程环境安装配置

--
### 安装Sublime Text3
根据系统不同，直接安装或者下载portable version解压。

--
### 安装包控制器（package control）
* 只有安装了包控制器（package control）才能安装各种插件。首先按`Ctrl + ~`呼出命令控制器。

* 然后将下面的命令复制到命令栏中后按回车，看到成功的提示重启就能看到Package Control了。
>命令如下：  
import urllib.request,os,hashlib; h = 'df21e130d211cfc94d9b0905775a7c0f' + '1e3d39e33b79698005270310898eea76'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)

--
### 安装插件
- 打开`Command Palette`(Ctrl+Shift+p)，选择 `Package Control: Install Package`;
- 出来后再命令栏上输入Emmet，点第一个就开始安装Emmet插件，跳出Emmet信息界面就证明安装成功！

推荐安装的插件如下：
```
1. emmet 
2. BracketHighLight
3. Color HightLight
4. CSS Format
5. Js Format
6. HtmlBeautify
7. Sublime Tmpl
8. ConvertToUTF8
9. JQuery Snippets pack
```


-- 
### 安装同步服务器
1. 安装node程序，目前最新版本是v7.6.0 Current
2. 安装browser-sync程序，命令` npm i -g browser-sync`
3. 进入网站根目录，启动服务器：
```
browser-sync start --server --files "."
```


--
### SublimeText 快捷键
> ####选择类

`Ctrl+D` 选中光标所占的文本，继续操作则会选中下一个相同的文本  
`Alt+F3` 选中文本按下快捷键，即可一次性选择全部的相同文本进行同时编辑。举个栗子：快速选中并更改所有相同的变量名、函数名等。（可和Ctrl+D结合使用）  
`Ctrl+L` 选中整行，继续操作则继续选择下一行，效果和Shift+↓效果一样  
`Ctrl+Shift+L` 先选中多行，再按下快捷键，会在每行行尾插入光标，即可同时编辑这些行  
`Ctrl+Shift+M` 选择括号内的内容（继续选择父括号）。快速选中删除函数中的代码，重写函数体代码或重写括号内里的内容  
`Ctrl+M` 光标移动至括号内结束或开始的位置  
`Ctrl+Enter`在下一行插入新行。即使光标不在行尾，也能快速向下插入一行   
`Ctrl+Shift+Enter` 在上一行插入新行。即使光标不在行首，也能快速向上插入一行  
`Ctrl+Shift+[`  选中代码，按下快捷键，折叠代码  
`Ctrl+Shift+]` 选中代码，按下快捷键，展开代码  
`Ctrl+K+0` 展开所有折叠代码  
`Ctrl+←` 向左单位性地移动光标，快速移动光标  
`Ctrl+→` 向右单位性地移动光标，快速移动光标  
`shift+↑` 向上选中多行  
`shift+↓` 向下选中多行  
`Shift+←` 向左选中文本  
`Shift+→` 向右选中文本  
`Ctrl+Shift+←` 向左单位性地选中文本  
`Ctrl+Shift+→` 向右单位性地选中文本  
`Ctrl+Shift+↑` 将光标所在行和上一行代码互换（将光标所在行插入到上一行之前）  
`Ctrl+Shift+↓` 将光标所在行和下一行代码互换（将光标所在行插入到下一行之后）  
`Ctrl+Alt+↑` 向上添加多行光标，可同时编辑多行  
`Ctrl+Alt+↓` 向下添加多行光标，可同时编辑多行  

> ####编辑类

`Ctrl+J` 合并选中的多行代码为一行。将多行格式的CSS属性合并为一行
`Ctrl+Shift+D` 复制光标所在整行，插入到下一行。
Tab向右缩进。
`Shift+Tab` 向左缩进  
`Ctrl+K+K` 从光标处开始删除代码至行尾  
`Ctrl+Shift+K` 删除整行  
`Ctrl+/` 注释单行  
`Ctrl+Shift+/` 注释多行  
`Ctrl+K+U` 转换大写  
`Ctrl+K+L` 转换小写  
`Ctrl+Z` 撤销  
`Ctrl+Y` 恢复撤销  
`Ctrl+U` 软撤销，感觉和Gtrl+Z一样  
`Ctrl+F2` 设置书签  
`Ctrl+T` 左右字母互换  
`F6` 单词检测拼写  

> ####搜索类

`Ctrl+F` 打开底部搜索框，查找关键字  
`Ctrl+shift+F `在文件夹内查找，与普通编辑器不同的地方是sublime允许添加多个文件夹进行查找  
`Ctrl+P` 打开搜索框。举个栗子：1、输入当前项目中的文件名，快速搜索文件，2、输入@和关键字，查找文件中函数名，3、输入：和数字，跳转到文件中该行代码，4、输入#和关键字，查找变量名  
`Ctrl+G` 打开搜索框，自动带：，输入数字跳转到该行代码。举个栗子：在页面代码比较长的文件中快速定位  
`Ctrl+R` 打开搜索框，自动带@，输入关键字，查找文件中的函数名。举个栗子：在函数较多的页面快速查找某个函数  
`Ctrl+：` 打开搜索框，自动带#，输入关键字，查找文件中的变量名、属性名等  
`Ctrl+Shift+P` 打开命令框。场景栗子：打开命名框，输入关键字，调用sublimetext或插件的功能，例如使用package安装插件  
`Esc` 退出光标多行选择，退出搜索框，命令框等  

> ####显示类

`Ctrl+Tab` 按文件浏览过的顺序，切换当前窗口的标签页  
`Ctrl+PageDown` 向左切换当前窗口的标签页  
`Ctrl+PageUp` 向右切换当前窗口的标签页  
`Alt+Shift+1` 窗口分屏，恢复默认1屏（非小键盘的数字）  
`Alt+Shift+2` 左右分屏-2列  
`Alt+Shift+3` 左右分屏-3列  
`Alt+Shift+4` 左右分屏-4列  
`Alt+Shift+5` 等分4屏   
`Alt+Shift+8` 垂直分屏-2屏  
`Alt+Shift+9` 垂直分屏-3屏  
`Ctrl+K+B` 开启/关闭侧边栏   
`F11` 全屏模式  
`Shift+F11` 免打扰模式  

