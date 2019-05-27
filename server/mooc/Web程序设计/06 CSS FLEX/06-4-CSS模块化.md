title: CSS模块化
author:
  name: LI YANG
  url: http://mooc1.chaoxing.com/course/87155873.html
output: T22-css-component-rules.html


--
# CSS模块化
## Sss Component Rules


--
### 早期CSS存在的问题
```css
body {
  margin: 0;
  padding: 0;
  font-size: 18px;
}

.box {
  background: #333;
  color: #fff;
}

.box .list {
  margin-left: 10px;
}

.box .list .item {
  border-bottom: 1px solid #ccc;
}

.box .list .item:last-child {
  border-bottom: 0;
}

.box .list .item a {
  text-decoration: none;
  color: #fff;
}

.box .list .item span {
  color: red;
}
```

- **选择器繁琐冗长**
- **空间顺序混淆**：越来越长的选择器容易使我们混淆dom的空间顺序，无法看清平级的选择器的关系，是父子还是兄弟元素？
- **维护困难**：假设我们需要重构这个box，在.box和.list之间加入一层.wrap，在.item与a和span之间加入一层.block，需要谨慎地找到确切的位置，然后再找到所有匹配的、长长的选择器，在合适的位置全部做修改；
- **难以复用**： 如果另外一个页面也需要这个box，需要把所有跟box相关的部分复制粘贴一份，同时修改时，又要重新找出所有用到这个box的地方，然后又是复制粘贴一份；

### 代码复用
只需要提供一个公共css库，来存放我们的公共样式以及公共模块即可：
```css
/* common.css */

body {
  background: #fff;
  color: #333;
  font-size: 16px;
}

.box ... {
  background: #333;
  color: #fff;
  ...
}

.another-box ... {
  ...
}
```
在其他的css文件中引用这个common.css，这样就实现了代码的复用。
```css
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
  <title>index</title>
  <link rel="stylesheet" type="text/css" href="./style/common.css">
  <link rel="stylesheet" type="text/css" href="./style/index.css">
</head>
<body>
  <div class="box">
    ...
  </div>
  <div class="another-box">
    ...
  </div>
</body>
</html>
```

### 问题所在
上述CSS复用看起来很完美，但是讨论以下问题：

- **体积问题**： 假设我们这个项目非常大，大概有20个页面这么多，那么我们每做一个页面就会往common里面补充3～4个公共样式/模块，那么在这个项目开发完成以后，common的体积可能要比其他css的体积都大；
- **冗余问题**：假设有几个这样的页面，他们本身内容非常少，比如404页面，可能只需要用到少量的公共样式，但是由于考虑到维护问题，我们还是要引入common（单独写样式会使得该页面在common更新的时候无法同步得到更新），这就使得一个页面变得很“重”；
- **命名问题**：由于common越写越大，它所占用的命名就越多，那么我们在引入common的时候，即使我们页面还什么都没有，但已经默认被占用了很多的命名，使得我们在某个页面的可用命名变少，而且是越来越少；
- **重名问题**：我们在common中书写公共模块，在具体页面的私有css里书写私有模块，假设现在我们需要全局添加一个公共模块.nice-box，我们发现，这个模块名已经在index.css中被占用了，于是我们试着把名字改成.handsome-box，却又发现这个名字在about.css中被占用了


### CSS编程规划
规定页面由且只由几种基本结构体构成：`框架`、`模块`，以及`元件`。其他零散的元素，除了是作为模块的辅助类，否则不能独立于这三者存在。

### 框架
**框架是指构成页面的基础结构，它是一个页面的筋骨。**我们假设有个页面`index.html`，它的整体最外围表现为一个class为`.g-index`的div，然后它由页头（`.g-hd`）、主体（`.g-bd`）、页脚（`.g-ft`）三个部分组成：
```html
<!-- index.html -->

<!DOCTYPE html>
<html>
<head>
  <title>index</title>
</head>
<body>
  <div class="g-index">
    <div class="g-hd"></div>
    <div class="g-bd"></div>
    <div class="g-ft"></div>
  </div>
</body>
</html>
```
这样我们就大概能描绘出一个页面的基本轮廓了。

### 模块
**模块是页面上数量最多，同时也是最重要的部分，它是代码复用的主体部分，是一个个按照功能划分的区域**，如`导航栏`、`轮播图`、`登录窗口`、`信息列表`等等，模块之间相互独立，分布在页面上，嵌在框架的各个位置上，组成一个丰富多彩的页面。

