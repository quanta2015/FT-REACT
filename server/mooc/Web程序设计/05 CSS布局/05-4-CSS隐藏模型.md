title: CSS隐藏页面元素的5种方法
author:
  name: LI YANG
  url: http://mooc1.chaoxing.com/course/87155873.html
output: T20-web-css-hide.html


--
# CSS隐藏页面元素的5种方法
## The Five Method to Hide Element
用 CSS 隐藏页面元素有许多种方法。你可以将 opacity 设为 0、将 visibility 设为 hidden、将 display 设为 none 或者将 position 设为 absolute 然后将位置设到不可见区域。

你有没有想过，为什么我们要有这么多技术来隐藏元素，而它们看起来都实现的是同样的效果？每一种方法实际上与其他方法之间都有一些细微的不同，这些不同决定了在一个特定的场合下使用哪一个方法。


--
### 1. Opacity
`opacity` 属性的意思是设置一个元素的透明度。它不是为改变元素的边界框（bounding box）而设计的。这意味着将 `opacity` 设为 0 只能从视觉上隐藏元素。而元素本身依然占据它自己的位置并对网页的布局起作用。它也将响应用户交互。

opacity 属性可以用来实现一些效果很棒的动画。任何 `opacity` 属性值小于 1 的元素也会创建一个新的堆叠上下文
> 当你的鼠标移到被隐藏的第 2 个的区块上，元素状态平滑地从完全透明过渡到完全不透明。区块也将 cursor 属性设置为了 pointer，这说明了用户可以与它交互。

```
.hide {
  opacity: 0;
}
```

<style>
  .exp {
    height: 60px;
  }
  .exp div {
  padding: 10px;
  width: 50px;
  height: 50px;
  font-size: 20px;
  background: #aaa;
  text-align: center;
  margin: 1%;
  display: inline-block;
  float: left;
  cursor: pointer;
}

.exp .o-hide {
  opacity: 0;
  transition: all ease 0.8s;
}

.exp .o-hide:hover {
  opacity: 1;
}
</style>

<div class="exp">
  <div>1</div>
  <div class="o-hide">2</div>
  <div>3</div>
</div>


----

--
### 2. Visibility
第二个要说的属性是 `visibility` 。将它的值设为 `hidden` 将隐藏我们的元素。如同 `opacity` 属性，被隐藏的元素依然会对我们的网页布局起作用。与 `opacity` 唯一不同的是它不会响应任何用户交互。

这个属性也能够实现动画效果，只要它的初始和结束状态不一样。这确保了 `visibility` 状态切换之间的过渡动画可以是时间平滑的
> 如果一个元素的 visibility 被设置为 hidden，同时想要显示它的某个子孙元素，只要将那个元素的 visibility 显式设置为 visible 即可（就如例子里面的 .o-hide p——译者注）。尝试只 hover 在隐藏元素上，不要 hover 在 p 标签里的数字上，你会发现你的鼠标光标没有变成手指头的样子。此时，你点击鼠标，你的 click 事件也不会被触发。

> 而在 <div> 标签里面的 <p> 标签则依然可以捕获所有的鼠标事件。一旦你的鼠标移动到文字上，<div> 本身变得可见并且事件注册也随之生效。

```
.hide {
   visibility: hidden;
}
```

<style>
  .exp2 {
    height: 90px;
  }
  .exp2 div {
  padding: 25px;
  width: 80px;
  height: 80px;
  font-size: 20px;
  background: #aaa;
  text-align: center;
  margin: 1%;
  display: inline-block;
  float: left;
  cursor: pointer;
}
.exp2 .o-hide2 {
  visibility: hidden;
  transition: all ease 0.8s;
}
.exp2 .o-hide2:hover {
  visibility: visible;
}
.exp2 .o-hide2 p {
  visibility: visible;
  margin: 0;
  padding: 0;
}
</style>
<div class="exp2">
<div>1</div>
<div class="o-hide2"><p>2</p></div>
<div>3</div>
</div>
<script>
  var oHide = document.querySelector(".o-hide2");
var oHideP = document.querySelector(".o-hide2 p");
var count = oHideP.innerHTML;

oHide.addEventListener("click", function(){
    count++;
    oHideP.innerHTML = count;
});
</script>


----

--
### 3. Display
`display` 属性依照词义真正隐藏元素。将 `display` 属性设为 `none` 确保元素不可见并且连盒模型也不生成。使用这个属性，被隐藏的元素不占据任何空间。不仅如此，一旦 `display` 设为 `none` 任何对该元素直接打用户交互操作都不可能生效。此外，读屏软件也不会读到元素的内容。这种方式产生的效果就像元素完全不存在。

任何这个元素的子孙元素也会被同时隐藏。为这个属性添加过渡动画是无效的，它的任何不同状态值之间的切换总是会立即生效。

不过请注意，通过 DOM 依然可以访问到这个元素。因此你可以通过 DOM 来操作它，就像操作其他的元素。

```
.hide {
   display: none;
}
```
> 第二个块元素内有一个 `<p>` 元素，它自己的 `display` 属性被设置成 `block` ，但是它依然不可见。这是 `visibility:hidden` 和 `display:none `的另一个不同之处。在前一个例子里，将任何子孙元素 `visibility` 显式设置成 `visible` 可以让它变得可见，但是 `display` 不吃这一套，不管自身的 `display` 值是什么，只要祖先元素的 `display` 是 `none` ，它们就都不可见。

> 现在，将鼠标移到第一个块元素上面几次，然后点击它。这个操作将让第二个块元素显现出来，它其中的数字将是一个大于 0 的数。这是因为，元素即使被这样设置成对用户隐藏，还是可以通过 JavaScript 来进行操作。



