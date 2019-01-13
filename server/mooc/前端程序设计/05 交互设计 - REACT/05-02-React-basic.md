title: React 概览
theme: light

[slide]
# React 概览

[slide]
# 为什么学习 React 
近年来，单页面应用（SPA，single page application）变得越来越流行。像 Angular、Ember 以及 Backbone 这些框架，帮助 JavaScript 开发者构建了超越纯 JavaScript（vanilla JavaScript）和 jQuery 的现代 Web 应用。这个流行的解决方案清单并不够详尽，现在仍然有大量的 SPA 框架。如果你去关注他们的发布日期的话，大部分都属于第一代 SPA Angular 发布于2010年，Backbone 发布于2010年，以及 Ember，发布于2011年。

Facebook 在2013年首次发布了 React。React 并不是一个 SPA 框架，而是一个视图库。也就是 MVC（Model View Controller，模型-视图-控制器）里的 V。它的功能仅仅是把组件渲染成浏览器中的可见元素。但是，围绕 React 周边的整个生态系统让构建单页面应用成为可能。

那么为什么你应该选 React 而不是其他第一代 SPA 框架呢？其他的第一代框架尝试一次性解决很多问题，而 React 仅仅帮助你构建视图层。它更多的是一个库而非框架。其背后的思路是：应用的视图应该是一系列层次分明的可组合的组件。

通过使用 React，你可以在引入更多应用部件之前重点关注视图层。其他的每一个部件都是 SPA 的一部分。这所有的部分是构成一个成熟应用的基础。这样做有两个优点。

- 首先，你可以按部就班地学习 SPA 的每一部分，不用担心要一次性理解全部，而其他的框架会在开始就需要你了解所有的内容。
- 其次，SPA 的各部分都是可替换的，这样就使得 React 的周边生态圈充满新的创意。各种各样的解决方案相互之间竞争，你可以挑选最吸引你或者最适合你的使用场景的那一个。


[slide]
# 安装配置react应用
将使用 `create-react-app` 来创建应用。在得到广泛支持的情况下，Facebook在2016年创建了这样一个零配置的 React 初始化套件。96%的人向初学者推荐了它。使用 `create-react-app`，各种工具和配置都会在后台集成，而开发人员只需要专注于实现就好。
```bash
//安装配置react库
npm install react react-dom
# 安装create-react-app工具
npm install -g create-react-app
# 新建 newProj 工程
create-react-app newProj
```

项目的文件结构如下：
```bash
newProj/
├── README.md
├── node_modules
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js
```

- README.md: 后缀名为 .md 表示这是一个 markdown 文件。 很多源代码项目包含一个 README.md 文件，其中包含了这个项目的一些基本的指令和介绍。当你把项目发布到一些平台后，比如 GitHub，当在这个平台访问该项目的时候就会直接看到 README.md 里的内容。
- node_modules: 这个文件夹包含了所有通过 npm 安装的 node 包。
- package.json: 这个文件包含了 node 包依赖列表和一些其他的项目配置。
- .gitignore: 这个文件包含了所有不应该添加到 git 仓库中的文件和文件夹。
- public: 这个文件夹包含了所有你的项目构建出的产品文件。最终所有你写在 src 文件夹里面的代码都会在项目构建的时候被打包放在 public 文件夹下。
- manifest.json 和 registerServiceWorker.js: 在这个阶段不用担心这些文件用来干什么，不会在这个项目中用到。

```bash
# 在 http://localhost:3000 启动应用
npm start

# 运行所有测试
npm test

# 构建项目的产品文件
npm run build
```

[slide]
# React 核心思想
React 的核心思想是：封装组件。各个组件维护自己的状态和 UI，当状态变更，自动重新渲染整个组件。基于这种方式的一个直观感受就是我们不再需要不厌其烦地来回查找某个 DOM 元素，然后操作 DOM 去更改 UI。

React 大体包含下面这些概念：

- 组件
- JSX
- Virtual DOM
- Data Flow

```jsx
import React, { Component } from 'react';

// 以 class 初始化
class App extends Component {
  render() {
    return <h1>Hello world</h1>
    // return React.createElement('h1',null,'Hello world')
  }
}

// 以普通函数初始化
const App = () => <h1>Hello world</h1>
export default App;
```

> class 声明的对象具有state， 而普通对象没有state

[slide]
# 组件 
React 应用都是构建在组件之上。下面范例的 `HelloMsg` 就是一个React构建的组件，最后一句 `render` 会把这个组件显示到页面上的某个元素 `mountNode` 里面，显示的内容就是 `<div>Hello John</div>`。

`props` 是组件的两个核心概念之一，另一个是 `state`。可以把 `props` 看作是组件的配置属性，在组件内部是不变的，只是在调用这个组件的时候传入不同的属性来定制显示这个组件。

```js
import React, { Component } from 'react';
import { render } from 'react-dom';

class HelloMsg extends Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}
// 加载组件到 DOM 元素 mountNode
render(<HelloMsg name="John" />, mountNode);
```

[slide]
# JSX
从上面的代码可以看到将 HTML 直接嵌入了 JS 代码里面，这个就是 React 提出的一种叫 `JSX` 的语法，这应该是最开始接触 React 最不能接受的设定之一，因为前端被 `表现和逻辑层分离` 这种思想“洗脑”太久了。但实际上组件的 HTML 是组成一个组件不可分割的一部分，能够将 HTML 封装起来才是组件的完全体，React 发明了 `JSX` 让 JS 支持嵌入 HTML 不得不说是一种非常聪明的做法，让前端实现真正意义上的组件化成为了可能。

> 要使用包含 JSX 的组件，是需要 `编译输出` JS 代码才能使用的，之后就会讲到开发环境。

[slide]
# Virtual DOM
当组件状态 `state` 有更改的时候，React 会自动调用组件的 `render` 方法重新渲染整个组件的 UI。

当然如果真的这样大面积的操作 DOM，性能会是一个很大的问题，所以 React 实现了一个 `_Virtual DOM_`，组件 DOM 结构就是映射到这个 `Virtual DOM` 上，React 在这个 `Virtual DOM` 上实现了一个 `diff` 算法，当要重新渲染组件的时候，会通过 `diff` 寻找到要变更的 DOM 节点，再把这个修改更新到浏览器实际的 DOM 节点上，所以实际上不是真的渲染整个 DOM 树。这个 `Virtual DOM` 是一个纯粹的 JS 数据结构，所以性能会比原生 DOM 快很多。


[slide]
# Data Flow
 `单向数据绑定` 是 React 推崇的一种应用架构的方式。当应用足够复杂时才能体会到它的好处，虽然在一般应用场景下你可能不会意识到它的存在，也不会影响你开始使用React，你只要先知道有这么个概念。