还是以`index.html`为例，我们假设页头有个导航栏模块（`.m-nav`），主体有个新闻列表模块（`.m-news`），页脚有个版权声明模块（`.m-copy_right`）：
```html
<!-- index.html -->

<!DOCTYPE html>
<html>
<head>
  <title>index</title>
</head>
<body>
  <div class="g-index">
    <div class="g-hd">
      <div class="m-nav">
        nav
      </div>
    </div>
    <div class="g-bd">
      <div class="m-news">
        news
      </div>
    </div>
    <div class="g-ft">
      <div class="m-copy_right">
        copy_right
      </div>
    </div>
  </div>
</body>
</html>
```

### 元件
**元件是独立的、可重复使用的，并且在某些情况下可以作为模块的组成部分的一种细颗粒**。比如一个`按钮`，一个`logo`等等。某种意义上说，它其实可以等同于模块，因为它们两者的区别只是规模不同而已。模块更强调一个功能完整的整体，而元件则更强调独立性。

我们假设这个页面还需要在页头放个logo（`.u-logo`），在导航栏中放置一个登录按钮（`.u-login_btn`）：
```html
<!-- index.html -->

<!DOCTYPE html>
<html>
<head>
  <title>index</title>
</head>
<body>
  <div class="g-index">
    <div class="g-hd">
      <img class="u-logo" alt="logo">
      <div class="m-nav">
        nav
        <a href="/logoin" class="u-login_btn">登录</a>
      </div>
    </div>
    <div class="g-bd">
      <div class="m-news">
        news
      </div>
    </div>
    <div class="g-ft">
      <div class="m-copy_right">
        copy_right
      </div>
    </div>
  </div>
</body>
</html>
```

### 命名规范
为了更好地标志一个结构体，更好地展示它的功用，以语义化的方式，实现隔离作用，起到类似命名空间的效果。

- 框架的命名以` g- `开头，一般与页面同名，比如index.html，那框架就是最外层就是` .g-index `，` about.html `就是` .g-about `，以此类推，其他常用的内部结构有` .g-hd `（header）、` .g-bd `（body）、` .g-ft `（footer）、` .g-sd `（side）、` .g-mn `（main）等等；
- 模块命名以` m- `开头，一般以相对应的用途来命名，比如导航栏` m-nav `、新闻` m-news `、版权` m-copy_right `等等，一般来说模块名是唯一的，而且模块本身应该是可移植、可复用的；
- 元件命名以` u- `开头，一般以自身含义来命名，比如` u-logo `表示一个logo，` u-btn `表示一个按钮。

> 除框架、模块、元件的相关命名内容之外，命名规范还有以下几点内容：

1 . 命名尽量以**缩写的方式**，言简意赅地表达，比如用bd表达body，用nav表达navigator等，使用长长的单词显得多余又臃肿；  
2 . **前缀与名称之间用-连接，而名称之间的若干单词以_连接**，组合单词除外，如side-menu；  
3 . **z-开头表示状态**，如z-active、z-succ、z-disabled等等；  
4 . 可以根据需要定制其他开头，但是**请尽量将分类控制在少数**，因为太多的分类反而造成困惑和不必要的分类开销，其实gmuz就已经可以满足日常开发了。  
### 重构common
有了命名规范，我们可以对common进行一次改写：
```css
/* common.css */

body {
  background: #fff;
  color: #333;
  font-size: 16px;
}

.m-nav { ... }

.m-news { ... }

.m-copy_right { ... }
```
一定程度上缓解了“污染”的问题，至少按照命名规范，common构成由原来笼统的一类，变成了现在gmuz四类，变得更加可管理且“没那么容易冲突”了，但是这还远没有解决“污染”。

以下为了方便表述，把common.css称为“common”，把对应页面的css，比如index.html -> index.css、about.html -> about.css，称为“页面css”。

> 这里有个问题需要细致思考一下：模块的属性。理论上讲，一个模块应该是公有或者私有的，假设一个模块它基本只可能在某个页面用，或者我们不打算在其他页面用到它，我们可以说这个模块是这个页面的私有模块，比如文章页里的文章列表模块（m-article_list），以及组成这个模块的列表单元元件（u-article_item），我们基本可以确定这两者不会在其他页面被复用到了，那么它们其实是已经默认私有的属性，没必要放在common里，直接放在article.css就可以了。这样也可以人为地减少common的体积。那么问题来了，如果模块既可以存放在common，又可以存放在页面css，那么我们后续在common中添加公共模块的时候，如何避免模块名已经在页面css中被占用的情况？（即上文对common的设计提问的第4点）

