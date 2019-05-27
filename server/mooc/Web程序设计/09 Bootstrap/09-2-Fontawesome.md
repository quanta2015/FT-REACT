title: Font-Awesome

author:
  name: LI YANG
  url: http://mooc1.chaoxing.com/course/87155873.html
output: T09-web-fontawesome.html

<link rel="stylesheet" href="lib/font-awesome.min.css">
--
#   Font-Awesome
##  图标字体库和CSS框架

-- 
### Font Awesome 简介
Font Awesome为您提供可缩放的矢量图标，您可以使用CSS所提供的所有特性对它们进行更改，包括：大小、颜色、阴影或者其它任何支持的效果。
<p><img src="img/web/webfont01.png" width="700" ></p>

<h4><i class="fa fa-flag"></i> 一个字库，585个图标</h4>
> 仅一个Font Awesome字库，就包含了与网页相关的所有形象图标。  

<h4><i class="fa fa-ban"></i> 无需依赖JavaScript</h4>
> Font Awesome完全不依赖JavaScript，因此无需担心兼容性。  

<h4><i class="fa fa-arrows-alt"></i> 无限缩放</h4>
> 无论在任何尺寸下，可缩放的矢量图形都会为您呈现出完美的图标。 

<h4><i class="fa fa-microphone"></i> 如言语一般自由</h4>
> Font Awesome完全免费，哪怕是商业用途。

<h4><i class="fa fa-pencil"></i> CSS控制</h4>
> 只要CSS支持，无论颜色、大小、阴影或者其它任何效果，都可以轻易展现。  

<h4><i class="fa fa-eye"></i> 高分屏完美呈现</h4>
> Font Awesome的矢量图标，将使您的网站在视网膜级的高分屏上大放异彩。

<h4><i class="fa fa-gamepad"></i> 完美兼容其它框架</h4>
> 尽管是为Bootstrap设计，但Font Awesome同样能与其它框架完美协同运作。

<h4><i class="fa fa-desktop"></i> 可用于桌面系统</h4>
> 用于桌面系统，或需要一套完整的矢量图，请查看备忘。 

<h4><i class="fa fa-search"></i> 可适配于屏幕阅读器</h4>
> 与其它字体不同，Font Awesome不会影响屏幕阅读器正常工作。


--
### Font-Awesome 使用方法
1. 复制整个 font-awesome 文件夹到您的项目中。
2. 在HTML的 <head> 中引用font-awesome.min.css。
```HTML
<link rel="stylesheet" href="path/font-awesome/css/font-awesome.min.css">
```

--
### 基本图标 
使用CSS前缀 `fa` ，再加上图标名称。 `Font Awesome`是为使用内联元素而设计的。我们通常更喜欢使用 `<i>` ，因为它更简洁。 但实际上使用 `<span> `才能更加语义化。
```HTML
<i class="fa fa-camera-retro"></i> fa-camera-retro
```
<i class="fa fa-camera-retro"></i> fa-camera-retro
 
--
### 自定义尺寸图标
使用 `fa-lg` (33%递增)、`fa-2x`、`fa-3x`、`fa-4x`，或者 `fa-5x` 类 来放大图标。
```HTML
<i class="fa fa-camera-retro fa-lg"></i> fa-lg
<i class="fa fa-camera-retro fa-2x"></i> fa-2x
<i class="fa fa-camera-retro fa-3x"></i> fa-3x
<i class="fa fa-camera-retro fa-4x"></i> fa-4x
<i class="fa fa-camera-retro fa-5x"></i> fa-5x
```
<i class="fa fa-camera-retro fa-lg"></i> fa-lg
<i class="fa fa-camera-retro fa-2x"></i> fa-2x
<i class="fa fa-camera-retro fa-3x"></i> fa-3x
<i class="fa fa-camera-retro fa-4x"></i> fa-4x
<i class="fa fa-camera-retro fa-5x"></i> fa-5x
 
--
### 固定宽度图标
使用 `fa-fw` 可以将图标设置为一个固定宽度。主要用于不同宽度图标无法对齐的情况。 尤其在列表或导航时起到重要作用。
```HTML
<div class="list-group">
  <li class="list-group-item" href="#"><i class="fa fa-home fa-fw"></i>Home</li>
  <li class="list-group-item" href="#"><i class="fa fa-book fa-fw"></i>Library</li>
  <li class="list-group-item" href="#"><i class="fa fa-pencil fa-fw"></i> Applications</li>
  <li class="list-group-item" href="#"><i class="fa fa-cog fa-fw"></i>Settings</li>
</div>
```
<div class="list-group">
  <li class="list-group-item" href="#"><i class="fa fa-home fa-fw"></i>Home</li>
  <li class="list-group-item" href="#"><i class="fa fa-book fa-fw"></i>Library</li>
  <li class="list-group-item" href="#"><i class="fa fa-pencil fa-fw"></i> Applications</li>
  <li class="list-group-item" href="#"><i class="fa fa-cog fa-fw"></i>Settings</li>
</div>



