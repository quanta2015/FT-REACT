title: Bootstrap 

author:
  name: LI YANG
  url: http://mooc1.chaoxing.com/course/87155873.html
output: 09-web-jquery-practices.html

--
# BOOTSTRAP
##  Bootstrap前端开发框架

--
## Bootstrap
- 简洁、直观、强悍的前端开发框架，让web开发更迅速、简单。
<img src="img/web/webstrap01.png" width="700">

<script src="lib/jquery.js"></script>
<script src="lib/bootstrap.js"></script>
<link href="lib/bootstrap.css" rel="stylesheet">

--
## Bootstrap安装
- `Bootstrap` 插件全部依赖 `jQuery`，因此`jQuery` 必须在 `Bootstrap` 之前引入。在 `bower.json` 中列出了 `Bootstrap` 所支持的 `jQuery` 版本。
```html
bootstrap/
├── css/
│   ├── bootstrap.css
│   ├── bootstrap.css.map
│   ├── bootstrap.min.css
│   ├── bootstrap-theme.css
│   ├── bootstrap-theme.css.map
│   └── bootstrap-theme.min.css
├── js/
│   ├── bootstrap.js
│   └── bootstrap.min.js
└── fonts/
    ├── glyphicons-halflings-regular.eot
    ├── glyphicons-halflings-regular.svg
    ├── glyphicons-halflings-regular.ttf
    ├── glyphicons-halflings-regular.woff
    └── glyphicons-halflings-regular.woff2
```

--
### Bootstrap基本模板
这就是一个最简单的 Bootstrap 页面
```HTML
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>Bootstrap 101 Template</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <h1>你好，世界！</h1>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="//cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
  </body>
</html>
```

--
### HTML5 文档类型
- Bootstrap 使用到的某些 HTML 元素和 CSS 属性需要将页面设置为 HTML5 文档类型。
- 项目中的每个页面都要参照下面的格式进行设置。
```HTML
<!DOCTYPE html>
<html lang="zh-CN">
  ...
</html>
```

--
### 移动设备优先
- Bootstrap 是移动设备优先的。
- 针对移动设备的样式融合进了框架的每个角落，而不是增加一个额外的文件。
- 为了确保适当的绘制和触屏缩放，需要在 `<head>` 之中添加 `viewport` 元数据标签。
```HTML
<meta name="viewport" content="width=device-width, initial-scale=1">
```
- 在移动设备浏览器上，通过为`viewport`设置 `meta` 属性为 `user-scalable=no` 可以禁用其缩放 `zooming` 功能
```HTML
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
```

--
### Bootstrap排版与链接
Bootstrap 排版、链接样式设置了基本的全局样式。

- 为 body 元素设置 `background-color: #fff`;
- 使用 `@font-family-base`、`@font-size-base` 和 `@line-height-base` 变量作为排版的基本参数
- 为所有链接设置了基本颜色 `@link-color` ，并且当链接处于 `:hover` 状态时才添加下划线


--
### Normalize.css
为了增强跨浏览器表现的一致性，使用了 Normalize.css

<p><img src="img/web/webstrap02.png" width="300"></p>

--
### Bootstrap 布局容器
- Bootstrap 为页面内容和栅格系统包裹一个 `.container` 容器。
- Bootstrap提供了2个类,这两种容器类不能互相嵌套。


```HTML
.container 类用于固定宽度并支持响应式布局的容器。
<div class="container">
  ...
</div>

.container-fluid 类用于 100% 宽度，占据全部视口（viewport）的容器。
<div class="container-fluid">
  ...
</div>
```

--
### Bootstrap 栅格系统
Bootstrap 提供了一套响应式、移动设备优先的流式栅格系统，随着屏幕或视口（viewport）尺寸的增加，系统会自动分为最多12列。

1. `row` 必须包含在 `.container` 或 `.container-fluid`中;此时 `row` 的 `alignment`  `padding`是自动计算的;
2. 通过 `row` 在水平方向创建一组 `column`,内容应当放置于 `col·umn` 内，只有 `column` 可以作为 `row` 的直接子元素。
3. 类似 `.row` 和 `.col-xs-4` 这种预定义的类，可以快速创建栅格布局。
4. 通过为 `column` 设置 `padding` 属性，从而创建列与列之间的间隔 `gutter`;
5. 通过为 `.row` 元素设置负值 `margin` 从而抵消掉为 `.container` 元素设置的 `padding` ,也就间接为 `row` 所包含的 `column` 抵消掉了 `padding`
6. 栅格系统中的 `column` 是通过指定1到12的值来表示其跨越的范围。例如，三个等宽的列可以使用三个 `.col-xs-4` 来创建;
7. 如果一个 `row` 中包含了的 `column` 大于 12, 多余的 `column` 被作为一个整体另起一行排列;
8. 栅格类适用于 `ScreenWide>= 分界点` 的设备, 并且覆盖小屏幕设备, 因此`.col-md-* `栅格类适用于任何场合;

