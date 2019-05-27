title: CSS布局

author:
  name: LI YANG
  url: http://mooc1.chaoxing.com/course/87155873.html
output: T23-web-css-layout.html

--
#  CSS布局
## CSS LAYOUT

--
### 1. 常用居中方法
居中在布局中很常见，我们假设DOM文档结构如下，子元素要在父元素中居中。
```html
<div class="parent">
    <div class="child"></div>
</div>
```

**水平居中**：需要根据子元素为行内元素还是块状元素，宽度一定还是宽度未定来设置。

- 行内元素：对父元素设置 `text-align:center`
- 定宽块状元素： 设置左右 `margin`值为`auto`
- 不定宽块状元素：设置子元素为 `display:inline`，然后在父元素上设置 `text-align:center`
- flex布局：对父元素设置 `display:flex;` `justify-content:center;`

**垂直居中**：根据子元素是单行内联文本、多行内联文本以及块状元素来设置。

- 父元素高度一定，子元素为单行内联文本：设置父元素的height等于行高`line-height`
- 父元素高度一定，子元素为多行内联文本：设置父元素的 `display:table-cell` 或 `inline-block` ，再设置vertical-align:middle;
- 块状元素：设置子元素 `left: 50%` `top: 50%` `transform:translate(-50%,-50%)`
- flex布局：给父元素设置 `display:flex;` `align-items:center;`


--
### 2. 单列布局(定宽、水平居中)
常见的单列布局有两种：

- 等宽布局： `header` 、 `content` 、 `footer` 宽度都相同，其一般不会占满浏览器的最宽宽度，但当浏览器宽度缩小低于其最大宽度时，宽度会自适应。对 `header` 、 `content` 、 `footer` 统一设置 `width` 或 `max-width`，并通过 `margin:auto` 实现居中
- 非等宽布局： `header` 、 `footer` 宽度为浏览器宽度，但 `content` 以及 `header` 和 `footer` 里的内容却不会占满浏览器宽度。 `header` 、 `footer` 的内容宽度为100%，但 `header` 、 `footer` 的内容区以及 `content` 统一设置 `max-width`，并通过 `margin:auto` 实现居中。

<div class="sl">
  <div class="layout-s">
    <div class="red tl">头部</div>
    <div class="green ct">内容</div>
    <div class="red tl">尾部</div>
  </div>
  <div class="layout-d">
    <div class="red tl">头部</div>
    <div class="green ct">内容</div>
    <div class="red tl">尾部</div>
  </div>
</div>
<style>
.sl{
  display: flex;
  flex-direction: row;
  width: 600px;
  text-align: center;
  color: #fff;
  margin: 30px auto;
}
.sl .layout-s,.sl .layout-d {
  width: 200px;
  margin-right: 20px;
}
.tl {
  padding: 5px;
}
.ct {
  height: 100px;
}
.red {
  background: #996600;
}
.green {
  background: #33cc66
}
.layout-d .ct {
  width: 100px;
  margin: 0 auto;
}
</style>

**等宽布局**
```html
<!-- html代码 -->
<div class="layout">
  <div id="header">头部</div>
  <div id="content">内容</div>
  <div id="footer">尾部</div>
</div>

<!-- CSS代码 -->
.layout{
  /* width: 960px;  设置width当浏览器窗口宽度小于960px时，单列布局不会自适应 */
  max-width: 960px;
  margin: 0 auto;
}
```

**非等宽布局**
```html
<!-- html代码 -->
<div id="header">
  <div class="layout">头部</div>
</div>
<div id="content" class="layout">内容</div>
<div id="footer">
  <div class="layout">尾部</div>
</div>

<!-- CSS代码 -->
.layout{
  /* width: 960px;  设置width当浏览器窗口宽度小于960px时，单列布局不会自适应 */
  max-width: 960px;
  margin: 0 auto;
}
```

--
### 3. 二列&三列布局
- 二列布局的特征是侧栏固定宽度，主栏自适应宽度。
- 三列布局的特征是两侧两列固定宽度，中间列自适应宽度。

> 二列布局可以看做去掉一个侧栏的三列布局，其布局的思想有异曲同工之妙。对于传统的实现方法，主要讨论下面前三种布局，经典的带有侧栏的二栏布局以及带有左右侧栏的三栏布局，对于flex布局，实现了下面的五种布局。

