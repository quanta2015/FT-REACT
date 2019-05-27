title: JQUERY Practices

author:
  name: LI YANG
  url: http://mooc1.chaoxing.com/course/87155873.html
output: 09-web-jquery-practices.html

--
# JQUERY Practices
##  jQuery编程的最佳实践

--
## 加载jQuery
- 坚持使用CDN来加载jQuery
- 安全起见，最好还是提供一个本地备份以便在无法从远程CDN服务器获取jQuery时网站也能工作
- 使用裸协议的URL（也就是说去掉http:或者https:）
```html
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="js/jquery-1.11.0.min.js" type="text/javascript"><\/script>')</script>
```

--
###  关于变量
- jQuery类型的变量最好加个$前缀
- 时常将jQuery选择器返回的内容存进变量以便重用
- 使用驼峰命名
```js
var $products = $(".box"); 
```

--
###  关于选择器
1 . 尽量使用ID选择器：其背后机理其实是调用原生的document.getElementById()，所以速度较其他选择器快。  
2 . 使用类选择器时不要指定元素的类型。  
3 . ID父亲容器下面再查找子元素请用.find()方法, 这因为通过id选择元素不会使用Sizzle引擎。  
4 . 多级查找中，右边尽量指定得详细点而左边则尽量简单点。
```js
// 丑陋
$("div.data .gonzalez");
// 优化后
$(".data td.gonzalez");
```
5 . 避免冗余
```js
$(".data table.attendees td.gonzalez");
// 好的方式：去掉了中间的冗余
$(".data td.gonzalez");
```
6 . 指定选择的上下文
```js
// 劣质的代码：因为需要遍历整个DOM来找到.class
$('.class');
// 高品代码：因为只需在指定容器范围内进行查找
$('.class', '#class-container');
```
7 . 不要使用万能选择器
```js
$('div.container > *'); // 差
$('div.container').children(); // 棒
```
8 . 警惕隐式的万能选择器。省略的情况下其实使用的就是*号通配符。
```js
$('div.someclass :radio'); // 差
$('div.someclass input:radio'); // 棒
```
9 . ID已经表示唯一了，背后使用的是document.getElementById()，所以不要跟其他选择器混搭了。
```js
$('#outer #inner'); // 脏
$('div#inner'); // 乱
$('.outer-container #inner'); // 差
$('#inner'); // 干净利落，后台只需调用document.getElementById()
```

--
###  DOM操作相关
1 . 操作任何元素前先将其从文档卸载，完了再贴回去。  
```js
var $myList = $("#list-container > ul").detach();
//...一大堆对$myList的处理
$myList.appendTo("#list-container");
```
2 . 代码里将HTML组织好后再一次性贴到DOM中去。  
```js
// 这样不好
var $myList = $("#list");
for(var i = 0; i < 10000; i++){
    $myList.append("<li>"+i+"</li>");
}
 
// 这样好
var $myList = $("#list");
var list = "";
for(var i = 0; i < 10000; i++){
    list += "<li>"+i+"</li>";
}
$myList.html(list);
 
// 但这样更好
var array = []; 
for(var i = 0; i < 10000; i++){
    array[i] = "<li>"+i+"</li>"; 
}
$myList.html(array.join(''));
```
3 . 不要处理不存在的元素
```js
// 无良的做法：jQuery后台要跑完三个函数后才会知道这个元素其实根本不存在
$("#nosuchthing").slideUp();
// 应该这样
var $mySelection = $("#nosuchthing");
if ($mySelection.length) {
    $mySelection.slideUp();
}
```