--
### Bootstrap 媒体查询
在栅格系统中，在 `Less` 文件中使用 `media query` 来创建关键的分界点阈值。
```css
/* 超小屏幕（手机，小于 768px） */
/* No media query since this is the default in Bootstrap */

/* 小屏幕（平板，大于等于 768px） */
@media (min-width: @screen-sm-min) { ... }

/* 中等屏幕（桌面显示器，大于等于 992px） */
@media (min-width: @screen-md-min) { ... }

/* 大屏幕（大桌面显示器，大于等于 1200px） */
@media (min-width: @screen-lg-min) { ... }
```

--
### Bootstrap 栅格参数
通过下表可以详细查看 Bootstrap 的栅格系统是如何在多种屏幕设备上工作的。
<p><img src="img/web/webstrap03.png" width="700"></p>

--
### 实例： 堆叠 -> 水平
- 使用单一的一组 `.col-md-*` 栅格类创建一个基本的栅格系统  
- 在手机和平板设备上一开始是堆叠在一起的  
- 在桌面（中等）屏幕设备上变为水平排列  
<p><img src="img/web/webstrap04.png" width="642"></p>
```HTML
<div class="row">
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  ...
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
</div>
<div class="row">
  <div class="col-md-8">.col-md-8</div>
  <div class="col-md-4">.col-md-4</div>
</div>
<div class="row">
  <div class="col-md-4">.col-md-4</div>
  <div class="col-md-4">.col-md-4</div>
  <div class="col-md-4">.col-md-4</div>
</div>
<div class="row">
  <div class="col-md-6">.col-md-6</div>
  <div class="col-md-6">.col-md-6</div>
</div>
```


--
### 实例：流式布局容器
将最外面的布局元素 `.container` 修改为 `.container-fluid`，就可以将固定宽度的栅格布局转换为 100% 宽度的布局。
```HTML
<div class="container-fluid">
  <div class="row">
    ...
  </div>
</div>
```

--
### 实例：移动设备和桌面屏幕
适应超小屏幕和中等屏幕设备的布局，同时定义 `.col-xs-*` 和 `.col-md-*`
<p><img src="img/web/webstrap05.png" width="641"></p>
```HTML
<!-- Stack the columns on mobile y making one full-width and the other half-width -->
<div class="row">
  <div class="col-xs-12 col-md-8">.col-xs-12 .col-md-8</div>
  <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
</div>

<!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
<div class="row">
  <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
  <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
  <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
</div>

<!-- Columns are always 50% wide, on mobile and desktop -->
<div class="row">
  <div class="col-xs-6">.col-xs-6</div>
  <div class="col-xs-6">.col-xs-6</div>
</div>
```
<p><img src="img/web/webstrap06.png" width="320"></p>

--
### 实例：多余的列（column）将另起一行排列
如果在一个 `.row` 内包含的 `column` 大于12个，包含多余 `column` 的元素将作为一个整体单元被另起一行排列。
<p><img src="img/web/webstrap07.png" width="620"></p>
```HTML
<div class="row">
  <div class="col-xs-9">.col-xs-9</div>
  <div class="col-xs-4">.col-xs-4</div>
  <div class="col-xs-6">.col-xs-6</div>
</div>
```

--
### 响应式列重置
有时某些列可能会出现比别的列高的情况，为了克服这个问题，建议使用 `.clearfix`
<p><img src="img/web/webstrap08.png" width="738"></p>
```HTML
<div class="row">
  <div class="col-xs-6 col-sm-3">.col-xs-6 .col-sm-3</div>
  <div class="col-xs-6 col-sm-3">.col-xs-6 .col-sm-3</div>

  <!-- Add the extra clearfix for only the required viewport -->
  <div class="clearfix visible-xs-block"></div>

  <div class="col-xs-6 col-sm-3">.col-xs-6 .col-sm-3</div>
  <div class="col-xs-6 col-sm-3">.col-xs-6 .col-sm-3</div>
</div>
```
<p><img src="img/web/webstrap09.png" width="720"></p>