<div class="exp3">
  <div>Hover!</div>
  <div class="o-hide3"><p>0</p></div>
  <div>0</div>
</div>
<style>
  .exp3 {
    height: 90px;
  }
  .exp3 div {
  padding: 25px 0;
  width: 80px;
  height: 80px;
  font-size: 20px;
  background: #aaa;
  text-align: center;
  margin: 1%;
  display: inline-block;
  float: left;
  cursor: pointer;
}

.exp3 .o-hide3 {
  display: none;
  transition: all ease 0.8s;
}

.exp3 .o-hide3:hover {
  display: block;
}

.exp3 .o-hide3 p {
  display: block;
  margin: 0;
  padding: 0;
}
</style>
<script>
  var count3 = 0;
var oHide3 = document.querySelector(".o-hide3");
var exp3Div = document.querySelector(".exp3 div:nth-child(1)");
exp3Div.addEventListener("mouseover", function(){
    count3++;
    oHide3.innerHTML = '<p>' + count3 + '</p>';
});
exp3Div.addEventListener("click", function(){
  oHide3.style.display = "block";
}); 
</script>


----

--
### 4. Position
假设有一个元素你想要与它交互，但是你又不想让它影响你的网页布局，没有合适的属性可以处理这种情况（ `opacity` 和 `visibility` 影响布局， `display` 不影响布局但又无法直接交互）。在这种情况下，你只能考虑将元素移出可视区域。这个办法既不会影响布局，有能让元素保持可以操作。下面是采用这种办法的 CSS：
```
.hide {
   position: absolute;
   top: -9999px;
   left: -9999px;
}
```
 
> 这种方法的主要原理是通过将元素的 top 和 left 设置成足够大的负数，使它在屏幕上不可见。采用这个技术的一个好处（或者潜在的缺点）是用它隐藏的元素的内容可以被读屏软件读取。这完全可以理解，是因为你只是将元素移到可视区域外面让用户无法看到它。

> 你得避免使用这个方法去隐藏任何可以获得焦点的元素，因为如果那么做，当用户让那个元素获得焦点时，会导致一个不可预料的焦点切换。这个方法在创建自定义复选框和单选按钮时经常被使用。（用 DOM 模拟复选框和单选按钮，但用这个方法隐藏真正的 checkbox 和 radio 元素来“接收”焦点切换



<div class="exp4">
  <div>Hover!</div>
  <div class="o-hide4"><p>0</p></div>
  <div>0</div>
</div>
<style>
   .exp4 {
    height: 90px;
  }
  .exp4 div {
  padding: 25px 0;
  width: 80px;
  height: 80px;
  font-size: 20px;
  background: #aaa;
  text-align: center;
  margin: 1%;
  display: inline-block;
  float: left;
  cursor: pointer;
}

.o-hide4 {
  position: absolute;
  top: -9999px;
  left: -9999px;
}

.o-hide4:hover {
  position: static;
}
</style>
<script>
var count = 0;
var oHide = document.querySelector(".o-hide4");
var firstDiv = document.querySelector(".exp4 div:nth-child(1)");

firstDiv.addEventListener("mouseover", function(){
    count++;
    oHide.innerHTML = count;
});

firstDiv.addEventListener("click", function(){
    oHide.style.position = "static";
});
</script>


----

--
### 5. Clip-path
隐藏元素的另一种方法是通过剪裁它们来实现。在以前，这可以通过 `clip` 属性来实现，但是这个属性被废弃了，换成一个更好的属性叫做 `clip-path`。

记住，`clip-path` 属性还没有在 IE 或者 Edge 下被完全支持。如果要在你的 `clip-path` 中使用外部的 `SVG` 文件，浏览器支持度还要更低。
> 如果你把鼠标悬停在第一个元素上，它依然可以影响第二个元素，尽管第二个元素已经通过 `clip-path` 隐藏了。如果你点击它，它会移除用来隐藏的 class，让我们的元素从那个位置显现出来。被隐藏元素中的文字仍然能够通过读屏软件读取，许多 WordPress 站点使用 `clip-path` 或者之前的 `clip` 来实现专门为读屏软件提供的文字。

> 虽然我们的元素自身不再显示，它也依然占据本该占据的矩形大小，它周围的元素的行为就如同它可见时一样。记住用户交互例如鼠标悬停或者点击在剪裁区域之外也不可能生效。在我们的例子里，剪裁区大小为零，这意味着用户将不能与隐藏的元素直接交互。此外，这个属性能够使用各种过渡动画来实现不同的效果。



```
.hide {
  clip-path: polygon(0px 0px,0px 0px,0px 0px,0px 0px);
}
```
<div class="exp5">
  <div>Hover!</div>
  <div class="oh5">0</div>
  <div>0</div>
</div> 
<style>
  .exp5 {
    height: 90px;
  }
  .exp5 div {
  padding: 25px 0;
  width: 80px;
  height: 80px;
  font-size: 20px;
  background: #aaa;
  text-align: center;
  margin: 1%;
  display: inline-block;
  float: left;
  cursor: pointer;
}
.oh5 {
  clip-path: polygon(0px 0px,0px 0px,0px 0px,0px 0px);
      -webkit-clip-path: polygon(0px 0px, 0px 0px, 0px 0px, 0px 0px);
}
</style>
<script>
  var count5 = 0;
var oHide5 = document.querySelector(".oh5");
var exp5Div = document.querySelector(".exp5 div:nth-child(1)");
exp5Div.addEventListener("mouseover", function(){
    count5++;
    oHide5.innerHTML = count5;
});
exp5Div.addEventListener("click", function(){
    oHide5.className = "";
});
</script>