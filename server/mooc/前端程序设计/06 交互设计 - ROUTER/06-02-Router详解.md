title: Router详解
theme: light

[slide]
# Router详解

[slide]
## Installation
使用npm安装 `react-router-dom`

```sh
npm install react-router-dom
```

[slide]
## 范例1: 基本路由
下面范例通过 3 个`<Router>`控制 3个 `Page` 对象。

> `<a href="/">` 的功能被 `<Link to="/">` 代替了。

```jsx
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Index = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

const AppRouter = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about/">About</Link></li>
          <li><Link to="/users/">Users</Link></li>
        </ul>
      </nav>
      <Route path="/" exact component={Index} />
      <Route path="/about/" component={About} />
      <Route path="/users/" component={Users} />
    </div>
  </Router>
);
export default AppRouter;
```


[slide]
## 范例2: 嵌套路由
路由 `/topics` 加载 `Topics` 对象, 而`Topics` 对象根据  `<Route>`传过来的 `:id` 渲染数据内容.

```jsx
import React from "react";
import { BrowserRouter , Route, Link } from "react-router-dom";
const App = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/topics" component={Topics} />
    </div>
  </BrowserRouter>
);
const Home = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;
const Topic = ({ match }) => <h3>Requested Param: {match.params.id}</h3>;
const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li><Link to={`${match.url}/components`}>Components</Link></li>
      <li><Link to={`${match.url}/props-v-state`}>Props v. State</Link></li>
    </ul>
    <Route path={`${match.path}/:id`} component={Topic} />
    <Route exact path={match.path} render={() => <h3>Please select a topic.</h3>}/>
  </div>
);
const Header = () => (
  <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/about">About</Link></li>
    <li><Link to="/topics">Topics</Link></li>
  </ul>
);
export default App;
```


[slide]
# 基本对象

React Router中有3种对象: `router components`, `route matching components`, 和 `navigation components`. 可以通过 `react-router-dom` 来引用。

```js
import { BrowserRouter, Route, Link } from "react-router-dom";
```


[slide]
# 路由
每个路由应用都必须通过 `router` 对象来实现, 而对于web应用来说，`react-router-dom` 提供了 `<BrowserRouter>` 和 `<HashRouter>` 路由对象。它们都具有 `history` 对象，其区别在于 `<BrowserRouter>` 能够相应客户的动态请求requests; 而 `<HashRouter>` 提供的是静态文件服务器。

```jsx
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```


[slide]
# BrowserRouter

`<BrowserRouter>` 使用 HTML5 提供的 history API (`pushState`, `replaceState` 和 `popstate` 事件) 来保持 UI 和 URL 的同步。

```jsx
import { BrowserRouter } from 'react-router-dom';

<BrowserRouter
  basename={string}
  forceRefresh={bool}
  getUserConfirmation={func}
  keyLength={number}
>
  <App />
</BrowserRouter>
```

[slide]

**basename: string** 所有位置的基准 URL。如果你的应用程序部署在服务器的子目录，则需要将其设置为子目录。basename 的正确格式是前面有一个前导斜杠，但不能有尾部斜杠。

```jsx
<BrowserRouter basename="/calendar">
  <Link to="/today" />
</BrowserRouter>
```

上例中的 `<Link>` 最终将被呈现为： `<a href="/calendar/today" />`


[slide]
**forceRefresh: bool** 如果为 true ，在导航的过程中整个页面将会刷新。一般情况下，只有在不支持 HTML5 history API 的浏览器中使用此功能。

```jsx
const supportsHistory = 'pushState' in window.history;

<BrowserRouter forceRefresh={!supportsHistory} />
```

[slide]
**getUserConfirmation: func** 用于确认导航的函数，默认使用 `window.confirm`。例如，当从 `/a` 导航至 `/b` 时，会使用默认的 `confirm` 函数弹出一个提示，用户点击确定后才进行导航，否则不做任何处理。注：需要配合 `<Prompt>` 一起使用。

```jsx
// 这是默认的确认函数
const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message);
  callback(allowTransition);
}
<BrowserRouter getUserConfirmation={getConfirmation} />
```

[slide]
**keyLength: number** `location.key` 的长度，默认为 6。

```jsx
<BrowserRouter keyLength={12} />
```


[slide]
# HashRouter
`<HashRouter>` 使用 `URL` 的 `hash` 部分（即 `window.location.hash`）来保持 UI 和 URL 的同步。

```jsx
import { HashRouter } from 'react-router-dom';
<HashRouter>
  <App />
</HashRouter>
```


[slide]
**basename: string**: 所有位置的基准 URL。basename 的正确格式是前面有一个前导斜杠，但不能有尾部斜杠。
```jsx
<HashRouter basename="/calendar">
  <Link to="/today" />
</HashRouter>
```
上例中的 <Link> 最终将被呈现为：`<a href="#/calendar/today" />`


[slide]
**getUserConfirmation: func**: 用于确认导航的函数，默认使用 `window.confirm`。

