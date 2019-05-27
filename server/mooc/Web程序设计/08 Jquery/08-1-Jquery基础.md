title: JQUERY

author:
  name: LI YANG
  url: http://mooc1.chaoxing.com/course/87155873.html
output: 08-web-jquery.html

--
# JQUERY
##  JavaScript 函数库

--
## jQuery库的特性
- HTML 元素选取
- HTML 元素操作
- CSS 操作
- HTML 事件函数
- JavaScript 特效和动画
- HTML DOM 遍历和修改
- AJAX
- Utilities 

--
###   JQuery如何使用
1.本地添加 jQuery 库  
```HTML
<head>
    <script type="text/javascript" src="jquery.js"></script>
</head>
```
2.网络加载 jQuery 库
从 Google 或 Microsoft 加载 CDN jQuery 核心文件。
```HTML
//使用 Google 的 CDN
<head>
  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs
/jquery/1.4.0/jquery.min.js"></script>
</head>

//使用 Microsoft 的 CDN
<head>
  <script type="text/javascript" src="http://ajax.microsoft.com/ajax/jquery
/jquery-1.4.min.js"></script>
</head>
```

--
### 基础 jQuery 实例
下面的例子演示了 jQuery 的 hide() 函数，隐藏了 HTML 文档中所有的 <p> 元素。
```HTML
<html>
  <head>
    <script type="text/javascript" src="jquery.js"></script>
    <script type="text/javascript">
      $(document).ready(function(){
        $("button").click(function(){
          $("p").hide();
        });
      });
    </script>
  </head>
  <body>
    <h2>This is a heading</h2>
    <p>This is a paragraph.</p>
    <p>This is another paragraph.</p>
    <button type="button">Click me</button>
  </body>
</html>
```

--
### jQuery 语法
jQuery 语法是为 HTML 元素的选取编制的，可以对元素执行某些操作。  
基础语法是：`$(selector).action()`   

- 美元符号定义`jQuery`
- 选择符`selector` “查询”和“查找” HTML 元素
- jQuery `action()` 执行对元素的操作
```JS
$(this).hide() - 隐藏当前元素
$("p").hide() - 隐藏所有段落
$(".test").hide() - 隐藏所有 class="test" 的所有元素
$("#test").hide() - 隐藏所有 id="test" 的元素
```

--
### 文档就绪函数
所有 jQuery 函数位于一个 document ready 函数中,为了防止文档在完全加载（就绪）之前运行 jQuery 代码。

- 试图隐藏一个不存在的元素
- 获得未完全加载的图像的大小
```js
<!-- 经典方法 -->
$(document).ready(function(){
  // logic 
});

<!-- 函数指针方法 -->
$(init) 
function init() {
  //logic
}
```

--
### jQuery 选择器
- jQuery 元素选择器和属性选择器允许您通过`标签名`、`属性名`或`内容`对 HTML 元素进行选择。
- 选择器允许您对 `HTML元素组`或`单个元素`进行操作。
- 选择器允许您对 `DOM 元素组`或`单个 DOM 节点`进行操作。

--
### jQuery 元素选择器
jQuery 使用 `CSS 选择器`来选取 HTML 元素
```js
 $("p") 选取 <p> 元素。
 $("p.intro") 选取所有 class="intro" 的 <p> 元素
 $("p#demo") 选取 id="demo" 的第一个 <p> 元素
```

--
### jQuery 属性选择器
jQuery 使用 `XPath 表达式`来选择带有给定属性的元素。
```js
$("[href]") 选取所有带有 href 属性的元素。
$("[href='#']") 选取所有带有 href 值等于 "#" 的元素。
$("[href!='#']") 选取所有带有 href 值不等于 "#" 的元素。
$("[href$='.jpg']") 选取所有 href 值以 ".jpg" 结尾的元素。
```

--
### jQuery CSS 选择器
jQuery CSS 选择器可用于改变 HTML 元素的 CSS 属性
```js
//把所有 p 元素的背景颜色更改为红色
$("p").css("background-color","red");
```

