
title: React JSX
theme: light

[slide]
# JSX JSX

[slide]
# 为什么要引入 JSX 这种语法
传统的 MVC 是将模板放在其他地方，比如 `<script>` 标签或者模板文件，再在 JS 中通过某种手段引用模板。按照这种思路，想想多少次我们面对四处分散的模板片段不知所措？纠结模板引擎，纠结模板存放位置，纠结如何引用模板.

简单来说，React 认为组件才是王道，而组件是和模板紧密关联的，组件模板和组件逻辑分离让问题复杂化了。显而易见的道理，关键是怎么做？

所以就有了 `JSX` 这种语法，就是为了把 HTML 模板直接嵌入到 JS 代码里面，这样就做到了模板和组件关联，但是 JS 不支持这种包含 HTML 的语法，所以需要通过工具将 `JSX` 编译输出成 JS 代码才能使用。

[slide]
# JSX 是可选的
因为 JSX 最终是输出成 JS 代码来表达的，所以我们可以直接用 React 提供的这些 DOM 构建方法来写模板，比如一个 JSX 写的一个链接：
```html
<a href="http://facebook.github.io/react/">Hello!</a>

//用 JS 代码来写就成这样了：
React.createElement('a', {href: 'http://facebook.github.io/react/'}, 'Hello!')
```

你可以通过 `React.createElement` 来构造组件的DOM树。第一个参数是标签名，第二个参数是属性对象，第三个参数是子元素。

```js
// 一个包含子元素的例子：
var child = React.createElement('li', null, 'Text Content');
var root = React.createElement('ul', { className: 'my-list' }, child);
React.render(root, document.body);
```

对于常见的 HTML 标签，React 已经内置了工厂方法：
```js
var root = React.DOM.ul({ className: 'my-list' }, React.DOM.li(null, 'Text Content'));
```
所以 `JSX` 和 JS 之间的转换也很简单直观，用 `JSX` 的好处就是它基本上就是 HTML，对于构造 DOM 来说我们更熟悉，更具可读性。

[slide]
# 使用 JSX
利用 `JSX` 编写 DOM 结构，可以用原生的 HTML 标签，也可以直接像普通标签一样引用 React 组件。这两者约定通过大小写来区分，`小写的字符串`是 HTML 标签，`大写开头的变量`是 React 组件。

使用 HTML 标签：
```js
import React from 'react';
import { render } from 'react-dom';

var myDivElement = <div className="foo" />;
render(myDivElement, document.getElementById('mountNode'));
```
> HTML 里的 `class` 在 `JSX` 里要写成 `className`，因为 `class` 在 JS 里是保留关键字。同理某些属性比如 `for` 要写成 `htmlFor`。

使用组件：
```js
import React from 'react';
import { render } from 'react-dom';
import MyComponent from './MyComponet';

var myElement = <MyComponent someProperty={true} />;
render(myElement, document.body);
```


[slide]
# 使用 JavaScript 表达式
属性值使用表达式，只要用 `{}` 替换 `""`:
```js
// Input (JSX):
var person = <Person name={window.isLoggedIn ? window.name : ''} />;
// Output (JS):
var person = React.createElement(
  Person,
  {name: window.isLoggedIn ? window.name : ''}
);
```

子组件也可以作为表达式使用：
```jsx
// Input (JSX):
var content = <Container>{window.isLoggedIn ? <Nav /> : <Login />}</Container>;
// Output (JS):
var content = React.createElement(
  Container,
  null,
  window.isLoggedIn ? React.createElement(Nav) : React.createElement(Login)
);
```

[slide]
# 注释
在 JSX 里使用注释也很简单，就是沿用 JavaScript，唯一要注意的是在一个组件的子元素位置使用注释要用` {} `包起来。
```
var content = (
  <Nav>
      {/* child comment, put {} around */}
      <Person
        /* multi
           line
           comment */
        name={window.isLoggedIn ? window.name : ''} // end of line comment
      />
  </Nav>
);
```

[slide]
# HTML 转义
React 会将所有要显示到 DOM 的字符串转义，防止 XSS。所以如果 JSX 中含有转义后的实体字符比如 &copy; (©) 最后显示到 DOM 中不会正确显示，因为 React 自动把 &copy; 中的特殊字符转义了。有几种解决办法：

- 直接使用 UTF-8 字符 ©
- 使用对应字符的 Unicode 编码，查询编码
- 使用数组组装 <div>{['cc ', <span>&copy;</span>, ' 2015']}</div>
- 直接插入原始的 HTML

```html
<div dangerouslySetInnerHTML={{__html: 'cc &copy; 2015'}} />
```

[slide]
# 自定义 HTML 属性
如果在 `JSX` 中使用的属性不存在于 HTML 的规范中，这个属性会被忽略。如果要使用自定义属性，可以用 `data-` 前缀。可访问性属性的前缀 `aria-` 也是支持的。


[slide]
# 属性扩散
有时候你需要给组件设置多个属性，你不想一个个写下这些属性，或者有时候你甚至不知道这些属性的名称，这时候 `spread attributes` 的功能就很有用了。

```js
var props = {};
props.foo = x;
props.bar = y;
var component = <Component {...props} />;
```
> `props` 对象的属性会被设置成 `Component` 的属性。

属性也可以被覆盖：
```js
var props = { foo: 'default' };
var component = <Component {...props} foo={'override'} />;
console.log(component.props.foo); // 'override'
```
> 写在后面的属性值会覆盖前面的属性。

[slide]
# JSX 与 HTML 的差异
除了前面提到的 class 要写成 className，比较典型的还有:

- style 属性接受由 CSS 属性构成的 JS 对象
- onChange 事件表现更接近我们的直觉（不需要 onBlur 去触发）
- 表单的表现差异很大