### 初步解决方案
针对**后续添加公共模块可能与其他页面的私有模块命名冲突**的问题进行探讨，得出两种解决方案：

1. 默认由common管理所有模块，所有模块默认为公共模块，不允许私有模块；
2. 为公共模块单独使用一种前缀cm-来做区分，所有m-前缀的模块都是私有模块。

第一种方案会使得common体积非常大，而且会一直增大，不可取；第二种方案显式地声明模块属性，以此来避免冲突，可取。代码变成：
```css
/* common.css */

body {
  background: #fff;
  color: #333;
  font-size: 16px;
}

.cm-nav { ... }

.cm-news { ... }

.cm-copy_right { ... }
```
私有模块的代码：
```css
/* index.css */

.g-index {
  background: #fff;
  color: #333;
  font-size: 16px;
}

.m-nav { ... }

.m-news { ... }

.m-copy_right { ... }
```

这样子处理之后，公共模块和私有模块之间的命名冲突就解决了，而且也不会出现“一个还什么都没有页面引用了common之后，许多的类名就被占用了”的情况，因为common绝大部分内容都是cm模块，而页面自己的css里只能拥有私有的m模块。

### 新问题
假设我们已经写完了index页面，接着写about页面，这时候我们发现，原本在index中的一个模块m-news，我们将它归为私有模块，而现在在about中居然也需要用到这一个模块，于是乎，我们重新回到index页面，把m-news模块从index.css转移到了common.css当中，并改名为cm-news，然后回到index页面，把与m-news相关的内容（html、js）都修改成cm-news。这还是在我们能够意识到的情况下做的，如果页面多了起来，我们根本没有印象哪个页面是不是也有这样一个模块，要不要把它提升为公共模块。一个月之后，这个项目一个星期前已经搞定了，现在需要进行后续的开发，加多一个contact页面，然后我们又发现，这页面里用到了一个原本我们在about页面里把它划为私有模块的m-loc，于是乎，我们又走了一遍提升公共模块的流程

为什么会出现这样的问题？根本原因在于，我们无法事先规划好所有的模块，无法在一开始就对一个模块的属性清晰地划分。这个问题也基本算是无解。矛盾在于，我们对模块进行了私有和公有的属性划分，却无法事先掌握所有的模块属性，只能走一步算一步，错了就回来再改改。

解决这问题的办法是，取消对模块的属性划分，所有模块都默认为公共模块，可以随时取用。但是这样就倒退回了我们之前的那种情况，所有的模块都是m-*，且都扎堆在common里，导致common的体积过大，所以这个问题只能到这里为止了。

### 模块的设计原则
**如何界定一个模块？或者说，怎么样才能把一部分代码划分为一个模块？划分的依据是什么？**

css模块应该遵循以下几点要求：

1 . **只对外暴露一个类名**
```css
/**
 * 正确示范，所有模块相关的代码都挂在模块的选择器名下
 */
.m-nav { ... }
.m-nav .list { ... }
.m-nav .list .item { ... }

/**
 * 错误示范，暴露了.m-nav和.list两个类名，污染了空间
 */
.m-nav { ... }
.list { ... }
.list .item { ... }
```

2 . 不影响周围布局：一般情况下，尽量不要使用一个脱离文档流的布局（既使用了float:left/right，position:absolute/fixed的布局），尽量不要使用外边距（margin），为了使得模块更加稳定、具备更高的可塑性；
```css
/**
 * 正确示范，在common中定义一个模块，在页面css中对模块进行定位和偏移
 */

/* common */
.u-logo {
  width: 100px;
  height: 100px;
}

.cm-news {
  width: 200px;
  height: 100px;
}

/* index */
.u-logo {
  position: absolute;
  left: 20px;
  top: 20px;
}

.cm-news {
  margin-top: 50px;
}
```

```css
/**
 * 错误示范，在common中定义一个模块并固定它的位置
 */

/* common */
.u-logo {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 20px;
  top: 20px;
}

.cm-news {
  width: 200px;
  height: 100px;
  margin-top: 50px;
}
```