```jsx
// 这是默认的确认函数
const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message);
  callback(allowTransition);
}
<HashRouter getUserConfirmation={getConfirmation} />
```


[slide]
**hashType: string**: `window.location.hash` 使用的 `hash` 类型，默认`slash`, 有如下几种：

- slash:  后面跟一个斜杠，例如 `#/` 和 `#/sunshine/lollipops`
- noslash:  后面没有斜杠，例如 `#` 和 `#sunshine/lollipops`
- hashbang:  Google 风格的 ajax crawlable，例如 `#!/` 和 `#!/sunshine/lollipops`


[slide]
## 路由匹配
路由匹配对象有两种: `<Route>` 和 `<Switch>`.

```js
import { Route, Switch } from "react-router-dom";
```
通过匹配路由的路径属性`path`，是否和当前的地址`pathname`相同，如果匹配则渲染它的内容，否则渲染 `null`。


[slide]
```jsx
// when location = { pathname: '/about' }
<Route path='/about' component={About}/> // renders <About/>
<Route path='/contact' component={Contact}/> // renders null
<Route component={Always}/> // renders <Always/>
```


[slide]
我们可以使用 `<Route>` 来实现根据路径渲染内容，通常都是多个`<Route>`排列在一起，这个时候可以用 `<Switch>` 对象把它们组合到一起。

```jsx
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/contact" component={Contact} />
</Switch>
```


[slide]
对于一组 `<Route>` 来说，不是必须添加 `<Switch>` 对象，但是 `<Switch>` 的功能是`仅仅只会渲染匹配到的第一个路径`。 因此如果有多个路由路径都匹配的同样的路径名称，或者没有匹配到任何目前的路径("404")，就可以通过`<Switch>`处理。

```jsx
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/contact" component={Contact} />
  <Route component={NoMatch} />
</Switch>
```


[slide] 
# Route
`<Route>` 的基本功能是在其 `path` 属性与某个 `location` 匹配时呈现一些 UI。
```html
import { BrowserRouter as Router, Route } from 'react-router-dom';
<Router>
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/news" component={News} />
  </div>
</Router>

<!-- 如果应用程序的位置是 / -->
<div>
  <Home />
  <!-- react-empty: 2 -->
</div>

<!-- 如果应用程序的位置是 /news -->
<div>
  <!-- react-empty: 1 -->
  <News />
</div>
```


[slide] 
# 路由渲染方法
使用 <Route> 渲染一些内容有以下三种方式：

- `<Route component>`
- `<Route render>`
- `<Route children>`

三种渲染方式都将提供相同的三个路由属性

- match
- location
- history

[slide] 
# component

当你使用 `component` 时，`Router` 将根据指定的组件，使用 `React.createElement` 创建一个新的 `React` 元素。这意味着，如果你向 `component` 提供一个内联函数，那么每次渲染都会创建一个新组件。这将导致现有组件的卸载和新组件的安装，而不是仅仅更新现有组件。当使用内联函数进行内联渲染时，请使用 `render` 或 `children`。

```jsx
const User = ({ match }) => {
  return <h1>Hello {match.params.username}!</h1>
}
<Route path="/user/:username" component={User} />
```


[slide] 
# render: func
使用 `render` 可以方便地进行内联渲染和包装，而无需进行上文解释的不必要的组件重装。

你可以传入一个函数，以在位置匹配时调用，而不是使用 `component` 创建一个新的 `React` 元素。`render` 渲染方式接收所有与 `component` 方式相同的 `route props`。
```html
// 方便的内联渲染
<Route path="/home" render={() => <div>Home</div>} />
```


[slide] 
# children: func
有时候不论 `path` 是否匹配位置，你都想渲染一些内容。在这种情况下，你可以使用 `children` 属性。除了不论是否匹配它都会被调用以外，它的工作原理与 `render` 完全一样。

`children` 渲染方式接收所有与 `component` 和 `render` 方式相同的 `route props`，除非路由与 URL 不匹配，不匹配时 `match` 为 `null`。这允许你可以根据路由是否匹配动态地调整用户界面。如下所示，如果路由匹配，我们将添加一个激活类：

```html
const ListItemLink = ({ to, ...rest }) => (
  <Route path={to} children={({ match }) => (
    <li className={match ? 'active' : ''}>
      <Link to={to} {...rest} />
    </li>
  )} />
)
<ul>
  <ListItemLink to="/home"> home  </ListItemLink>
  <ListItemLink to="/about"> about  </ListItemLink>
</ul>
```



[slide] 
# path: string
`path: string`可以是 `path-to-regexp` 能够理解的任何有效的 URL 路径。
```html
<Route path="/users/:id" component={User} />
```

> 没有定义 path 的 <Route> 总是会被匹配。


[slide] 
# exact: bool
`exact: bool` 如果为 `true`，则只有在 `path` 完全匹配 `location.pathname` 时才匹配。

