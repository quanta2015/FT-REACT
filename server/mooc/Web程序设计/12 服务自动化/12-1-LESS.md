title: Less

author:
  name: LI YANG
  url: http://mooc1.chaoxing.com/course/87155873.html
output: 16-web-less.html

<style>
.g-co {
  display: flex;
  flex-direction: row;
}
.g-co .m-col {
  flex:1;
  margin-right: 10px;
}
.g-co .m-col:last-child pre {
  background: #efefef;
  border: 1px solid #ddd;
}
</style>

--
# Less

--
### Less 简介
LESS是一种动态样式语言，属于CSS预处理语言的一种，它使用类似CSS的语法，为CSS的赋予了动态语言的特性，如变量、继承、运算、函数等，更方便CSS的编写和维护。

--
### Less 安装
1 . 使用npm安装
```
npm install less -g
```

2 . 接下来就可以使用lessc来编译.less文件了
```
lessc file.less file.css
```

--
### Less 客户端使用
1 . 从官方网站[https://github.com/less/less.js]()下载LESSCSS的.js文件   
2 . 在页面中引入.less文件  
```html
<link rel="stylesheet/less" href="myfile.less" />
```
3 . 引入第1步下载的.js文件
```html
<script src="less.js"></script>
```

> 由于浏览器端使用时是使用ajax来解析.less文件，因此直接在本机文件系统打开（即地址是file://开头）或者是有跨域的情况下会无法解析.less文件，导致样式无法生效。


--
### 变量
变量允许我们单独定义一系列通用的样式，然后在需要的时候去调用。
<div class="g-co"><div class="m-col">
```css
<!-- 编译前 -->

@color: #4D926F;
#header {
    color: @color;
}
h2 {
    color: @color;
}
```
</div><div class="m-col">
```css
<!-- 编译后 -->

#header {
    color: #4D926F;
}

h2 {
    color: #4D926F;
}
```
</div></div>


--
### 混合（Mixins）
混合可以将一个定义好的class A轻松的引入到另一个class B中，从而简单实现class B继承class A中的所有属性。还可以带参数地调用，就像使用函数一样。
<div class="g-co"><div class="m-col">
```css
<!-- 编译前 -->

.rounded-corners (@radius: 5px) {
    border-radius: @radius;
}
#header {
    .rounded-corners;
}
#footer {
    .rounded-corners(10px);
}
```
</div><div class="m-col">
```css
<!-- 编译后 -->



#header {
    border-radius: 5px;
}

#footer {
    border-radius: 10px;
}
```
</div></div>


--
### 嵌套
可以在一个选择器中嵌套另一个选择器来实现继承，这样很大程度减少了代码量，并且代码看起来更加的清晰。
<div class="g-co"><div class="m-col">
```css
<!-- 编译前 -->

#header {
    p {
        font-size: 12px;
        a {
            text-decoration: none;
            &:hover {
                border-width: 1px
            }
        }
    }
}
```
</div><div class="m-col">
```css
<!-- 编译后 -->

#header p {
    font-size: 12px;
}

#header p a {
    text-decoration: none;
}

#header p a:hover {
    border-width: 1px;
}
```
</div></div>

--
### 函数和运算
运算提供了加，减，乘，除操作；我们可以做属性值和颜色的运算，这样就可以实现属性值之间的复杂关系。
<div class="g-co"><div class="m-col">
```css
<!-- 编译前 -->
@the-border: 1px;
@base-color: #111;
@red:        #842210;

#header {
    color: (@base-color * 3);
    border-left: @the-border;
}
#footer {
    color: (@base-color + #003300);
    border-color: desaturate(@red, 10%);
}
```
</div><div class="m-col">
```css
<!-- 编译后 -->




#header {
    color: #333;
    border-left: 1px;
}
#footer {
    color: #114411;
    border-color: #7d2717;
}
```
</div></div>


--
### 引用
可以通过 `import`  加载其他 less文件的内容
```css
@import "library"; // library.less
@import "typo.css";
```