--
###  事件相关
1 . 一个页面只写一个文档ready事件的处理程序。这样代码既清晰好调试，又容易跟踪代码的进程。
2 . 不要用匿名函数来做事件的回调。匿名函数不易调试维护测试和复用。 
```js
$("#myLink").on("click", function(){...}); // 表这样
 
// 这样
function myLinkClickHandler(){...}
$("#myLink").on("click", myLinkClickHandler);
```
3 . 处理文档ready事件的回调也表用匿名函数，匿名函数不易调试维护测试和复用
```js
$(function(){ ... }); // 糟糕的做法：无法利用此函数也无法为其写测试用例
 
// 好的做法
$(initPage); // 抑或 $(document).ready(initPage);
function initPage(){
    // 这里你可以进行程序的初始化了
}
```
4 . 进一步，最好也将ready事件的处理程序放到外部文件中引入到页面，而页面中内嵌的代码只需调用即可。
```js
<script src="my-document-ready.js"></script>
<script>
    // 初始化一些必要的全局变量
    $(document).ready(initPage); // 抑或 $(initPage);
</script>
```
5 . 千万不要写内联到HTML的JS代码，这是调试的梦魇！应该总是用jQuery来绑定事件自带程序，这样也方便随时动态地取消绑定。
```js
<a id="myLink" href="#" onclick="myEventHandler();">my link</a> <!--不好 -->
$("#myLink").on("click", myEventHandler); // GOOD
```
6 . 如果可能尽量在绑定事件处理程序时使用一个命名空间，这样可以方便地取消绑定而不会影响其他绑定。
```js
$("#myLink").on("click.mySpecialClick", myEventHandler); // 不错
// 之后，让我们优雅地解除绑定
$("#myLink").unbind("click.mySpecialClick");
```

--
###  异步操作
1 . 直接用$.ajax()而表去用.getJson() 或 .get(),因为jQuery内部还是将其转为前者
2 . 表对HTTPS站点使用HTTP去发起请求，最好干脆就表指定（将HTTP或者HTTPS从你的URL中移除）
3 . 表在链接里面嵌参数，请使用专门的参数设置来传递 
```js
// 不易阅读的代码...
$.ajax({
    url: "something.php?param1=test1&param2=test2",
    ....
});
 
// 更易阅读...
$.ajax({
    url: "something.php",
    data: { param1: test1, param2: test2 }
});
```
4 . 尽量指明数据类型以便你自己清楚要处理什么样的数据（见下方会提到的Ajax模板）

5 . 对于异步动态加载的内容，最好使用代理来绑定事件处理程序。这样的好处是对于之后动态加载的元素事件同样有效。
```js
$("#parent-container").on("click", "a", delegatedClickHandlerForAjax);
```
6 . 使用Promise模式。
```js
$.ajax({ ... }).then(successHandler, failureHandler);
 
// 抑或
var jqxhr = $.ajax({ ... });
jqxhr.done(successHandler);
jqxhr.fail(failureHandler);
```
7. 标准的Ajax模板
```js
var jqxhr = $.ajax({
    url: url,
    type: "GET", // 默认为GET,你可以根据需要更改
    cache: true, // 默认为true,但对于script,jsonp类型为false,可以自行设置
    data: {}, // 将请求参数放这里.
    dataType: "json", // 指定想要的数据类型
    jsonp: "callback", // 指定回调处理JSONP类型的请求
    statusCode: { // 如果你想处理各状态的错误的话
        404: handler404,
        500: handler500
    }
});
jqxhr.done(successHandler);
jqxhr.fail(failureHandler);
```

--
###  动画与特效
1 . 保持一个始终如一风格统一的动画实现  
2 . 紧遵用户体验，表滥用动画特效  
3 . 使用简洁的显示隐藏，状态切换，滑入滑出等效果来展示元素  
4 . 使用预设值来设置动画的速度’fast’，’slow’，或者400（中等速度）  

--
###  插件相关
1 . 始终选择一个有良好支持，完善文档，全面测试过并且社区活跃的插件  
2 . 注意所用插件与当前使用的jQuery版本是否兼容  
3 . 一些常用功能应该写成jQuery插件。  

