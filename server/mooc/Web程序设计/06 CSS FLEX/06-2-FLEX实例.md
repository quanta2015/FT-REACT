title: CSS Flex布局实例

author:
  name: LI YANG
  url: http://mooc1.chaoxing.com/course/87155873.html
output: T10-web-css-flex2.html

--
#  CSS Flex布局实例
## Flex弹性盒子模型布局实例

--
### 骰子的布局
骰子的一面，最多可以放置9个点。
<p><img src="img/web/webflexEx01.png" width="318" ></p>
看Flex如何实现从1个点到9个点的布局。
<p><img src="img/web/webflexEx02.png" width="600" ></p>
Flex模板一律如下：
- `div` 元素（代表骰子的一个面）是`Flex`容器，`span`元素（代表一个点）是`Flex`项目。
- 如果有多个项目，就要添加多个`span`元素，以此类推。
```html
<div class="box">
  <span class="item"></span>
</div>
```

--
### 1. 单项目
- 只有左上角1个点的情况。Flex布局默认就是首行左对齐，所以一行代码就够了。
<p><img src="img/web/webflexEx03.png" width="400" ></p>
```HTML
.box {
  display: flex;
}
```
- 设置项目的对齐方式，就能实现居中对齐和右对齐。
<p><img src="img/web/webflexEx04.png" width="400" ></p>
```HTML
.box {
  display: flex;
  justify-content: center;
}
```

<p><img src="img/web/webflexEx05.png" width="400" ></p>
```HTML
.box {
  display: flex;
  justify-content: flex-end;
}
```

- 设置交叉轴对齐方式，可以垂直移动主轴。
<p><img src="img/web/webflexEx06.png" width="400" ></p>
```HTML
.box {
  display: flex;
  align-items: center;
}
```