3 . 模块尽量设计为方便复用的量级，避免大而全，求精巧；
```css
/**
 * 正确示范
 */
<!-- index.html -->

<!DOCTYPE html>
<html>
<head>
  <title>index</title>
</head>
<body>
  <div class="g-index">
    <div class="g-bd">
      <!-- 正确的示范 -->
      <!-- 创建一个大的内容块article_box，而不是一个大模块 -->
      <div class="article_box">
        <div class="hd">
          最新文章
        </div>
        <div class="bd">
          <div class="list">
            <!-- 这里我们把每一个项作为可复用的私有模块 -->
            <div class="m-list_item">
              <img class="cover" />
              <div class="info">
                <div class="title">
                  <a href="#">文章标题</a>
                </div>
                <div class="desc">文章简介</div>
              </div>
            </div>
          </div>
        </div>
        <div class="ft">
          <!-- 这里我们直接引入了一个公共分页模块 -->
          <div class="cm-page">
            <a href="#" class="pg">1</a>
            <a href="#" class="pg">2</a>
            <a href="#" class="pg">3</a>
            <a href="#" class="pg">4</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
```
```css
/**
 * 错误示范
 */
<!-- index.html -->

<!DOCTYPE html>
<html>
<head>
  <title>index</title>
</head>
<body>
  <div class="g-index">
    <div class="g-bd">
      <!-- 错误的示范 -->
      <!-- 创建一个庞大且不可复用的私有模块m-article_box -->
      <div class="m-article_box">
        <div class="hd">
          最新文章
        </div>
        <div class="bd">
          <div class="list">
            <div class="item">
              <img class="cover" />
              <div class="info">
                <div class="title">
                  <a href="#">文章标题</a>
                </div>
                <div class="desc">文章简介</div>
              </div>
            </div>
          </div>
        </div>
        <div class="ft">
          <div class="page">
            <a href="#" class="pg">1</a>
            <a href="#" class="pg">2</a>
            <a href="#" class="pg">3</a>
            <a href="#" class="pg">4</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
```

### 模块继承
css的继承也是很简单的，一般来说是有这么几种方式：

1 . 在css中并写两个类，如.cm-nav, .m-nav，我们知道，这相当于让两个（组）类共享一套样式，然后我们再单独对.m-nav进行补充，实现继承和定制；  
2 . 在class属性里并写两个类，如<img class="u-logo logo">，这样我们只需要在页面css中单独对.logo类进行补充，就可以实现定制；  
3 . 在页面css中直接对类进行引用
，然后补充样式，实现定制，如.cm-nav { margin-bottom: 20px; }；  

第一种在我们这套模式里是不可取的，因为我们的公共模块都是放在common里，不可能每继承一次就上去补一个类；
第二种可取，但是需要多一个近似的类名，不提倡；
第三种又简单又靠谱。

```css
/* common.css */

body {
  background: #fff;
  color: #333;
  font-size: 16px;
}

.cm-nav {
  width: 100%;
  height: 50px;
  color: #fff;
  background: #333;
}
```
我们在页面css可以这样用：
```css
/* index.css */

.g-index {
  background: #fff;
  color: #333;
  font-size: 16px;
}

.cm-nav {
  width: 1000px;  /* 样式覆盖 */
  margin: auto;  /* 样式增加 */
}
```

### 状态
我们在上面讲前缀的时候，提到过一个前缀z-，我们说它可以用来表示状态。一个模块是可以有 状态 的，当然，这里说的不是状态好状态差的意思（模块还成精了～），这里指的是有多种表现形式，我们举例来说，一个弹窗模块m-dialog，它应该至少具备两种状态：显示和隐藏（关闭）。我们用关键字 active 来表示这两种状态，添加z-active类表示显示，不加表示隐藏。如下：
```css
/* index.css */

.m-dialog {
    display: none;
}

.m-dialog.z-active {
    display: block;
}
```
```html
<!-- index.html -->

<!DOCTYPE html>
<html>
<head>
  <title>index</title>
</head>
<body>
  <div class="g-index">
    <div class="g-bd">
      <div class="m-dialog">
        这是一个未激活的弹窗，你看不到！
      </div>
      <div class="m-dialog z-active">
        这是一个已激活的弹窗，你看得到！
      </div>
    </div>
  </div>
</body>
</html>
```
弹窗一个比较有代表性的例子，另一个典型的例子是按钮，用过bootstrap的人都知道，按钮btn只需要相对应添加几个状态类，就可以有不同的配色方案，应付不同的场景需要，这其实就是我们的z-的含义。z-是很常用的，我们应该把我们的模块设计得尽量满足多种可预见的需求，而不是每次都在页面去定制和覆盖基本样式。
