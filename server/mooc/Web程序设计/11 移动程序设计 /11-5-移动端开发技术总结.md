title: 移动端开发技术总结

author:
  name: LI YANG
  url: http://mooc1.chaoxing.com/course/87155873.html
output: T03-web-html-mobile.html

--
# HTML MOBILE DEVELOPMENT
## 移动端开发技术总结

--
### 1、私有的meta标签
```CSS
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<meta content="telephone=no" name="format-detection">
```
* 第一个`meta`标签表示：强制让文档的宽度与设备的宽度保持1:1，并且文档最大的宽度比例是1.0，且不允许用户点击屏幕放大浏览；
* 第二个`meta`标签是iphone设备中的safari私有meta标签，它表示：允许全屏模式浏览；
* 第三个`meta`标签也是iphone的私有标签，它指定的iphone中safari顶端的状态条的样式；
* 第四个`meta`标签表示：告诉设备忽略将页面中的数字识别为电话号码。


--
### 2、HTML5标签的使用

* 编写webapp时，建议前端工程师使用HTML5，而放弃HTML4，因为HTML5可以实现一些HTML4中无法实现的丰富的WEB应用程序的体验，可以减少开发者很多的工作量;
* 熟悉HTML5的新标签的作用。比如定义一块内容或文章区域可使用section标签，定义导航条或选项卡可以直接使用nav标签等等。


--
### 3、放弃CSS float属性
在项目开发过程中可以会遇到内容排列显示的布局，假如你遇见这样的视觉稿，建议你放弃float，可以直接使用display:inline-block。

--
### 4、利用CSS3边框背景属性
* 按钮的圆角效果，有内发光效果还有高光效果，这样的按钮使用CSS3写是无法写出来的，当然圆角可以使用CSS3来写，但高光和内发光却无法使用CSS3编写，
* 建议使用-webkit-border-image来定义这个按钮的样式。

--
### 5、块级化a标签
请保证将每条数据都放在一个a标签中，为何这样做？因为在触控手机上，为提升用户体验，尽可能的保证用户的可点击区域较大。

--
### 6、自适应布局模式
* 不建议前端工程师把容器（不管是外层容器还是内层）的宽度定死。
* 为达到适配各种手持设备，建议使用自适应布局模式（支付宝采用了自适应布局模式），因为这样做可以让你的页面在ipad、itouch、ipod、iphone、android、web safarik、chrome都能够正常的显示，你无需再次考虑设备的分辨率。

--
### 7、学会使用webkit-box
* webkit为display属性提供了一个webkit-box的值，可以做到盒子模型灵活控制。

--
### 8、如何去除Android平台中对邮箱地址的识别
* iOS提供了一个`meta`标签用于禁用iOS对页面中电话号码和邮件地址的自动识别;
* Android平台会自动检测邮件地址，当用户touch到这个邮件地址时，Android会弹出一个框提示用户发送邮件
```css
//去除Android自动识别页面中的邮件地址
<meta content="email=no" name="format-detection" />
```

--
### 9、如何去除iOS和Android中的输入URL的控件条
* 你的老板或者PD或者交互设计师可能会要求你：能否让我们的webapp更加像nativeapp，我不想让用户看见那个输入url的控件条？
```js
  //必须放在window.onload里才能够正常的工作
  //而且当前文档的内容高度必须是高于窗口的高度时
  setTimeout(scrollTo,0,0,0);
```

--
### 10、如何禁止用户旋转设备
* 在移动版的webkit中做不到禁止用户旋转设备
* IOS`safari`能够阻止浏览器的orientationchange事件
* Android无法阻止浏览器orientationchange事件

--
### 11、如何检测用户是通过主屏启动你的webapp
* 从主屏启动的webapp和浏览器访问你的webapp最大的区别是它清除了浏览器上方和下方的工具条，这样你的webapp就更加像是nativeapp了
* window对像中的navigator子对象的一个standalone属性。浏览器直接访问站点时，navigator.standalone为false，从主屏启动webapp时，navigator.standalone为true， 我们可以通过navigator.
* 在Android中从来没有添加到主屏这回事

--
### 如何关闭iOS中键盘自动大写
* 在iOS中，当虚拟键盘弹出时，默认情况下键盘是开启首字母大写的功能的，根据某些业务场景，可能我们需要关闭这个功能，移动版本webkit为input元素提供了autocapitalize属性，通过指定autocapitalize=”off”来关闭键盘默认首字母大写。

--
### iOS中如何彻底禁止用户在新窗口打开页面
* 有时我们可能需要禁止用户在新窗口打开页面，可以通过指定当前元素的-webkit-touch-callout样式属性为none来禁止iOS弹出这些按钮。
* 这个技巧仅适用iOS对于Android平台则无效。

--
### iOS中如何禁止用户保存图片＼复制图片
* 为一个img标签指定-webkit-touch-callout为none也会禁止设备弹出列表按钮，这样用户就无法保存＼复制你的图片了。

--
### iOS中如何禁止用户选中文字
* 通过指定文字标签的-webkit-user-select属性为none便可以禁止iOS用户选中文字。

--
### iOS中如何获取滚动条的值
* IOS未定义document.scrollTop和document.scrollLeft，必须通过window.scrollY和window.scrollX得到当前窗口的y轴和x轴滚动条的值；
* Android可以通过document.scrollTop和document.scrollLeft；

--
### 如何解决盒子边框溢出
* 通常会对块级元素(内部是文本框)定义为宽度100％，以实现全屏自适应的样式，但此时你会发现，该元素的边框(左右)各1个像素会溢了文档，导致出现横向滚动条;
* 为解决这一问题，可以为其添加一个特殊的样式-webkit-box-sizing:border-box;用来指定该盒子的大小，包括边框的宽度。


--
### android平台中页面无法自适应
* 虽然你的html和css都是完全自适应的，但在android中显示的并不是自适应的时候，首先请你确认你的head标签中是否包含以下meta标签：
```css
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0;" />
```

--
### 设计模板
* 一级标题(36px/2 #323232)
* 二级标题(28px/2 #626262)
* 三级标题(22px/2 #929292)
* 分割线(#d8d8d8)
* 通用背景色(#f7f7f7)