<div class="cl">
  <div class="row"><span class="c33 red">SIDE [width fixed]</span><span class="c66 green">MAIN [width adapt]</span></div>
  <div class="row"><span class="c66 green">MAIN [width adapt]</span><span class="c33 red">SIDE [width fixed]</span></div>
  <div class="row"><span class="c33 red">LEFT [width fixed]</span><span class="c33 green">MAIN [width adapt]</span><span class="c33 red">RIGHT [width fixed]</span></div>
  <div class="row"><span class="c33 red">SIDE1 [width fixed]</span><span class="c33 red">SIDE2 [width fixed]</span><span class="c33 green">MAIN [width adapt]</span></div>
  <div class="row"><span class="c33 green">MAIN [width adapt]</span><span class="c33 red">SIDE1 [width fixed]</span><span class="c33 red">SIDE2 [width fixed]</span></div>
</div>

<style>
  .cl {
    width: 600px;
    color: #fff;
    text-align: center;
    padding: 10px 5px 5px 10px;
    border: 1px solid #ddd;
    margin: 30px 0;
  }
  .row {
    display: flex;
    flex-direction: row;
  }
  .row span {
    padding: 10px;
    margin: 0 5px 5px 0;
  }
  .c33 {
    width: 33%
  }
  .c66 {
    width: 66%
  }
</style>


**A.  float+margin**

1. 对两边侧栏分别设置 `width`，左侧栏添加 `float:left`，右侧栏添加 `float:right`。
2. 对主面板设置左右外边距，`margin-left` 的值为左侧栏的宽度，`margin-right` 的值为右侧栏的宽度。

```html
<!-- html代码 -->
<div id="content">
    <div class="sub">sub</div>
    <div class="extra">extra</div>
    <div class="main">main</div>
</div>

<!-- css代码 -->
.sub{
    width: 100px;
    float: left;
}
.extra{
    width: 200px;
    float: right;
}
.main{
    margin-left: 100px; 
    margin-right: 200px;
}
```

> 注意DOM书写顺序，先写两侧栏，再写主面板，更换后则侧栏会被挤到下一列（圣杯布局和双飞翼布局都会用到）。*　这种布局方式比较简单明了，但缺点是渲染时先渲染了侧边栏，而不是比较重要的主面板。如果是左边带有侧栏的二栏布局，则去掉右侧栏，不要设置主面板的margin-right值，其他操作相同。反之亦然。

**B. position+margin**  
##### 原理说明 
通过绝对定位将两个侧栏固定，同样通过外边距给两个侧栏腾出空间，中间列自适应。

##### 布局步骤

1. 对两边侧栏分别设置宽度，设置定位方式为绝对定位。
2. 设置两侧栏的 `top` 值都为 `0`，设置左侧栏的 `left` 值为 `0`， 右侧栏的 `right` 值为 `0`。
3. 对主面板设置左右外边距，`margin-left` 的值为左侧栏的宽度，`margin-right` 的值为右侧栏的宽度。

```html
<!-- html代码 -->
<div class="sub">left</div>
<div class="main">main</div>
<div class="extra">right</div>

<!-- css代码 -->
.sub, .extra {
    position: absolute;
    top: 0; 
    width: 200px;
}
.sub { 
    left: 0;
}
.extra { 
    right: 0; 
}
.main { 
    margin: 0 200px;
}
```

> - 与上一种方法相比，本种方法是通过定位来实现侧栏的位置固定。  
- 如果中间栏含有最小宽度限制，或是含有宽度的内部元素，则浏览器窗口小到一定程度，主面板与侧栏会发生重叠。  
- 如果是左边带有侧栏的二栏布局，则去掉右侧栏，不要设置主面板的`margin-right`值，其他操作相同。反之亦然。


**C. 圣杯布局(float + 负margin + padding + position)**
##### 原理说明 
主面板设置宽度为100%，主面板与两个侧栏都设置浮动，常见为左浮动，这时两个侧栏会被主面板挤下去。通过负边距将浮动的侧栏拉上来，左侧栏的负边距为100%，刚好是窗口的宽度，因此会从主面板下面的左边跑到与主面板对齐的左边，右侧栏此时浮动在主面板下面的左边，设置负边距为负的自身宽度刚好浮动到主面板对齐的右边。为了避免侧栏遮挡主面板内容，在外层设置左右padding值为左右侧栏的宽度，给侧栏腾出空间，此时主面板的宽度减小。由于侧栏的负margin都是相对主面板的，两个侧栏并不会像我们理想中的停靠在左右两边，而是跟着缩小的主面板一起向中间靠拢。此时使用相对布局，调整两个侧栏到相应的位置。