--
### jQuery选择器实例
```js
$(this) //当前 HTML 元素
$("p")  //所有 <p> 元素
$("p.intro")  //所有 class="intro" 的 <p> 元素
$(".intro") //所有 class="intro" 的元素
$("#intro") //id="intro" 的元素
$("ul li:first")  //每个 <ul> 的第一个 <li> 元素
$("[href$='.jpg']") //所有带有以 ".jpg" 结尾的属性值的 href 属性
$("div#intro .head")  //id="intro" 的 <div> 元素中的所有 class="head" 的元素

:first      $("p:first")  //第一个 `<p>` 元素
:last       $("p:last") //最后一个 `<p>` 元素
:eq(index)  $("ul li:eq(3)")  //列表中的第四个元素（`index` 从 0 开始）
:contains(text) $(":contains('W3School')")  //包含指定字符串的所有元素
:empty      $(":empty") //无子（元素）节点的所有元素
:hidden     $("p:hidden") //所有隐藏的 `<p>` 元素
:input      $(":input") //所有 `<input>` 元素
:checkbox   $(":checkbox")  //所有 `type="checkbox"` 的 <input> 元素
:image      $(":image") //所有 type="image" 的 `<input>` 元素
:enabled    $(":enabled") //所有激活的`input`元素
:selected   $(":selected")  //所有被选取的 `input` 元素
:checked    $(":checked") //所有被选中的 `input` 元素
```

--
### jQuery 事件函数
- jQuery 事件处理方法是 jQuery 中的核心函数。
- 事件处理程序指的是当 HTML 中发生某些事件时所调用的方法。
- 通常会把 jQuery 代码放到 `<head>`部分的事件处理方法中
```js
$("button").click(function() {..some code... } )  
$(document).ready(function)	//将函数绑定到文档的就绪事件（当文档完成加载时）  
$(selector).click(function)	//触发或将函数绑定到被选元素的点击事件  
$(selector).dblclick(function)	//触发或将函数绑定到被选元素的双击事件  
$(selector).focus(function)	//触发或将函数绑定到被选元素的获得焦点事件  
$(selector).mouseover(function)	//触发或将函数绑定到被选元素的鼠标悬停事件  
```

--
###  jQuery 事件处理
jQuery支持多种事件处理机制

- bind/unbind：将某事件（不）绑定到某个函数
- delegate/undelegate：为某对象的某事件（不）指定处理函数
- on/off：为某对象的某事件（不）指定处理函数

```basic
.bind( eventType , handler )
.delegate( selector, eventType, handler )
.on( eventType, selector , handler )
```

--
### jQuery hide()/show()/toggle()
使用 `hide()`和 `show()`方法来隐藏和显示 HTML 元素  
>$(selector).hide(speed,callback);  
>$(selector).show(speed,callback);
使用 toggle() 方法来切换 hide() 和 show() 方法
> $(selector).toggle(speed,callback);
```js
$("#hide").click(function(){
  $("p").hide();
});
$("#show").click(function(){
  $("p").show();
});
$("button").click(function(){
  $("p").toggle();
});
```

--
### jQuery Fading 方法
- `fadeIn()`:淡入已隐藏的元素
- `fadeOut()`:淡出可见元素
- `fadeToggle()`:可以在 fadeIn() 与 fadeOut() 方法之间进行切换
- `fadeTo()`:允许渐变为给定的不透明度（值介于 0 与 1 之间）

> $(selector).fadeIn(speed,callback);
> $(selector).fadeOut(speed,callback);
> $(selector).fadeToggle(speed,callback);
> $(selector).fadeTo(speed,opacity,callback);
```js
$("button").click(function(){
  $("#div3").fadeIn(3000);
  $("#div1").fadeTo("slow",0.15);
});
```

--
### jQuery 滑动
- `slideDown()`:用于向下滑动元素
- `slideUp()`:用于向上滑动元素
- `slideToggle()`:可以在 slideDown() 与 slideUp() 方法之间进行切换

> $(selector).slideDown(speed,callback);
> $(selector).slideUp(speed,callback);
> $(selector).slideToggle(speed,callback);
```js
$("#flip").click(function(){
  $("#panel").slideDown();
});
$("#flip").click(function(){
  $("#panel").slideToggle();
});
```

