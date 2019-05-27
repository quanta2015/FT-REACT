title: CSS3 BASIC

author:
  name: LI YANG
  url: http://mooc1.chaoxing.com/course/87155873.html
output: 02-web-css.html

--
# CSS3 BASIC
## css3基础知识介绍
--
### 基本的CSS语法
<img src="img/web/web-css-00.png" alt="">
--
### CSS选择器
<img src="img/web/web-css-01.png" alt="">
```CSS
p { color: #ff0000; }
p { color: #f00; }
p { color: rgb(255,0,0); }
p { color: rgb(100%,0%,0%); }
p {font-family: "sans serif";}
```
--
### CSS派生选择器
通过依据元素在其位置的上下文关系来定义样式，你可以使标记更加简洁。
```CSS
strong { color: red; }
h2 { color: red; }
h2 strong { color: blue; }
```
--
### 选择器的分组
* 可以对选择器进行分组，这样，被分组的选择器就可以分享相同的声明。用逗号将需要分组的选择器分开。
```CSS
h1,h2,h3,h4,h5,h6 {
  color: green;
}
```
--
### 派生选择器
通过依据元素在其位置的上下文关系来定义样式，你可以使标记更加简洁
```CSS
//HTML
<p><strong>我是粗体字，不是斜体字，因为我不在列表当中，所以这个规则对我不起作用</strong></p>

<ol>
<li><strong>我是斜体字。这是因为 strong 元素位于 li 元素内。</strong></li>
<li>我是正常的字体。</li>
</ol>
//CSS
li strong {
    font-style: italic;
    font-weight: normal;
}
```
--
### CSS id 选择器
ID 选择器可以为标有特定 id 的 HTML 元素指定特定的样式;ID 选择器以 "#" 来定义.
```HTML
<p id="red">这个段落是红色。</p>
<p id="green">这个段落是绿色。</p>
#red {color:red;}
#green {color:green;}
```
--
### CSS 类选择器
在 CSS 中，类选择器以一个点号显示
```HTML
.center {text-align: center}
<h1 class="center">
This heading will be center-aligned
</h1>
<p class="center">
This paragraph will also be center-aligned.
</p>
```
--
### CSS 属性选择器
对带有指定属性的 HTML 元素设置样式。
```HTML
[title=W3School] {
  border:5px solid blue;
}
//
input[type="text"]
{
  width:150px;
  display:block;
  margin-bottom:10px;
  background-color:yellow;
  font-family: Verdana, Arial;
}
//
input[type="button"]
{
  width:120px;
  margin-left:35px;
  display:block;
  font-family: Verdana, Arial;
}
```
--
### 如何创建 CSS
外部样式表:当样式需要应用于很多页面时，外部样式表将是理想的选择。在使用外部样式表的情况下，你可以通过改变一个文件来改变整个站点的外观。每个页面使用 ``<link> ``标签链接到样式表。``<link> ``标签在头部
```HTML
<head>
  <link rel="stylesheet" type="text/css" href="mystyle.css" />
</head>
```
--
### 如何创建 CSS
内部样式表: 当单个文档需要特殊的样式时，就应该使用内部样式表。你可以使用`` <style>`` 标签在文档头部定义内部样式表
```CSS
hr {color: sienna;}
p {margin-left: 20px;}
body {background-image: url("images/back40.gif");}
```
--
### 如何创建 CSS
内部样式表: 当单个文档需要特殊的样式时，就应该使用内部样式表。你可以使用 ``<style> ``标签在文档头部定义内部样式表
```HTML
<head>
<style type="text/css">
  hr {color: sienna;}
  p {margin-left: 20px;}
  body {background-image: url("images/back40.gif");}
</style>
</head>
```
--
### CSS 背景
* 背景色:可以使用 background-color 属性为元素设置背景色。这个属性接受任何合法的颜色值。
```CSS
p {background-color: gray;}
p {background-color: gray; padding: 20px;}
```
* 背景图像:要把图像放入背景，需要使用 background-image 属性。background-image 属性的默认值是 none，表示背景上没有放置任何图像。
```CSS
body {background-image: url(/i/eg_bg_04.gif);}
```
--
### CSS 背景
* 背景重复:属性值 repeat 导致图像在水平垂直方向上都平铺，就像以往背景图像的通常做法一样。repeat-x 和 repeat-y 分别导致图像只在水平或垂直方向上重复，no-repeat 则不允许图像在任何方向上平铺
```CSS 
body { 
  background-image: url(/i/eg_bg_03.gif);
  background-repeat: repeat-y;
}
```
* 背景定位:可以利用 background-position 属性改变图像在背景中的位置
```CSS 
body{ 
    background-image:url('/i/eg_bg_03.gif');
    background-repeat:no-repeat;
    background-position:center;
}
```
--
### CSS 文本
* 缩进文本:CSS 提供了 text-indent 属性，该属性可以方便地实现文本缩进
```CSS
p {text-indent: 5em;}
```
* 水平对齐:text-align 是一个基本的属性，它会影响一个元素中的文本行互相之间的对齐方式。
```CSS
p {text-align:center;}
```
* 文本颜色：通过设置color设置文字的颜色
```CSS
p {color:red;}
```
--
### CSS 字体系列
* 指定字体系列:使用 font-family 属性 定义文本的字体系列
```CSS
body {font-family: sans-serif;}
```
* 字体风格:font-style 属性最常用于规定斜体文本
```CSS
p.normal {font-style:normal;}
p.italic {font-style:italic;}
p.oblique {font-style:oblique;}
```
--
### CSS 字体系列
* 字体加粗:font-weight 属性设置文本的粗细
```CSS
p.normal {font-weight:normal;}
p.thick {font-weight:bold;}
p.thicker {font-weight:900;}
```
* 字体大小:font-size 属性设置文本的大小
```CSS
h1 {font-size:60px;}
h2 {font-size:40px;}
p {font-size:14px;}
```
--
### CSS 链接
设置链接的样式
* a:link - 普通的、未被访问的链接
* a:visited - 用户已访问的链接
* a:hover - 鼠标指针位于链接的上方
* a:active - 链接被点击的时刻
```CSS
a:link {color:#FF0000;}     /* 未被访问的链接 */
a:visited {color:#00FF00;}  /* 已被访问的链接 */
a:hover {color:#FF00FF;}    /* 鼠标指针移动到链接上 */
a:active {color:#0000FF;}   /* 正在被点击的链接 */
```
--
### CSS 列表
CSS 列表属性允许你放置、改变列表项标志，或者将图像作为列表项标志。
```HTML
//列表类型
ul {list-style-type : square}
//列表项图像
ul li {list-style-image : url(xxx.gif)}
```
--
### CSS 表格
* 表格边框:如需在 CSS 中设置表格边框，请使用 border 属性
```CSS
//下面的例子为 table、th 以及 td 设置了蓝色边框：
table, th, td{
  border: 1px solid blue;
}
```
* 折叠边框:border-collapse 属性设置是否将表格边框折叠为单一边框
```CSS
table{
  border-collapse:collapse;
}
table,th, td{
  border: 1px solid black;
}
```
--
### CSS 表格
* 表格宽度和高度:通过 width 和 height 属性定义表格的宽度和高度
```CSS
table{
  width:100%;
}
th{
  height:50px;
}
```
* 表格文本对齐:text-align 和 vertical-align 属性设置表格中文本的对齐方式
```CSS
td{
  text-align:right;
}
```