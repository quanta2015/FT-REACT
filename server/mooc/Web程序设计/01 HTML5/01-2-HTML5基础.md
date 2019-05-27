title: HTML 基础

author:
  name: LI YANG
  url: http://mooc1.chaoxing.com/course/87155873.html
output: 01-web-html.html

--
# HTML 基础
## HTML基本语法和元素应用

--
### HTML 简介
* HTML 指的是超文本标记语言 (Hyper Text Markup Language)
* HTML 不是一种编程语言，而是一种标记语言 (markup language)
* 标记语言是一套标记标签 (markup tag)
* HTML 使用标记标签来描述网页
```HTML
<html>
    <head>
        Examples
    </head>
    <body>
        <h1>My First Heading</h1>
        <p>My first paragraph.</p>
    </body>
</html>
```
--
### HTML 标签
##### HTML 标记标签通常被称为 HTML 标签 (HTML tag)。
* HTML 标签是由尖括号包围的关键词，比如 <html>
* HTML 标签通常是成对出现的，比如 <b> 和 </b>
* 标签对中的第一个标签是开始标签，第二个标签是结束标签
* 开始和结束标签也被称为开放标签和闭合标签
```HTML
<html>
    <body>
        <h1>My First Heading</h1>
        <p>My first paragraph.</p>
    </body>
</html>
```
--
### HTML 标题
HTML 标题（Heading）是通过 <h1> - <h6> 等标签进行定义的
```HTML
<h1>This is a heading</h1>
<h2>This is a heading</h2>
<h3>This is a heading</h3>
```
--
### HTML 段落
HTML 段落是通过 <p> 标签进行定义的。
```HTML
<p>This is a paragraph.</p>
<p>This is another paragraph.</p>
```

--
### HTML 图像
HTML 图像是通过 <img> 标签进行定义的
```HTML
<img src="w3school.jpg" width="104" height="142" />
```

--
### HTML 链接
* HTML 链接是通过`` <a>`` 标签进行定义的。
```HTML
<a href="http://www.w3school.com.cn">This is a link</a>
```
* target 属性
```HTML
<a href="http://www.w3school.com.cn/" target="_blank">Visit W3School!</a>
```

--
### HTML 属性
* HTML 标签可以拥有属性。属性提供了有关 HTML 元素的更多的信息。
* 属性总是以名称/值对的形式出现，比如：name="value"。
* 属性值应该始终被包括在引号内。双引号是最常用的，不过使用单引号也没有问题.
```HTML
<a href="http://www.w3school.com.cn">This is a link</a>
<h1 align="center">
<table border="1">
name='Bill "HelloWorld" Gates'
```
--
### HTML 标题
* 标题（Heading）是通过 ``<h1> - <h6>`` 等标签进行定义的。
* ``<h1>`` 定义最大的标题。``<h6>`` 定义最小的标题。
```HTML
<h1>This is a heading</h1>
<h2>This is a heading</h2>
<h3>This is a heading</h3>
```
--
### HTML 注释
* 可以将注释插入 HTML 代码中，这样可以提高其可读性，使代码更易被人理解。浏览器会忽略注释，也不会显示它们。
* 开始括号之后（左边的括号）需要紧跟一个叹号，结束括号之前（右边的括号）不需要。
```HTML
<!-- This is a comment -->
```
--
### 表格
表格由 <table> 标签来定义。每个表格均有若干行（由 <tr> 标签定义），每行被分割为若干单元格（由 <td> 标签定义）。字母 td 指表格数据（table data），即数据单元格的内容。
```HTML
<table border="1">
    <tr>
        <td>row 1, cell 1</td>
        <td>row 1, cell 2</td>
    </tr>
    <tr>
        <td>row 2, cell 1</td>
        <td>row 2, cell 2</td>
    </tr>
</table>
```
--
### 表格和边框属性
如果不定义边框属性，表格将不显示边框。有时这很有用，但是大多数时候，我们希望显示边框。
```HTML
<table border="1">
    <tr>
        <td>Row 1, cell 1</td>
        <td>Row 1, cell 2</td>
    </tr>
</table>
```
--
### 表格的表头
表格的表头使用 ``<th>`` 标签进行定义。大多数浏览器会把表头显示为粗体居中的文本.
```HTML
<table border="1">
    <tr>
        <th>Heading</th>
        <th>Another Heading</th>
    </tr>
    <tr>
        <td>row 1, cell 1</td>
        <td>row 1, cell 2</td>
    </tr>
    <tr>
        <td>row 2, cell 1</td>
        <td>row 2, cell 2</td>
    </tr>
</table>
```
--
### HTML 列表
* 无序列表是一个项目的列表，此列项目使用粗体圆点（典型的小黑圆圈）进行标记。
* 无序列表始于``<ul>``标签。每个列表项始于 ``<li>``。
```HTML
<ul>
    <li>Coffee</li>
    <li>Milk</li>
</ul>
```
* 有序列表也是一列项目，列表项目使用数字进行标记。
* 有序列表始于 ``<ol>`` 标签。每个列表项始于 ``<li>`` 标签。
```HTML
<ol>
    <li>Coffee</li>
    <li>Milk</li>
</ol>
```
--
### HTML 块元素
* HTML块元素:块级元素在浏览器显示时，通常会以新行来开始（和结束）。
```HTML
例子：<h1>, <p>, <ul>, <table>
```
* HTML内联元素:内联元素在显示时通常不会以新行开始。
```HTML
例子：<b>, <td>, <a>, <img>
```
--
### HTML ``<div>`` 元素
* ``<div>`` 元素是块级元素，它是可用于组合其他 HTML 元素的容器。
* ``<div>``元素没有特定的含义。除此之外，由于它属于块级元素，浏览器会在其前后显示折行。
* 如果与 CSS 一同使用，``<div>`` 元素可用于对大的内容块设置样式属性。
* ``<div>`` 元素的另一个常见的用途是文档布局。它取代了使用表格定义布局的老式方法。使用 ``<table>`` 元素进行文档布局不是表格的正确用法。``<table>`` 元素的作用是显示表格化的数据。