--
### jQuery 动画
jQuery `animate()` 方法用于创建自定义动画。
> $(selector).animate({params},speed,callback);

- 必需的 params 参数定义形成动画的 CSS 属性。
- 可选的 speed 参数规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒。
- 可选的 callback 参数是动画完成后所执行的函数名称。
```js
$("button").click(function(){
  $("div").animate({
    left:'250px',
    opacity:'0.5',
    height:'150px',
    width:'150px'
  });
}); 
```

--
### jQuery 停止动画
- `stop()`方法用于在动画完成之前,停止动画。
- `stop()` 方法适用于所有 jQuery 效果函数，包括滑动、淡入淡出和自定义动画。

> $(selector).stop(stopAll,goToEnd);
```js
$("#stop").click(function(){
  $("#panel").stop();
});
```

--
### jQuery Callback 函数
- 动画函数将`speed`或`duration`作为可选参数;由于 JavaScript 语句（指令）是逐一执行的,按照次序动画之后的语句可能会产生错误或页面冲突，因为动画还没有完成。
- 为了避免这个情况，可以以参数的形式添加 Callback 函数。
- 当动画 100% 完成后，即调用 `Callback` 函数。

> $(selector).hide(speed,callback)  
```js
//错误（没有 callback）
$("p").hide(1000);
  alert("The paragraph is now hidden");
});
//正确（有 callback）
$("p").hide(1000,function(){
alert("The paragraph is now hidden");
});
```

--
### jQuery 方法链接 [Chaining]
- 链接`（chaining）`的技术，允许我们在相同的元素上运行多条 jQuery 命令，一条接着另一条。
- 当进行链接时可读性变得很差，因此应该使用折行和缩进。
```js
//把 css(), slideUp(), and slideDown() 链接在一起。"p1" 元素首先会变为红色，然后向上滑动，然后向下滑动：
$("#p1").css("color","red").slideUp(2000).slideDown(2000);
//
$("#p1").css("color","red")
  .slideUp(2000)
  .slideDown(2000);
```

--
### jQuery DOM 操作
- jQuery 中非常重要的部分，就是操作 DOM 的能力。
- jQuery 提供一系列与 DOM 相关的方法，这使访问和操作元素和属性变得很容易。

--
### 内容操作
- `text()`:设置或返回所选元素的文本内容
- `html()`:设置或返回所选元素的内容（包括 HTML 标记）
- `val()`:设置或返回表单字段的值
- `attr()`:设置/改变属性值
```js
$("#btn1").click(function(){
  alert("Text: " + $("#test").text());
});
$("#btn2").click(function(){
  alert("HTML: " + $("#test").html());
});
$("#btn1").click(function(){
  alert("Value: " + $("#test").val());
});
$("button").click(function(){
  alert($("#w3s").attr("href"));
});
```

--
### jQuery - 添加元素
- `append()`: 在被选元素的结尾插入内容
- `prepend()`: 在被选元素的开头插入内容
- `after()`: 在被选元素之后插入内容
- `before()`: 在被选元素之前插入内容
```js
$("p").append("Some appended text.");
$("p").prepend("Some prepended text.");
$("img").after("Some text after");
$("img").before("Some text before");
```

--
### jQuery - 删除元素
- `remove()`: 删除被选元素（及其子元素）
- `empty()`: 从被选元素中删除子元素
```js
$("#div1").remove();
$("#div1").empty();

//remove()方法也可接受一个参数，允许您对被删元素进行过滤。
$("p").remove(".italic");
```

--
### jQuery 操作 CSS
- `addClass()`: 向被选元素添加一个或多个类
- `removeClass()`: 从被选元素删除一个或多个类
- `toggleClass()`: 对被选元素进行添加/删除类的切换操作
- `css()`: 设置或返回样式属性
```js
$("button").click(function(){
  $("div").addClass("important");
});
$("button").click(function(){
  $("h1,h2,p").removeClass("blue");
});
```