--
### 列表图标
使用 `fa-ul` 和 `fa-li` 便可以简单的将无序列表的默认符号替换掉。
```html
<ul class="fa-ul">
  <li><i class="fa-li fa fa-check-square"></i>List icons</li>
  <li><i class="fa-li fa fa-check-square"></i>can be used</li>
  <li><i class="fa-li fa fa-spinner fa-spin"></i>as bullets</li>
  <li><i class="fa-li fa fa-square"></i>in lists</li>
</ul>
```
<ul class="fa-ul">
  <li><i class="fa-li fa fa-check-square"></i>List icons</li>
  <li><i class="fa-li fa fa-check-square"></i>can be used</li>
  <li><i class="fa-li fa fa-spinner fa-spin"></i>as bullets</li>
  <li><i class="fa-li fa fa-square"></i>in lists</li>
</ul>


--
### 边框与内陷图标
使用 `fa-border` 以及 `pull-right` 或 `pull-left` 可以轻易构造出引用的特殊效果。
```HTML
<i class="fa fa-quote-left fa-3x pull-left fa-border"></i>
...tomorrow we will run faster, stretch out our arms farther...
And then one fine morning— So we beat on, boats against the
current, borne back ceaselessly into the past.
```
<style>.box {width: 300px;height:150px;}</style>
<div class="box"><i class="fa fa-quote-left fa-3x pull-left fa-border"></i>
...tomorrow we will run faster, stretch out our arms farther...
And then one fine morning— So we beat on, boats against the
current, borne back ceaselessly into the past.</div>


--
### 动画图标
使用 `fa-spin` 类来使任意图标旋转，现在您还可以使用 `fa-pulse` 来使其进行8方位旋转。尤其适合 `fa-spinner`、`fa-refresh` 和 `fa-cog` 。
```HTML
<i class="fa fa-spinner fa-spin"></i>
<i class="fa fa-circle-o-notch fa-spin"></i>
<i class="fa fa-refresh fa-spin"></i>
<i class="fa fa-cog fa-spin"></i>
<i class="fa fa-spinner fa-pulse"></i>
```
<i class="fa fa-spinner fa-spin fa-3x fa-fw margin-bottom"></i>
<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw margin-bottom"></i>
<i class="fa fa-refresh fa-spin fa-3x fa-fw margin-bottom"></i>
<i class="fa fa-cog fa-spin fa-3x fa-fw margin-bottom"></i>
<i class="fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom"></i>


--
### 旋转与翻转图标
使用 `fa-rotate-*` 和 `fa-flip-*` 类可以对图标进行任意旋转和翻转。
```HTML
<i class="fa fa-shield"></i> normal<br>
<i class="fa fa-shield fa-rotate-90"></i> fa-rotate-90<br>
<i class="fa fa-shield fa-rotate-180"></i> fa-rotate-180<br>
<i class="fa fa-shield fa-rotate-270"></i> fa-rotate-270<br>
<i class="fa fa-shield fa-flip-horizontal"></i> fa-flip-horizontal<br>
<i class="fa fa-shield fa-flip-vertical"></i> icon-flip-vertical
```
<i class="fa fa-shield"></i> normal<br>
<i class="fa fa-shield fa-rotate-90"></i> fa-rotate-90<br>
<i class="fa fa-shield fa-rotate-180"></i> fa-rotate-180<br>
<i class="fa fa-shield fa-rotate-270"></i> fa-rotate-270<br>
<i class="fa fa-shield fa-flip-horizontal"></i> fa-flip-horizontal<br>
<i class="fa fa-shield fa-flip-vertical"></i> icon-flip-vertical

--
### 组合使用图标
如果想要将多个图标组合起来，使用 `fa-stack` 类作为父容器， `fa-stack-1x` 作为正常比例的图标， `fa-stack-2x` 作为大一些的图标。还可以使用 `fa-inverse` 类来切换图标颜色。您可以在父容器中 通过添加 大图标 类来控制整体大小。
```HTML
<span class="fa-stack fa-lg">
  <i class="fa fa-square-o fa-stack-2x"></i>
  <i class="fa fa-twitter fa-stack-1x"></i>
</span>
fa-twitter on fa-square-o<br>
<span class="fa-stack fa-lg">
  <i class="fa fa-circle fa-stack-2x"></i>
  <i class="fa fa-flag fa-stack-1x fa-inverse"></i>
</span>
fa-flag on fa-circle<br>
<span class="fa-stack fa-lg">
  <i class="fa fa-square fa-stack-2x"></i>
  <i class="fa fa-terminal fa-stack-1x fa-inverse"></i>
</span>
fa-terminal on fa-square<br>
<span class="fa-stack fa-lg">
  <i class="fa fa-camera fa-stack-1x"></i>
  <i class="fa fa-ban fa-stack-2x text-danger"></i>
</span>
fa-ban on fa-camera
```
<span class="fa-stack fa-lg">
  <i class="fa fa-square-o fa-stack-2x"></i>
  <i class="fa fa-twitter fa-stack-1x"></i>
</span>
fa-twitter on fa-square-o<br>
<span class="fa-stack fa-lg">
  <i class="fa fa-circle fa-stack-2x"></i>
  <i class="fa fa-flag fa-stack-1x fa-inverse"></i>
</span>
fa-flag on fa-circle<br>
<span class="fa-stack fa-lg">
  <i class="fa fa-square fa-stack-2x"></i>
  <i class="fa fa-terminal fa-stack-1x fa-inverse"></i>
</span>
fa-terminal on fa-square<br>
<span class="fa-stack fa-lg">
  <i class="fa fa-camera fa-stack-1x"></i>
  <i class="fa fa-ban fa-stack-2x text-danger"></i>
</span>
fa-ban on fa-camera