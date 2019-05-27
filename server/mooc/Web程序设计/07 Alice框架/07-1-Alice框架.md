title: Alice

author:
  name: LI YANG
  url: http://mooc1.chaoxing.com/course/87155873.html
output: 07-web-alice.html

--
# Alice UI
## 支付宝的样式模块库

--
## Alice 是什么
Alice 是漫游仙境的童话女神，是支付宝的样式解决方案，是一套精选的基于 [spm](http://spmjs.io/search?q=alice) 生态圈的样式模块集合，是 Arale 的子集，也是一套模块化的样式命名和组织规范，是写 `CSS` 的更好方式。  
她包括了一套通用样式模块库，一个模块化样式构建规范，一组帮助书写和组织样式的工具，以及产出更多 Alice 模块和样式库的完善方案。  
<p><img src="img/web/webalice01.png" height="300" ></p>

--
## Alice 的特点
1. 模块化的命名和组织方式。

    基于 `spm` 生态圈，使用了Alice 命名规范，以模块的方式组织样式。

2. 强大的工具支持。

    Alice 使用了 `spm`、`nico`、`Peaches` 等实用的工具帮助开发样式。

3. 使用 `iconfont` 和 `CSS3` 技术。

    推崇纯色和简单渐变的视觉效果，Alice 的通用样式模块一律不使用背景图片来实现，
    而是使用了 `iconfont` 和渐进增强的 `CSS3` 技术，视觉上有更好的适应性和现代感，并且支持 `Retina` 屏幕，
    而在低端浏览器下只保证了基础的视觉支持（比如没有圆角）。

    不使用图片的另一个好处是可以在页面中大胆使用通用模块而不用担心请求数过多影响性能。

4. 提供了样式开发方案。

    Alice 不仅仅是一套前端精选模块集，她为写样式提供了一套更好的方案，
    你能够很容易基于她的体系来产出属于自己和团队的模块和样式库。

5. 完整的前端开发体系。

    Alice 是 `Arale` 的子集，她完善和补充了 Arale 中对于样式的解决方案。在背后有着 Arale 的强大支持，
    Alice 的样式模块也能做更多事情。

--
## 基础框架 [Base 重设]
* `base.css` 是 Alice 的浏览器重设样式。  
>它扫除了浏览器默认样式的基本兼容性问题，像建筑的地基一样，让开发者在平地上放心的建造大楼。
>Alice 的 base.css 是结合支付宝开发经验，借鉴 [normalize.css](http://necolas.github.com/normalize.css/) 等业界优秀模块，并加上一些常用 className 而产出的一套重设样式。

* [No CSS Reset](http://snook.ca/archives/html_and_css/no_css_reset/)  
> 实际上，Alice 也是 No CSS Reset 的拥趸，所有的通用模块都不依赖于 base.css 进行开发，它们会有自己的 reset 代码，这样它们在任何页面的表现都会 OK。

--
## 基础框架 [字体]
[alice/base](http://aliceui.org/base/) 采用了 12 像素，1.5 的行高，并且兼容 Mac 和 Window 的字体配置，非常适合国内的网站样式。

```css
body,button,input,select,textarea {
    font:12px/1.5 tahoma,arial,"Hiragino Sans GB",\5b8b\4f53;
}
```

--
## 基础框架 [常用功能类]
- `fn-clear` 清除浮动  
- `fn-hide` 隐藏元素  
- `fn-left` `fn-right` 左右浮动  
- `fn-text-overflow` 文字单行溢出省略号   
> `<div class="fn-text-overflow" style="width:100px">文字很长很长很长</div>`
- `fn-linear` 简单渐变  
- `fn-linear-light` 浅色的简单渐变  
- `fn-rmb` 金额样式 <span class="fn-rmb">￥23.67</span>
- `fn-webkit-adjust` 用于修复 webkit 下小于 10px 的中文字体 `应该已失效`  
> 我们使用 `fn-` 前缀表示一些常用的工具类名，灵活使用这些类会大大提高样式开发效率


--
## 基础框架 [Rei - iconfont]
Rei（读音为“丽”）是支付宝的 iconfont 集，是一种把图标放入自定义字体中，然后使用字体图标来替代普通图标的技术。同时，Rei 也是动漫女神。

<p><img src="img/web/webalice02.png" width="600" ></p>


* 字体图标具有良好的兼容性，矢量，规范，减少图片请求，适应性强等特点，大量先进的网站（包括 github 等）正在使用这种技术。
* Alice 全面使用了 iconfont 技术，使得所有的通用样式模块都不会产生图片请求，并且也获得了良好的兼容性和通用性。

```html
<i class="iconfont" title="灯泡">&#x00E3;</i>
```
* Rei 目前涵盖了网站常用各类图标约 70 多个，兼容包括 `ie6/7/8` 在内的各主流浏览器，你可以自由的在页面中使用它。
* 外网用户强烈推荐访问 [阿里巴巴矢量图标库](http://iconfont.cn) 的公共服务来定制需要的字体图标。

--
## 基础框架 [Grid 栅格]
Alice 的布局是 990px 定宽 25 栅格，这是依托于支付宝实际需求的栅格系统，
在 [我的支付宝]有应用。
<p><img src="img/web/webalice03.png" width="1020" ></p>

- .ui-grid-row：表示一行，用于包裹.ui-grid-{{number}}。一行内的栅格数不要超过 25。
- .ui-grid-{{number}}：表示区域跨越了多少列。数字从 1 到 25，例如ui-grid-18。
```HTML
  <div class="ui-grid-row">
      <div class="ui-grid-5">ui-grid-5</div>
      <div class="ui-grid-15">ui-grid-15</div>
      <div class="ui-grid-5">ui-grid-5</div>
  </div>
```

--
## 基础框架 [Grid 栅格] 范例
- 二列布局
<p><img src="img/web/webalice04.png" width="1020" ></p>
- 三列布局  
<p><img src="img/web/webalice05.png" width="1021" ></p>
- 上中下布局  
<p><img src="img/web/webalice06.png" width="1023" ></p>

--
## 基础框架 [CSS3 Animate]
Alice 引入了一个优秀的 CSS3 [动画库](http://aliceui.org/animate) 。

- 可以通过简单的增减类名的方式在你的项目中实现数十种动画效果。
- 所有的动画效果请点击 [daneden.me/animate](http://daneden.github.io/animate.css/) 查看。

--
## ALICEUI 组件库 [button-dropdown]
按钮下拉菜单样式
<p><img src="img/web/webalice07.png" width="328" ></p>
```HTML
<a class="ui-button ui-button-lorange ui-dbutton ui-dbutton-orange">
    <span class="ui-dbutton-self">下拉菜单</span>
    <i class="ui-dbutton-arrow iconfont" title="下三角形">&#xF03C;</i>
</a>
<a class="ui-button ui-button-morange ui-dbutton ui-dbutton-orange">
    <span class="ui-dbutton-self">下拉菜单</span>
    <i class="ui-dbutton-arrow iconfont" title="下三角形">&#xF03C;</i>
</a>
<a class="ui-button ui-button-sorange ui-dbutton ui-dbutton-orange">
    <span class="ui-dbutton-self">下拉菜单</span>
    <i class="ui-dbutton-arrow iconfont" title="下三角形">&#xF03C;</i>
</a>
```

--
## ALICEUI 组件库 [button]
全站通用按钮组件，无图片纯 css 实现，IE8 以下无圆角。可以很方便的和 alice.iconfont 配合使用。
<p><img src="img/web/webalice08.png" width="355" ></p>
```HTML
<a href="javascript:;" class="ui-button ui-button-lorange">橙色大按钮</a>
<a href="javascript:;" class="ui-button ui-button-morange">橙色中按钮</a>
<a href="javascript:;" class="ui-button ui-button-sorange">橙色小按钮</a>
```

--
## ALICEUI 组件库 [step]
- 通用步骤条，有标准和迷你两套样式。支持二到五步。  
- 步骤下面的文字最多写 6 个字，如果超出，请重置 ui-step 的 overflow 属性。  
<p><img src="img/web/webalice09.png" width="439" ></p>
```HTML
<ol class="ui-step ui-step-3">
    <li class="ui-step-start ui-step-done">
        <div class="ui-step-line">-</div>
        <div class="ui-step-icon">
            <i class="iconfont">&#xf02f;</i>
            <i class="ui-step-number">1</i>
            <span class="ui-step-text">第一步</span>
        </div>
    </li>
    <li class="ui-step-active">
        <div class="ui-step-line">-</div>
        <div class="ui-step-icon">
            <i class="iconfont">&#xf02f;</i>
            <i class="ui-step-number">2</i>
            <span class="ui-step-text">第二步</span>
        </div>
    </li>
    <li class="ui-step-end">
        <div class="ui-step-line">-</div>
        <div class="ui-step-icon">
            <i class="iconfont">&#xf02f;</i>
            <i class="iconfont ui-step-number">&#xF029;</i>
            <span class="ui-step-text">第三步</span>
        </div>
    </li>
</ol>
```

--
## ALICEUI 组件库 [Nav ]
主导航样式，支持两级菜单。
<p><img src="img/web/webalice11.png" width="584" ></p>
```HTML
<div class="ui-nav">
  <ul class="ui-nav-main">
    <li class="ui-nav-item">
      <a href="#">一级导航 1</a>
      <ul class="ui-nav-submain">
        <li class="ui-nav-subitem ui-nav-subitem-current"><a href="#">二级导航 1-1</a></li>
        <li class="ui-nav-subitem"><a href="#">二级导航 1-2</a></li>
        <li class="ui-nav-subitem"><a href="#">二级导航 1-3</a></li>
      </ul>
    </li>
    <li class="ui-nav-item ui-nav-item-current">
      <a href="#">一级导航 2</a>
      <ul class="ui-nav-submain">
        <li class="ui-nav-subitem"><a href="#">二级导航 2-1</a></li>
        <li class="ui-nav-subitem ui-nav-subitem-current"><a href="#">二级导航 2-2</a></li>
        <li class="ui-nav-subitem"><a href="#">二级导航 2-3</a></li>
      </ul>
    </li>
    <li class="ui-nav-item">
      <a href="#">一级导航 3</a>
      <ul class="ui-nav-submain">
        <li class="ui-nav-subitem"><a href="#">二级导航 3-1</a></li>
        <li class="ui-nav-subitem"><a href="#">二级导航 3-2</a></li>
        <li class="ui-nav-subitem ui-nav-subitem-current"><a href="#">二级导航 3-3</a></li>
      </ul>
    </li>
    <li class="ui-nav-item"><a href="#">一级导航 4</a></li>
  </ul>
  <div class="ui-nav-subcontainer"></div>
</div>
```

--
## ALICEUI 组件库 [paging]
通用的分页组件，带有上下页和到达按钮。
<p><img src="img/web/webalice10.png" width="603" ></p>
```HTML
<div class="ui-paging">
    <a href="#" class="ui-paging-prev">
        <i class="iconfont" title="左三角形">&#xF039;</i> 上一页
    </a>
    <a href="#" class="ui-paging-item">1</a>
    <a href="#" class="ui-paging-item ui-paging-current">2</a>
    <a href="#" class="ui-paging-item">3</a>
    <a href="#" class="ui-paging-item">4</a>
    <a href="#" class="ui-paging-item">5</a>
    <a href="#" class="ui-paging-item">6</a>
    <a href="#" class="ui-paging-item">7</a>
    <span class="ui-paging-ellipsis">...</span>
    <a href="#" class="ui-paging-item">24</a>
    <a href="#" class="ui-paging-next">
        下一页 <i class="iconfont" title="右三角形">&#xF03A;</i>
    </a>
    <span class="ui-paging-info"><span class="ui-paging-bold">5/7</span>页</span>
    <span class="ui-paging-which"><input name="some_name" value="6" type="text"></span>
    <a class="ui-paging-info ui-paging-goto" href="#">跳转</a>
</div>
```

--
## 模块组织规范
Alice 的样式模块组织方式追求扁平化的方式，分为三个层级：  
1. 基础框架（reset + iconfont + 栅格）  
2. 通用模块（符合 Alice 规范的样式模块）  
3. 页面样式（继承通用模块）  

> Alice 推荐采用上述的层次来组织你的样式文件，在基础框架的基础上开发一定数量的通用模块，在页面样式模块中继承基础框架和通用模块，并进一步开发。


--
## 模块化命名规范
Alice 对于模块化样式的理解是任何模块在页面上都应该像一个盒模型，不和页面的其他元素互相影响。完美的 Alice 模块应该是一个“口”字型结构。比如 box 模块：
<p><img src="img/web/webalice12.png" width="202" ></p>
> ui-box 模块能够嵌到页面上任何一个位置，box 内部也能够嵌入别的模块（如图中的 ui-list 模块），它们之间不会互相影响。


--
## 怎样才能写出模块化的样式
一种简单的方式是使用 Alice 的类命名规范，当团队中都能采用这种方式书写样式，就能很好地避免样式冲突。
在模块化和命名上，以一个 Tab 模块为例，分解如下：
<p><img src="img/web/webalice13.png" width="724" ></p>
> ui-box 模块能够嵌到页面上任何一个位置，box 内部也能够嵌入别的模块（如图中的 ui-list 模块），它们之间不会互相影响。

--
## 写样式规范1
- 模块名是必选的：名字要求是表意的，一眼就基本能看出模块是做什么的。  
- 模块内部的类名继承于上层的名称。  
```html
  <div class="ui-box">
    <h3 class="ui-box-title"></h3>
    <p class="ui-box-conent"></p>
  </div>
```
不要这样写，很容易造成命名上的冲突。
```html
  <div class="ui-box">
    <h3 class="title"></h3>
    <p class="conent"></p>
  </div>
```

--
## 写样式规范2
- 在模块 DOM 结构的最外一层添加状态，而非给每一个内容添加状态。除非内容有独立的状态。  
    比如，我们可以这样写：
```html
    <div class="ui-box ui-box-hover">
       <h3 class="ui-box-title"></h3>    
       <p class="ui-box-content"></p>
    </div>
```
但不要这样写：
```html
    <div class="ui-new">
       <h3 class="ui-box-title ui-box-title-hover"></h3>
       <p class="ui-box-content ui-box-content-hover"></p>
    </div>
```

--
## 写样式规范3
- 充分考虑标签的语义化  
> 语义化是什么？什么样的写法才是正确的。这里给一个建议，把你将要构建的页面当成一本书。  
> 是段落的，你就用 P(aragraph)；是标题的，就用 H(eader)；是引用的，就用 Blockquote。  
> 而不是简单的，块状的东西由块状元素包含，行内的元素用行内的标签包含。  
> 这里有点要求就是， 去深入了解每个 HTML 标签的用法。  

--
## Alice 类命名规范
<p><img src="img/web/webalice14.png" width="1160" ></p>

--
## Alice 类命名规范
- 模块名  
    尽量让人看到名字就能知道是什么模块，比如 ui-tab， ui-nav 这样的命名。（反例：`ui-shit`）
    用 HTML ENTRY 来引用，不要写空标签，应使用 HTML ENTRY 来替代，以达到语义化的要求。

- 模块整体状态 = 模块名 + 状态  
    `常用状态`有：hover, current, selected, disabled, focus, blur, checked, success, error 等。通常你的命名应该看起来像 .ui-name-hover, .ui-name-error 这样。

- 子模块 = 模块名 + 子模块名  
    常用模块名有：cnt(content)，hd(header)，text(txt)，img(images/pic)，title，item，cell 等，
    只要词义表达了组件要实现的功能或者要表现出来的的外观就可以了。

- 子模块状态 = 模块名 + 子模块名 + 状态  
    参照常用状态。

--
## Alice 类命名注意
- 模块嵌套：大模块可有子模块命名  
> 拿支付宝某项目中的的 .ui-nav 为例，如果有多级，可以这样命名：  
    ui-nav > ui-subnav(ui-nav的子类) > ui-list(嵌套进去的其他模块)
```html
<ul class="ui-nav">
  <li class="ui-nav-item">
    <a href="#">nav Triggle Link</a>
      <ul class="ui-subnav">
        <li class="ui-subnav-item">
          <a href="#">subNav Triggle Link</a>
            <ul class="ui-list">
```
- 统一命名风格：  
    比如你比较喜欢 ui-tip-container ，另外的一个相同作用的地方，就不要写 ui-message-cnt 了，用 `ui-tip-container ui-message-container` 会是更好的选择。

--
## 命名规范的最后
- 用 `-` 来做命名空间上的区隔，最小化两个模块之间的命名冲突。
- 在 Alice 第一个 `ui-` 是作为通用模块的标识，可以选取其他前缀来分类模块。  
> ALICE一共占用了两个前缀 `ui-`、`fn-`，各业务线可以选取自己的前缀。