--
### HTML ``<span>`` 元素
* HTML ``<span>`` 元素是内联元素，可用作文本的容器。
* ``<span>`` 元素也没有特定的含义。
* 当与 CSS 一同使用时，``<span>`` 元素可用于为部分文本设置样式属性。

--
### HTML 表单和输入
* 表单是一个包含表单元素的区域。
* 表单元素是允许用户在表单中（比如：文本域、下拉列表、单选框、复选框等等）输入信息的元素。
* 表单使用表单标签（<form>）定义。
```HTML
<form>
    ...
      input 元素
    ...
</form>
```

--
### 表单输入
多数情况下被用到的表单标签是输入标签（``<input>``）。输入类型是由类型属性（type）定义的。
* 文本域（Text Fields）
```HTML
<form>
    First name: 
    <input type="text" name="firstname" />
    <br />
    Last name: 
    <input type="text" name="lastname" />
</form>
```

--
### 表单输入
* 单选按钮（Radio Buttons）:当用户从若干给定的的选择中选取其一时，就会用到单选框。
```HTML
<form>
    <input type="radio" name="sex" value="male" /> Male
    <input type="radio" name="sex" value="female" /> Female
</form>
```
* 复选框（Checkboxes）
当用户需要从若干给定的选择中选取一个或若干选项时，就会用到复选框。
```HTML
<form>
    <input type="checkbox" name="bike" />I have a bike
    <input type="checkbox" name="car" />I have a car
</form>
```

--
### 表单的动作属性（Action）和确认按钮
当用户单击确认按钮时，表单的内容会被传送到另一个文件。表单的动作属性定义了目的文件的文件名。由动作属性定义的这个文件通常会对接收到的输入数据进行相关的处理。
```HTML
<form name="input" action="html_form_action.asp" method="get">
    Username: 
    <input type="text" name="user" />
    <input type="submit" value="Submit" />
</form>
```

--
### HTML 框架
* 框架结构标签（``<frameset>``）:定义如何将窗口分割为框架,每个 frameset 定义了一系列行或列,rows/columns 的值规定了每行或每列占据屏幕的面积
* 框架标签（Frame）:Frame 标签定义了放置在每个框架中的 HTML 文档。
```HTML
<frameset cols="25%,75%">
   <frame src="frame_a.htm">
   <frame src="frame_b.htm">
</frameset>
```

--
### HTML Iframe
* 添加 iframe 的语法
```HTML
<iframe src="URL"></iframe>
```
* 设置高度和宽度
```HTML
<iframe src="demo_iframe.htm" width="200" height="200"></iframe>
```
*  删除边框
```HTML
<iframe src="demo_iframe.htm" frameborder="0"></iframe>
```

--
### HTML 背景
* 背景颜色（Bgcolor）:背景颜色属性将背景设置为某种颜色。属性值可以是十六进制数、RGB 值或颜色名。
```HTML
<body bgcolor="#000000">
<body bgcolor="rgb(0,0,0)">
<body bgcolor="black">
```
* 背景（Background）:背景属性将背景设置为图像。属性值为图像的URL。如果图像尺寸小于浏览器窗口，那么图像将在整个浏览器窗口进行复制。
```HTML
<body background="clouds.gif">
<body background="http://www.w3school.com.cn/clouds.gif">
```