--
###  链式句法
1 . 除了用变量将jQuery选择器返回的结果保存，还可以利用好链式调用。
```js
  $("#myDiv").addClass("error").show();
```
2 . 当链式调用多达3次以上或代码因绑定回调略显复杂时，使用换行和适当的缩进来提高代码的可读性。
```js
  $("#myLink")
    .addClass("bold")
    .on("click", myClickHandler)
    .on("mouseover", myMouseOverHandler)
    .show();
```
3 . 对于特别长的调用最好还是用变量保存下中间结果来简化代码。

--
###  其他
1 . 使用对象字面量来传递参数
```js
$myLink.attr("href", "#").attr("title", "my link").attr("rel", "external"); // 糟糕：调用了三次attr
// 不错，只调用了一次attr
$myLink.attr({
    href: "#",
    title: "my link",
    rel: "external"
});
```
2 . 不要将CSS与jQuery杂揉
```js
$("#mydiv").css({'color':red, 'font-weight':'bold'}); // 不好

.error {/* 不错 */
    color: red;
    font-weight: bold;
}

$("#mydiv").addClass("error");
```
3 . 时刻关注官方Changelog，表使用摒弃了的方法。  
4 . 适时地使用原生JavaScript。
```js
  $("#myId"); // 多少还是会逊色于...
  document.getElementById("myId");
```

--
# JQUERY Tips
##  jQuery编程的技巧


--
### 检查 jQuery 是否加载
在使用 jQuery 进行任何操作之前，你需要先确认它已经加载
```js
if (typeof jQuery == 'undefined') {
  console.log('jQuery hasn\'t loaded');
} else {
  console.log('jQuery has loaded');
}
```

--
### 返回顶部按钮
- 利用 jQuery 中的 `animate` 和 `scrollTop` 方法，你无需插件就可以创建简单的 `scroll up` 效果;
- 调整 scrollTop 的值即可改变滚动着陆位置;
```js
// 返回顶部
$('a.top').click(function (e) {
  e.preventDefault();
  $(document.body).animate({scrollTop: 0}, 800);
});
<!-- 设置锚 -->
<a class="top" href="#">Back to top</a>
```

--
### 预加载图片
如果你的网页使用了大量并非立即可见的图片（例如悬停鼠标触发的图片），那么预加载这些图片就显得很有意义了.
```js
$.preloadImages = function () {
  for (var i = 0; i < arguments.length; i++) {
    $('<img>').attr('src', arguments[i]);
  }
};

$.preloadImages('img/hover-on.png', 'img/hover-off.png');
```
--
### 判断图片是否加载完成
- 在有些情况下，为了继续执行脚本，你需要检查图片是否已经完全加载
- 换用一个带有 id 或者 class 属性的 `<img>` 标签，也可以检查特定图片是否加载完成。
```js
    $('img').load(function () {
      console.log('image load successful');
    });
```

--
### 自动修复失效图片
如果你在你的网站上发现了失效的图片链接，逐个去替换它们将会是个苦差。这段简单的代码可以很大程度地减轻痛苦
```js
$('img').on('error', function () {
  if(!$(this).hasClass('broken-image')) {
    $(this).prop('src', 'img/broken.png').addClass('broken-image');
  }
});
```

--
### 鼠标悬停切换 class
如果你希望在用户将鼠标悬停在某个可点击元素上时改变它的视觉效果，你可以在该元素被悬停时给它添加一个 class，当鼠标不再悬停时，移除这个 class：
```js
$('.btn').hover(function () {
  $(this).addClass('hover');
}, function () {
  $(this).removeClass('hover');
});

//更简单的途径
$('.btn').hover(function () {
  $(this).toggleClass('hover');
});
```

--
### 禁用输入字段
有时你可能希望在用户完成特定操作（例如，勾选“我已阅读条例”的确认框）前禁用表单的提交按钮或禁用其中某个输入框。你可以在你的输入字段上添加 disabled 属性，而后你能在需要时启用它
```js
$('input[type="submit"]').prop('disabled', true);
//你只需在输入字段上再次运行 prop 方法, 但是这一次把 disabled 值改为 false：

$('input[type="submit"]').prop('disabled', false);
```