--
### jQuery css() 方法
`css()`方法设置或返回被选元素的一个或多个样式属性。
> css("propertyname");
> css("propertyname","value");
> css({"propertyname":"value","propertyname":"value",...});
```js
$("p").css("background-color");
$("p").css("background-color","yellow");
$("p").css({"background-color":"yellow","font-size":"200%"});
```

--
### jQuery - 尺寸
- `width()`:设置或返回元素的宽度（不包括内边距、边框或外边距）。
- `height()`:设置或返回元素的高度（不包括内边距、边框或外边距）。
- `innerWidth()`:返回元素的宽度（包括内边距）。
- `innerHeight()`:返回元素的高度（包括内边距）。
- `outerWidth()`:返回元素的宽度（包括内边距和边框）。
- `outerHeight()`:返回元素的高度（包括内边距和边框）。
- `outerWidth(true)`:返回元素的宽度（包括内边距、边框和外边距）。
- `outerHeight(true)`:返回元素的高度（包括内边距、边框和外边距）。

--
### jQuery 遍历
`遍历`意为`移动`，用于根据其相对于其他元素的关系来“查找”（或选取）HTML 元素。以某项选择开始，并沿着这个选择移动，直到抵达您期望的元素为止。
- `<div>`元素是 `<ul>`的父元素，同时是其中所有内容的祖先。
- `<ul>` 元素是 `<li>` 元素的父元素，同时是 `<div>`的子元素
- 左边的`<li>`元素是 `<span>`的父元素，`<ul>`的子元素，同时是`<div>`的后代。
- `<span>`元素是`<li>` 的子元素，同时是 `<ul>` 和 `<div>`的后代。
- 两个 `<li>`元素是同胞（拥有相同的父元素）。
- 右边的 `<li>`元素是 `<b>` 的父元素，`<ul>`的子元素，同时是 `<div>`的后代。
- `<b>`元素是右边的 `<li>`的子元素，同时是 `<ul>`和 `<div>`的后代。
<p><img src="img/web/webjquery01.png" alt=""></p>

--
### jQuery 遍历 - 祖先
- `parent()`: 返回被选元素的直接父元素,只会向上一级对 DOM 树进行遍历;
- `parents()`:法返回被选元素的所有祖先元素，它一路向上直到文档的根元素`<html>`。
- `parentsUntil()`:返回介于两个给定元素之间的所有祖先元素
```js
  $("span").parent();
  $("span").parents();
  $("span").parentsUntil("div");
```

--
### jQuery 遍历 - 后代
- `children()`:返回被选元素的所有直接子元素,只会向下一级对 DOM 树进行遍历。
- `find()`:返回被选元素的后代元素，一路向下直到最后一个后代。
```js
  $("div").children();
  $("div").find("span");
```

--
### jQuery 遍历 - 同胞
- `siblings()`:返回被选元素的所有同胞元素。
- `next()`:返回被选元素的下一个同胞元素。
- `nextAll()`:返回被选元素的所有跟随的同胞元素。
- `nextUntil()`:返回介于两个给定参数之间的所有跟随的同胞元素。
- `prev()`:返回被选元素的上一个同胞元素。
- `prevAll()`:返回被选元素的所有前序的同胞元素。
- `prevUntil()`:返回介于两个给定参数之间的所有前序的同胞元素。

--
### jQuery 遍历 - 过滤
- `first()`:返回被选元素的首个元素。
- `last()`:返回被选元素的最后一个元素。
- `eq()`:返回被选元素中带有指定索引号的元素,索引号从 0 开始，不是 1;
- `filter()`:允许您规定一个过滤标准。
- `not()`:返回不匹配标准的所有元素。

```HTML
//选取首个 <div> 元素内部的第一个 <p> 元素
$("div p").first();
//选择最后一个 <div> 元素中的最后一个 <p> 元素
$("div p").last();
//选取第二个 <p> 元素
$("p").eq(1);
//返回带有类名 "intro" 的所有 <p> 元素
$("p").filter(".intro");
//返回不带有类名 "intro" 的所有 <p> 元素
$("p").not(".intro");
```