--
### 列偏移
使用 `.col-md-offset-*` 类可以将列向右侧偏移。这些类实际是通过使用 * 选择器为当前元素增加了左侧的边距 `margin` 。
<p><img src="img/web/webstrap10.png" width="738"></p>
```HTML
<div class="row">
  <div class="col-md-4">.col-md-4</div>
  <div class="col-md-4 col-md-offset-4">.col-md-4 .col-md-offset-4</div>
</div>
<div class="row">
  <div class="col-md-3 col-md-offset-3">.col-md-3 .col-md-offset-3</div>
  <div class="col-md-3 col-md-offset-3">.col-md-3 .col-md-offset-3</div>
</div>
<div class="row">
  <div class="col-md-6 col-md-offset-3">.col-md-6 .col-md-offset-3</div>
</div>
```

--
### 嵌套列
- 为了使用内置的栅格系统将内容再次嵌套，可以通过添加一个新的 `.row` 元素和一系列 `.col-sm-*` 元素到已经存在的 `.col-sm-*` 元素内。
- 被嵌套的行 `row` 所包含的列 `column` 的个数不能超过12
<p><img src="img/web/webstrap11.png" width="558"></p>
```HTML
<div class="row">
  <div class="col-sm-9">
    Level 1: .col-sm-9
    <div class="row">
      <div class="col-xs-8 col-sm-6">
        Level 2: .col-xs-8 .col-sm-6
      </div>
      <div class="col-xs-4 col-sm-6">
        Level 2: .col-xs-4 .col-sm-6
      </div>
    </div>
  </div>
</div>
```

--
### 页面主体
`Bootstrap` 将全局 `font-size` 设置为 `14px` ，`line-height`设置为 `1.428`。这些属性直接赋予 `<body>` 元素和所有段落元素。
`<p>` 元素还被设置了等于 `1/2` 行高（即 10px）的底部外边距（`margin`）。

--
### Bootstrap 新页面元素
- Marked text: `<mark>` 
- 被删除的文本: `<del>`
- 带下划线的文本: `u`
- 小号文本: `<small>`
- 内联代码: `<code>`
- 用户输入: `<kbd>`

--
### 表单元素
- 所有设置了 `.form-control` 类的 `<input>`、`<textarea>` 和 `<select>` 元素都将被默认设置宽度属性为 `width: 100%`
- 将 `label` 元素和前面提到的控件包裹在 `.form-group` 中可以获得最好的排列。
<p><img src="img/web/webstrap12.png" width="680"></p>
```HTML
<form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
</form>
```

--
### 内联表单
- 为 `<form>` 元素添加 `.form-inline` 类可使其内容左对齐并且表现为 `inline-block` 级别的控件。
- 只适用于 `viewport >= 768px` 宽度时
<p><img src="img/web/webstrap13.png" width="587"></p>
```HTML
必须为每个输入控件设置 `label` 标签, 如果不需要显示,可以为 `label` 设置 `.sr-only` 类将其隐藏

<form class="form-inline">
  <div class="form-group">
    <label for="exampleInputName2">Name</label>
    <input type="text" class="form-control" id="exampleInputName2" placeholder="Jane Doe">
  </div>
  <div class="form-group">
    <label for="exampleInputEmail2">Email</label>
    <input type="email" class="form-control" id="exampleInputEmail2" placeholder="jane.doe@example.com">
  </div>
  <button type="submit" class="btn btn-default">Send invitation</button>
</form>
```

--
### 下拉列表（select）
很多原生选择菜单的圆角是无法通过修改 `border-radius` 属性来改变的。
<select class="form-control">
  <option>1</option>
  <option>2</option>
  <option>3</option>
  <option>4</option>
  <option>5</option>
</select>
```HTML
<select class="form-control">
  <option>1</option>
  <option>2</option>
  <option>3</option>
  <option>4</option>
  <option>5</option>
</select>
```

--
### 按钮
可作为按钮使用的标签或元素为 `<a>`、`<button>` 或 `<input>`元素
> 虽然按钮类可以应用到 `<a>` 和 `<button>` 元素上，但是导航和导航条组件只支持 `<button>` 元素。
> 如果 `<a>` 元素被作为按钮使用，务必为其设置 `role="button"` 属性
> 强烈建议尽可能使用 `<button>` 元素来获得在各个浏览器上获得相匹配的绘制效果。

<a class="btn btn-default" href="#" role="button">Link</a>
<button class="btn btn-default" type="submit">Button</button>
<input class="btn btn-default" type="button" value="Input">
<input class="btn btn-default" type="submit" value="Submit">
```HTML
<a class="btn btn-default" href="#" role="button">Link</a>
<button class="btn btn-default" type="submit">Button</button>
<input class="btn btn-default" type="button" value="Input">
<input class="btn btn-default" type="submit" value="Submit">
```

--
### 按钮-预定义样式
使用下面列出的类可以快速创建一个带有预定义样式的按钮。