```bash
# path  location.pathname  exact  matches
# /one  /one/two           true   no
# /one  /one/two           false  yes

<Route exact path="/one" component={OneComponent} />
```


[slide] 
# strict: bool
`strict: bool` 如果为 `true`，则具有尾部斜杠的 `path` 仅与具有尾部斜杠的 `location.pathname` 匹配。当 `location.pathname` 中有附加的 URL 片段时，`strict` 就没有效果了。

```bash
# path   location.pathname  matches
# /one/  /one               no
# /one/  /one/              yes
# /one/  /one/two           yes

<Route strict path="/one/" component={OneComponent} />
```

[slide] 

> 警告：可以使用 `strict` 来强制规定 `location.pathname` 不能具有尾部斜杠，但是为了做到这一点，`strict` 和 `exact` 必须都是 true。

```bash
# path   location.pathname  matches
# /one   /one               yes
# /one   /one/              no
# /one   /one/two           no

<Route strict path="/one/" component={OneComponent} />
```


[slide] 
# location: object
`location: object` 一般情况下，`<Route>` 尝试将其 `path` 与当前历史位置（通常是当前的浏览器 URL）进行匹配。但是，也可以传递具有不同路径名的位置进行匹配。

当你需要将 `<Route>` 与当前历史位置以外的 `location` 进行匹配时，此功能非常有用。如过渡动画示例中所示。

如果一个 `<Route>` 被包含在一个 `<Switch>` 中，并且需要匹配的位置（或当前历史位置）传递给了 `<Switch>`，那么传递给 `<Route>` 的 `location` 将被 `<Switch>` 所使用的 `location` 覆盖。

[slide] 
# sensitive: bool
`sensitive: bool` 如果为 `true`，进行匹配时将区分大小写。

```html
# path   location.pathname  sensitive  matches
# /one   /one               true       yes
# /One   /one               true       no
# /One   /one/              false      yes

<Route sensitive path="/one" component={OneComponent} />
```


[slide] 
# Link
React路由提供了 `<Link>` 对象来创建连接，它类似HTML的`a`对象。它的 `to`、`query`、`hash` 属性会被组合在一起并渲染为 `href` 属性。虽然 `Link` 被渲染为超链接，但在内部实现上使用脚本拦截了浏览器的默认行为，然后调用了`history.pushState` 方法（注意，文中出现的 `history` 指的是通过 `history` 包里面的 `create History` 方法创建的对象，`window.history` 则指定浏览器原生的 `history` 对象，由于有些 API 相同，不要弄混）。`history` 包中底层的 `pushState` 方法支持传入两个参数 `state` 和 `path`，在函数体内有将这两个参数传输到 `createLocation` 方法中，返回 `location` 。系统将 `location` 对象作为参数传入到 `TransitionTo` 方法中，然后调用 `window.location.hash` 或者`window.history.pushState()` 修改了应用的 URL，这取决于你创建 `history` 对象的方式。同时会触发`history.listen` 中注册的事件监听器。

```html
import { Link } from 'react-router-dom';

<Link to="/">Home</Link>
// <a href='/'>Home</a>
```


[slide] 
# NavLink
`NavLink` 是 `Link` 的一个特定版本，会在匹配上当前的url的时候给已经渲染的元素添加参数，组件的属性有:

- activeClassName(string)：设置选中样式，默认值为active
- activeStyle(object)：当元素被选中时，为此元素添加样式
- exact(bool)：为true时，只有当导致和完全匹配class和style才会应用
- strict(bool)：为true时, 将考虑位置pathname后的斜线
- isActive(func)判断链接是否激活的额外逻辑的功能

```jsx
// location = { pathname: '/react' }
<NavLink to="/react" activeClassName="hurray">
  React
</NavLink>
// <a href='/react' className='hurray'>React</a>
```


[slide] 
# Redirect
如果要强制跳转的话，可以渲染 `<Redirect>`对象，并且使用 `to` 说明跳转连接。

```html
import { Route, Redirect } from 'react-router-dom';
<Route exact path="/" render={() => (
  loggedIn ? (
    <Redirect to="/dashboard" />
  ) : (
    <PublicHomePage />
  )
)} />
```


[slide] 
# 动态路由

```html
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  el
);

const App = () => (
  <div>
    <nav><Link to="/dashboard">Dashboard</Link></nav>
    <div><Route path="/dashboard" component={Dashboard}/></div>
  </div>
);
```


[slide] 
# 嵌套路由

```html
const App = () => (
  <BrowserRouter>
    <div>
      <Route path="/topic" component={Topic} />
    </div>
  </BrowserRouter>
);

const Topic = ({ match }) => (
  <div>
    <!-- 嵌套路由的 match.url 生成相对路径  -->
    <Route path={match.url + "/carnitas"} component={Carnitas} />
  </div>
);
```


[slide] 
# Redux集成

```js
// before
export default connect(mapStateToProps)(Something)

// after
import { withRouter } from 'react-router-dom'
export default withRouter(connect(mapStateToProps)(Something))
```