<p><img src="img/web/webflexEx07.png" width="400" ></p>
```HTML
.box {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

<p><img src="img/web/webflexEx08.png" width="400" ></p>
```HTML
.box {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
```

<p><img src="img/web/webflexEx09.png" width="400" ></p>
```HTML
.box {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
```

### 2. 双项目
- 只有左上角1个点的情况。Flex布局默认就是首行左对齐，所以一行代码就够了。
<p><img src="img/web/webflexEx10.png" width="400" ></p>
```HTML
.box {
  display: flex;
  justify-content: space-between;
}
```

<p><img src="img/web/webflexEx11.png" width="400" ></p>
```HTML
.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
```

<p><img src="img/web/webflexEx12.png" width="400" ></p>
```HTML
.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
```

<p><img src="img/web/webflexEx13.png" width="400" ></p>
```HTML
.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}
```

<p><img src="img/web/webflexEx14.png" width="400" ></p>
```HTML
.box {
  display: flex;
}

.item:nth-child(2) {
  align-self: center;
}
```

<p><img src="img/web/webflexEx15.png" width="400" ></p>
```HTML
.box {
  display: flex;
  justify-content: space-between;
}

.item:nth-child(2) {
  align-self: flex-end;
}
```

### 3. 三项目
- 只有左上角1个点的情况。Flex布局默认就是首行左对齐，所以一行代码就够了。
<p><img src="img/web/webflexEx16.png" width="400" ></p>
```HTML
.box {
  display: flex;
}

.item:nth-child(2) {
  align-self: center;
}

.item:nth-child(3) {
  align-self: flex-end;
}
```

### 4. 四项目
<p><img src="img/web/webflexEx17.png" width="400" ></p>
```css
.box {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-content: space-between;
}
```

<p><img src="img/web/webflexEx18.png" width="400" ></p>
```HTML
<div class="box">
  <div class="column">
    <span class="item"></span>
    <span class="item"></span>
  </div>
  <div class="column">
    <span class="item"></span>
    <span class="item"></span>
  </div>
</div>
```
```css
.box {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}

.column {
  flex-basis: 100%;
  display: flex;
  justify-content: space-between;
}
```

### 5. 六项目
<p><img src="img/web/webflexEx19.png" width="400" ></p>
```css
.box {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}
```

<p><img src="img/web/webflexEx20.png" width="400" ></p>
```css
.box {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: space-between;
}
```

<p><img src="img/web/webflexEx21.png" width="400" ></p>
```html
<div class="box">
  <div class="row">
    <span class="item"></span>
    <span class="item"></span>
    <span class="item"></span>
  </div>
  <div class="row">
    <span class="item"></span>
  </div>
  <div class="row">
     <span class="item"></span>
     <span class="item"></span>
  </div>
</div>
```

```css
.box {
  display: flex;
  flex-wrap: wrap;
}

.row{
  flex-basis: 100%;
  display:flex;
}

.row:nth-child(2){
  justify-content: center;
}

.row:nth-child(3){
  justify-content: space-between;
}
```

### 6. 九项目
<p><img src="img/web/webflexEx22.png" width="400" ></p>
```css
.box {
  display: flex;
  flex-wrap: wrap;
}
```

### 1. 基本网格布局
最简单的网格布局，就是平均分布。在容器里面平均分配空间，跟上面的骰子布局很像，但是需要设置项目的自动缩放。
<p><img src="img/web/webflexEx23.png" width="800" ></p>
```html
<div class="Grid">
  <div class="Grid-cell">...</div>
  <div class="Grid-cell">...</div>
  <div class="Grid-cell">...</div>
</div>
```
```css
.Grid {
  display: flex;
}
.Grid-cell {
  flex: 1;
}
```

### 2. 百分比布局
某个网格的宽度为固定的百分比，其余网格平均分配剩余的空间
<p><img src="img/web/webflexEx24.png" width="800" ></p>
```html
<div class="Grid">
  <div class="Grid-cell u-1of4">...</div>
  <div class="Grid-cell">...</div>
  <div class="Grid-cell u-1of3">...</div>
</div>
```
```css
.Grid {
  display: flex;
}

.Grid-cell {
  flex: 1;
}

.Grid-cell.u-full {
  flex: 0 0 100%;
}

.Grid-cell.u-1of2 {
  flex: 0 0 50%;
}

.Grid-cell.u-1of3 {
  flex: 0 0 33.3333%;
}

.Grid-cell.u-1of4 {
  flex: 0 0 25%;
}
```

### 3. 圣杯布局
- 圣杯布局（Holy Grail Layout）指的是一种最常见的网站布局。
- 页面从上到下，分成三个部分：头部（header），躯干（body），尾部（footer）。
- 其中躯干又水平分成三栏，从左到右为：导航、主栏、副栏。
<p><img src="img/web/webflexEx25.png" width="600" ></p>
```html
<body class="HolyGrail">
  <header>...</header>
  <div class="HolyGrail-body">
    <main class="HolyGrail-content">...</main>
    <nav class="HolyGrail-nav">...</nav>
    <aside class="HolyGrail-ads">...</aside>
  </div>
  <footer>...</footer>
</body>
```
```css
.HolyGrail {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

header,
footer {
  flex: 1;
}

.HolyGrail-body {
  display: flex;
  flex: 1;
}

.HolyGrail-content {
  flex: 1;
}

.HolyGrail-nav, .HolyGrail-ads {
  /* 两个边栏的宽度设为12em */
  flex: 0 0 12em;
}

.HolyGrail-nav {
  /* 导航放到最左边 */
  order: -1;
}
```
> 如果是小屏幕，躯干的三栏自动变为垂直叠加。
```css
@media (max-width: 768px) {
  .HolyGrail-body {
    flex-direction: column;
    flex: 1;
  }
  .HolyGrail-nav,
  .HolyGrail-ads,
  .HolyGrail-content {
    flex: auto;
  }
}
```


### 4. 输入框的布局
我们常常需要在输入框的前方添加提示，后方添加按钮。
<p><img src="img/web/webflexEx26.png" width="600" ></p>
```html
<div class="InputAddOn">
  <span class="InputAddOn-item">...</span>
  <input class="InputAddOn-field">
  <button class="InputAddOn-item">...</button>
</div>
```
```css
.InputAddOn {
  display: flex;
}

.InputAddOn-field {
  flex: 1;
}
```

### 5. 悬挂式布局
有时，主栏的左侧或右侧，需要添加一个图片栏。
<p><img src="img/web/webflexEx27.png" width="600" ></p>
```html
<div class="Media">
  <img class="Media-figure" src="" alt="">
  <p class="Media-body">...</p>
</div>
```
```css
.Media {
  display: flex;
  align-items: flex-start;
}

.Media-figure {
  margin-right: 1em;
}

.Media-body {
  flex: 1;
}
```

### 6. 固定的底栏
有时，页面内容太少，无法占满一屏的高度，底栏就会抬高到页面的中间。这时可以采用Flex布局，让底栏总是出现在页面的底部。
<p><img src="img/web/webflexEx28.png" width="600" ></p>
```html
<body class="Site">
  <header>...</header>
  <main class="Site-content">...</main>
  <footer>...</footer>
</body>
```
```css
.Site {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.Site-content {
  flex: 1;
}
```

### 7. 流式布局
每行的项目数固定，会自动分行。
<p><img src="img/web/webflexEx29.png" width="200" ></p>
```css
.parent {
  width: 200px;
  height: 150px;
  background-color: black;
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
}

.child {
  box-sizing: border-box;
  background-color: white;
  flex: 0 0 25%;
  height: 50px;
  border: 1px solid red;
}
```