<button type="button" class="btn btn-default">（默认样式）Default</button>
<button type="button" class="btn btn-primary">（首选项）Primary</button>
<button type="button" class="btn btn-success">（成功）Success</button>
<button type="button" class="btn btn-info">（一般信息）Info</button>
<button type="button" class="btn btn-warning">（警告）Warning</button>
<button type="button" class="btn btn-danger">（危险）Danger</button>
```HTML
<button type="button" class="btn btn-default">（默认样式）Default</button>
<button type="button" class="btn btn-primary">（首选项）Primary</button>
<button type="button" class="btn btn-success">（成功）Success</button>
<button type="button" class="btn btn-info">（一般信息）Info</button>
<button type="button" class="btn btn-warning">（警告）Warning</button>
<button type="button" class="btn btn-danger">（危险）Danger</button>
```

--
### 按钮-尺寸
使用 `.btn-lg`、`.btn-sm` 或 `.btn-xs` 就可以获得不同尺寸的按钮。

<p>
  <button type="button" class="btn btn-primary btn-lg">（大按钮）Large button</button>
  <button type="button" class="btn btn-default btn-lg">（大按钮）Large button</button>
</p>
<p>
  <button type="button" class="btn btn-primary">（默认尺寸）Default button</button>
  <button type="button" class="btn btn-default">（默认尺寸）Default button</button>
</p>
<p>
  <button type="button" class="btn btn-primary btn-sm">（小按钮）Small button</button>
  <button type="button" class="btn btn-default btn-sm">（小按钮）Small button</button>
</p>
<p>
  <button type="button" class="btn btn-primary btn-xs">（超小尺寸）Extra small button</button>
  <button type="button" class="btn btn-default btn-xs">（超小尺寸）Extra small button</button>
</p>
```HTML
<p>
  <button type="button" class="btn btn-primary btn-lg">（大按钮）Large button</button>
  <button type="button" class="btn btn-default btn-lg">（大按钮）Large button</button>
</p>
<p>
  <button type="button" class="btn btn-primary">（默认尺寸）Default button</button>
  <button type="button" class="btn btn-default">（默认尺寸）Default button</button>
</p>
<p>
  <button type="button" class="btn btn-primary btn-sm">（小按钮）Small button</button>
  <button type="button" class="btn btn-default btn-sm">（小按钮）Small button</button>
</p>
<p>
  <button type="button" class="btn btn-primary btn-xs">（超小尺寸）Extra small button</button>
  <button type="button" class="btn btn-default btn-xs">（超小尺寸）Extra small button</button>
</p>
```
> 通过给按钮添加 `.btn-block` 类可以将其拉伸至父元素100%的宽度，而且按钮也变为了块级（block）元素。


--
### 响应式图片
通过为图片添加 .img-responsive 类可以让图片支持响应式布局。
其实质是为图片设置了 `max-width: 100%;` 、 `height: auto;` 和 `display: block;` 属性，从而让图片在其父元素中更好的缩放。
```HTML
<img src="..." class="img-responsive" alt="Responsive image">
```

--
### 图片形状
通过为 `<img>` 元素添加以下相应的类，可以让图片呈现不同的形状。
<p><img src="img/web/webstrap14.png" width="474"></p>
```HTML
<img src="..." alt="..." class="img-rounded">
<img src="..." alt="..." class="img-circle">
<img src="..." alt="..." class="img-thumbnail">
```

--
### 情境文本颜色
通过颜色来展示意图，Bootstrap 提供了一组工具类。这些类可以应用于链接，并且在鼠标经过时颜色可以还可以加深，就像默认的链接一样。
<p class="text-muted">muted</p>
<p class="text-primary">primary</p>
<p class="text-success">success</p>
<p class="text-info">info</p>
<p class="text-warning">warning</p>
<p class="text-danger">danger</p>
```HTML
<p class="text-muted">...</p>
<p class="text-primary">...</p>
<p class="text-success">...</p>
<p class="text-info">...</p>
<p class="text-warning">...</p>
<p class="text-danger">...</p>
```

--
### 情境背景色
和情境文本颜色类一样，使用任意情境背景色类就可以设置元素的背景。链接组件在鼠标经过时颜色会加深，就像上面所讲的情境文本颜色类一样。
<style> .pg{padding: 10px;}</style>
<p class="bg-primary pg">primary</p>
<p class="bg-success pg">success</p>
<p class="bg-info pg">info</p>
<p class="bg-warning pg">warning</p>
<p class="bg-danger pg">danger</p>
```HTML
<p class="bg-primary">...</p>
<p class="bg-success">...</p>
<p class="bg-info">...</p>
<p class="bg-warning">...</p>
<p class="bg-danger">...</p>
```