##### 布局步骤
1. 三者都设置向左浮动。
2. 设置 `main` 宽度为`100%`，设置两侧栏的宽度。
3. 设置 负边距，`sub` 设置负左边距为`100%`，`extra` 设置负左边距为负的自身宽度。
4. 设置 `main` 的 `padding` 值给左右两个子面板留出空间。
5. 设置两个子面板为相对定位，`sub` 的 `left` 值为负的 `sub` 宽度，`extra` 的 `right` 值为负的 `extra` 宽度。

```html
<!-- html代码 -->
 <div id="bd">         
    <div class="main"></div>        
    <div class="sub"></div>        
    <div class="extra"></div>  
</div> 

<!-- css代码 -->
.main {        
    float: left;       
    width: 100%;   
 }  
 .sub {       
    float: left;        
    width: 190px;        
    margin-left: -100%;               
    position: relative;  
    left: -190px;  
}   
.extra {        
    float: left;        
    width: 230px;        
    margin-left: -230px; 
    position: relative; 
    right: -230px;  
 }
#bd {        
    padding: 0 230px 0 190px;   
 }
```

> - DOM元素的书写顺序不得更改。  
- 当面板的 `main` 内容部分比两边的子面板宽度小的时候，布局就会乱掉。可以通过设置 `main` 的 `min-width` 属性或使用双飞翼布局避免问题。
二列的实现方法  
- 如果是左边带有侧栏的二栏布局，则去掉右侧栏，不要设置主面板的 `padding-right` 值，其他操作相同。反之亦然。  


**D. 双飞翼布局(float + 负margin + margin)**

##### 原理说明 
双飞翼布局和圣杯布局的思想有些相似，都利用了浮动和负边距，但双飞翼布局在圣杯布局上做了改进，在main元素上加了一层div, 并设置margin,由于两侧栏的负边距都是相对于main-wrap而言，main的margin值变化便不会影响两个侧栏，因此省掉了对两侧栏设置相对布局的步骤。

##### 布局步骤
1. 三者都设置向左浮动。
2. 设置 `main-wrap` 宽度为 `100%`，设置两个侧栏的宽度。
3. 设置 负边距，`sub` 设置负左边距为 `100%`，`extra` 设置负左边距为负的自身宽度。
4. 设置 `main` 的 `margin` 值给左右两个子面板留出空间。

```html
<!-- html代码 -->
<div id="main-wrap" class="column">
      <div id="main">#main</div>
</div>
<div class="sub"></div>        
<div class="extra"></div>

<!-- css代码 -->
.main-wrap {        
    float: left;       
    width: 100%;   
 }  
 .sub {       
    float: left;        
    width: 190px;        
    margin-left: -100%;   
}   
.extra {        
    float: left;        
    width: 230px;        
    margin-left: -230px; 
 }
.main {    
    margin: 0 230px 0 190px;
}
```

> - 圣杯采用的是 `padding`，而双飞翼采用的 `margin`，解决了圣杯布局 `main` 的最小宽度不能小于左侧栏的缺点。  
- 双飞翼布局不用设置相对布局，以及对应的 `left` 和 `right` 值。  
- 通过引入相对布局，可以实现三栏布局的各种组合，例如对右侧栏设置 `position: relative;`  `left: 190px;`  ,可以实现 `sub` + `extra` + `main` 的布局。
二列的实现方法  
- 如果是左边带有侧栏的二栏布局，则去掉右侧栏，不要设置 `main-wrap` 的 `margin-right` 值，其他操作相同。反之亦然。  


**E. flex布局**

```html
<!-- html代码 -->
<div class="layout">
    <aside class="layout_aside">侧边栏宽度固定</aside>
    <div class="layout_main">主内容栏宽度自适应</div>
</div>
<div class="layout">
    <div class="layout_main">主内容栏宽度自适应</div>
    <aside class="layout_aside">侧边栏宽度固定</aside>
</div>
<div class="layout">
    <aside class="layout_aside">左侧边栏宽度固定</aside>
    <div class="layout_main">主内容栏宽度自适应</div>
    <aside class="layout_aside">右侧边栏宽度固定</aside>
</div>
<div class="layout">
    <aside class="layout_aside">第1个侧边栏宽度固定</aside>
    <aside class="layout_aside">第2个侧边栏宽度固定</aside>
    <div class="layout_main">主内容栏宽度自适应</div>
</div>
<div class="layout">
    <div class="layout_main">主内容栏宽度自适应</div>
    <aside class="layout_aside">第1个侧边栏宽度固定</aside>
    <aside class="layout_aside">第2个侧边栏宽度固定</aside>
</div>

<!-- css代码 -->
.layout {
    display: flex;
}
.layout__main {
    flex: 1;
}
.layout__aside {
    width: 200px;
}
```