--
### 阻止链接加载
有时你不希望链接到指定页面或者重载当前页面，而是想让它们干些别的，例如触发其它脚本。这需要在阻止默认动作上做些文章：
```js
  $('a.no-link').click(function (e) {
    e.preventDefault();
  });
```

--
### 缓存 jQuery 选择器
想想你在项目中一次又一次地写了多少相同的选择器吧。每个 $('.element') 都必须查询一次整个 DOM,不管它是否曾这样执行过。作为代替，我们只运行一次选择器，并把结果储存在一个变量中.
```js
var blocks = $('#blocks').find('li');
现在你能在任何地方使用 blocks 变量而无需每次查询 DOM 了:

$('#hideBlocks').click(function () {
  blocks.fadeOut();
});

$('#showBlocks').click(function () {
  blocks.fadeIn();
});
```

--
### 切换淡出 / 滑动
淡出和滑动都是我们在 jQuery 中大量使用的效果。你可能只想在用户点击后展现某个元素，此时用 `fadeIn` 和 `slideDown` 方法就很完美。但是如果你希望这个元素在首次点击时出现，在再次点击时消失，这段代码就很有用了.
```js
// 淡出
$('.btn').click(function () {
  $('.element').fadeToggle('slow');
});

// 切换
$('.btn').click(function () {
  $('.element').slideToggle('slow');
});
```

--
### 简单的手风琴效果
快速实现手风琴效果的简单方法：
```js
// 关闭所有面板
$('#accordion').find('.content').hide();

// 手风琴效果
$('#accordion').find('.accordion-header').click(function () {
  var next = $(this).next();
  next.slideToggle('fast');
  $('.content').not(next).slideUp('fast');
  return false;
});
```


--
### 使两个 div 等高
* 有时你希望无论两个 div 各自包含什么内容，它们总有相同的高度：
```js
$('.div').css('min-height', $('.main-div').height());
//这个例子设置了 min-height，意味着高度可以大于主 div 而不能小于它。
//更灵活的方法是遍历一组元素，然后将高度设置为最高元素的高度：
var $columns = $('.column');
var height = 0;
$columns.each(function () {
  if ($(this).height() > height) {
    height = $(this).height();
  }
});
$columns.height(height);
```

* 如果你希望所有列高度相同：
```js
var $rows = $('.same-height-columns');
$rows.each(function () {
  $(this).find('.column').height($(this).height());
});
```

--
### 在新标签页 / 新窗口打开外部链接
在一个新的浏览器标签页或窗口中打开外部链接，并确保相同来源的链接在同一个标签页或者窗口中打开：
```js
$('a[href^="http"]').attr('target', '_blank');
$('a[href^="//"]').attr('target', '_blank');
$('a[href^="' + window.location.origin + '"]').attr('target', '_self');
//注： window.location.origin 在 IE10 中不可用. 
```

--
### 通过文本查找元素
通过使用 jQuery 的 contains() 选择器，你能够查找元素内容中的文本。若文本不存在，该元素将被隐藏：
```js
var search = $('#search').val();
$('div:not(:contains("' + search + '"))').hide();
```

--
### 在 visibility 属性变化时触发
当用户的焦点离开或者重新回到某个标签页时，触发 Javasrcipt：
```js
$(document).on('visibilitychange', function (e) {
  if (e.target.visibilityState === "visible") {
    console.log('Tab is now in view!');
  } else if (e.target.visibilityState === "hidden") {
    console.log('Tab is now hidden!');
  }
});
```

--
### Ajax 调用错误处理
当一个 Ajax 调用返回 404 或 500 错误时，错误处理程序将被执行。若错误处理未被定义，其它 jQuery 代码可能不再有效。所以定义一个全局的 Ajax 错误处理：
```js
  $(document).ajaxError(function (e, xhr, settings, error) {
    console.log(error);
  });
```