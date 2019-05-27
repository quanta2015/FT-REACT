title: HighCharts 详解
theme: light

[slide] 
# 背景
随着 JavaScript 单页应用开发日趋复杂，**JavaScript 需要管理应用的状态**。 这些 `state` 可能包括服务器响应、缓存数据、本地生成尚未持久化到服务器的数据，也包括 UI 状态，如激活的路由，被选中的标签，是否显示加载动效或者分页器等等。


[slide] 
# state && model
管理不断变化的 `state` 非常困难，如果一个 `model` 的变化会引起另一个 `model` 变化，那么当 view 变化时，就可能引起对应 `model` 以及另一个 `model` 的变化，依次地，可能会引起另一个 `view` 的变化。直至你搞不清楚到底发生了什么。**`state` 在什么时候，由于什么原因，如何变化已然不受控制。** 当系统变得错综复杂的时候，想重现问题或者添加新功能就会变得举步维艰。


[slide] 
# 新需求
- 来自前端开发领域的新需求: 如更新调优、服务端渲染、路由跳转前请求数据等等
- 变化和异步: 如果把二者分开，能做的很好，但混到一起，就变得一团糟。React在视图层禁止异步和直接操作 DOM 来解决这个问题
- `Redux` 让 `state` 的变化变得可预测


[slide] 
# 核心概念
`todo` 应用 `state` 对象，类似就像 “Model”，区别是它并没有 setter（修改器方法）。因此其它的代码不能随意修改它，造成难以复现的 bug。

```js
{
  todos: [{
    text: 'Eat food',
    completed: true
  }, {
    text: 'Exercise',
    completed: false
  }],
  visibilityFilter: 'SHOW_COMPLETED'
}
```


[slide] 
要想更新 `state` 中的数据，你需要发起一个 `action`。`Action` 是一个普通 JavaScript 对象，用来描述发生了什么。下面是一些 `action` 的示例：

```js
{ type: 'ADD_TODO', text: 'Go to swimming pool' }
{ type: 'TOGGLE_TODO', index: 1 }
{ type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL' }
```


[slide] 
强制使用 `action` 来描述所有变化的好处是可以清晰地知道应用中到底发生了什么。`reducer`就是通过 `action` 修改 `state` 的函数，输入 `state` 和 `action`，并返回新 `state` 的函数。

```js
function visibilityFilter(state = 'SHOW_ALL', action) {
  if (action.type === 'SET_VISIBILITY_FILTER') {
    return action.filter
  } else {
    return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([{ text: action.text, completed: false }])
    case 'TOGGLE_TODO':
      return state.map((todo, index) =>
        action.index === index
          ? { text: todo.text, completed: !todo.completed }
          : todo
      )
    default:
      return state
  }
}
```


[slide] 
开发一个 `reducer` 调用这两个 `reducer`，进而来管理整个应用的 `state`

```js
function todoApp(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  }
}
```


[slide] 
# 三大原则
Redux 可以用这三个基本原则来描述：

- 单一数据源
- State 是只读的
- 使用纯函数来执行修改


[slide] 
# 单一数据源

**整个应用的 `state` 被储存在一棵 `object tree` 中，并且这个 `object tree` 只存在于唯一一个 `store` 中。**

这让同构应用开发变得非常容易。来自服务端的 `state` 可以在无需编写更多代码的情况下被序列化并注入到客户端中。由于是单一的 `state tree` ，调试也变得非常容易。在开发中，你可以把应用的 `state` 保存在本地，从而加快开发速度。此外，受益于单一的 `state tree` ，以前难以实现的如“撤销/重做”这类功能也变得轻而易举。


[slide] 
# State 是只读的

**唯一改变 `state` 的方法就是触发 `action` ，`action` 是一个用于描述已发生事件的普通对象。**

视图和网络请求都不能直接修改 `state`，只能表达想要修改的意图。因为所有的修改都被集中化处理，且严格按照一个接一个的顺序执行，因此不用担心竞态条件（race condition）的出现。 `Action` 就是普通对象而已，因此它们可以被日志打印、序列化、储存、后期调试或测试时回放出来。

```
store.dispatch({
  type: 'COMPLETE_TODO',
  index: 1
})

store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
})
```


[slide] 
# 使用纯函数来执行修改

**为了描述 `action` 如何改变 `state tree` ，你需要编写 `reducers` **

`Reducer` 只是一些纯函数，它接收先前的 `state` 和 `action`，并返回新的 `state`。刚开始你可以只有一个 `reducer`，随着应用变大，你可以把它拆成多个小的 `reducers`，分别独立地操作 `state tree` 的不同部分，因为 `reducer` 只是函数，你可以控制它们被调用的顺序，传入附加数据，甚至编写可复用的 `reducer` 来处理一些通用任务，如分页器。

```js
function visibilityFilter(state = 'SHOW_ALL', action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case 'COMPLETE_TODO':
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: true
          })
        }
        return todo
      })
    default:
      return state
  }
}

import { combineReducers, createStore } from 'redux'
let reducer = combineReducers({ visibilityFilter, todos })
let store = createStore(reducer)
```


[slide] 
# Action
**Action** 把数据从应用传到 `store` ，是 `store` 数据的**唯一**来源。一般都是通过 `store.dispatch()` 将 `action` 传到 `store`。

```js
const ADD_TODO = 'ADD_TODO'

{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}
```


[slide] 
`Action` 本质上是 JavaScript 普通对象，`action` 内必须使用一个字符串类型的 `type` 字段来表示将要执行的动作。多数情况下，`type` 会被定义成字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放 `action`。

```js
import { ADD_TODO, REMOVE_TODO } from '../actionTypes'
```


[slide] 
# 样板文件使用提醒

使用单独的模块或文件来定义 `action type`，常量并不是必须的，甚至根本不需要定义。对于小应用来说，使用字符串做 `action type` 更方便些。不过，在大型应用中把它们显式地定义成常量还是利大于弊的。

```javascript
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const LOAD_ARTICLE = 'LOAD_ARTICLE'
```


[slide]
# Action 创建函数

**Action 创建函数** 就是生成 `action` 的方法。`action` 和 `action 创建函数`这两个概念很容易混在一起，使用时最好注意区分。

在 Redux 中的 `action创建函数`只是简单的返回一个 `action`:

```js
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}
```


[slide]
Redux 中只需把 `action` 创建函数的结果传给 `dispatch()` 方法即可发起一次 `dispatch` 过程。

```js
dispatch(addTodo(text))
dispatch(completeTodo(index))

// 或者创建一个 **被绑定的 `action` 创建函数** 来自动 `dispatch` 
const boundAddTodo = text => dispatch(addTodo(text))
const boundCompleteTodo = index => dispatch(completeTodo(index))

// 然后直接调用它们
boundAddTodo(text);
boundCompleteTodo(index);
```

`store` 里能直接通过 `store.dispatch()` 调用 `dispatch()` 方法，但是多数情况下你会使用 `react-redux`  提供的 `connect()` 帮助器来调用。`Action` 创建函数也可以是异步非纯函数。


[slide]
# 源码 `actions.js`

```js
export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export function addTodo(text) {
  return { type: ADD_TODO, text }
}

export function toggleTodo(index) {
  return { type: TOGGLE_TODO, index }
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}
```


[slide]
# Reducer

**Reducers** 指定了应用状态的变化如何响应 `actions` 并发送到 `store` 的，记住 `actions` 只是描述了*有事情发生了*这一事实，并没有描述应用如何更新 `state`。


[slide]
# 设计 State 结构

在 `Redux` 应用中，所有的 `state` 都被保存在一个单一对象中。建议在写代码前先想一下这个对象的结构。如何才能以最简的形式把应用的 `state` 用对象描述出来？

以 `todo` 应用为例，需要保存两种不同的数据：

- 当前选中的任务过滤条件；
- 完整的任务列表。


[slide]
通常，这个 `state` 树还需要存放其它一些数据，以及一些 UI 相关的 `state`。这样做没问题，但尽量把这些数据与 UI 相关的 `state` 分开。

```js
{
  visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Consider using Redux',
      completed: true,
    },
    {
      text: 'Keep all state in a single tree',
      completed: false
    }
  ]
}
```


[slide]
# Action 处理
reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。

```
function(previousState, action) {
  return newState
} 
```

[slide]
保持 `reducer` 纯净非常重要。**永远不要**在 `reducer` 里做这些操作：

- 修改传入参数；
- 执行有副作用的操作，如 API 请求和路由跳转；
- 调用非纯函数，如 `Date.now()` 或 `Math.random()`。


[slide]

我们将以指定 `state` 的初始状态作为开始。`Redux` 首次执行时，`state` 为 `undefined`，此时我们可借机设置并返回应用的初始 `state`。

```js
import { VisibilityFilters } from './actions'

const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: []
}

function todoApp(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
  return state
}
```


[slide]
```js
// ES6 参数默认值语法
function todoApp(state = initialState, action) {
  return state
}
```


[slide]
现在可以处理 `SET_VISIBILITY_FILTER`。需要做的只是改变 state 中的 `visibilityFilter`。

```js
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    default:
      return state
  }
}
```


[slide]
# 注意

1. **不要修改 `state`。** 使用 `Object.assign()`新建了一个副本。不能这样使用 `Object.assign(state, { visibilityFilter: action.filter })`，因为它会改变第一个参数的值。你**必须**把第一个参数设置为空对象。

2. **在 `default` 情况下返回旧的 `state`。**遇到未知的 action 时，一定要返回旧的 `state`。


[slide]
## 处理多个 action

还有两个 action 需要处理。就像处理 `SET_VISIBILITY_FILTER` 一样，引入 `ADD_TODO` 和 `TOGGLE_TODO` 两个 actions 并且扩展 reducer 处理 `ADD_TODO`.

```js
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters
} from './actions'

...

function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      })
    default:
      return state
  }
}
```


[slide]
不直接修改 `state` 中的字段，而是返回新对象。新的 `todos` 对象就相当于旧的 `todos` 在末尾加上新建的 `todo`。而这个新的 `todo` 又是基于 `action` 中的数据创建的。最后，`TOGGLE_TODO` 的实现也很好理解：

```js
case TOGGLE_TODO:
  return Object.assign({}, state, {
    todos: state.todos.map((todo, index) => {
      if (index === action.index) {
        return Object.assign({}, todo, {
          completed: !todo.completed
        })
      }
      return todo
    })
  })
```


[slide]
# 拆分 Reducer
目前的代码看起来有些冗长

```js
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      })
    case TOGGLE_TODO:
      return Object.assign({}, state, {
        todos: state.todos.map((todo, index) => {
          if (index === action.index) {
            return Object.assign({}, todo, {
              completed: !todo.completed
            })
          }
          return todo
        })
      })
    default:
      return state
  }
}
```



[slide]
把 `todos` 更新的业务逻辑拆分为函数

```js
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })
    default:
      return state
  }
}

function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: todos(state.todos, action)
      })
    case TOGGLE_TODO:
      return Object.assign({}, state, {
        todos: todos(state.todos, action)
      })
    default:
      return state
  }
}
```

 `todoApp` 只把需要更新的一部分 `state` 传给 `todos` 函数，`todos` 函数自己确定如何更新这部分数据。


[slide]

现在我们可以开发一个函数来做为主 `reducer`，它调用多个子 `reducer` 分别处理 `state` 中的一部分数据，然后再把这些数据合成一个大的单一对象。主 `reducer` 并不需要设置初始化时完整的 `state`。初始时，如果传入 `undefined`, 子 `reducer` 将负责返回它们的默认值。

```js
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })
    default:
      return state
  }
}

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todoApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}
```

**注意每个 `reducer` 只负责管理全局 `state` 中它负责的一部分。每个 reducer 的 `state` 参数都不同，分别对应它管理的那部分 `state` 数据。**


[slide]
# combineReducers 工具类
Redux 提供了 `combineReducers()` 工具类来重构 `todoApp`：

```js
import { combineReducers } from 'redux'

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp
```


[slide]
`combineReducers()` 所做的只是生成一个函数，这个函数来调用你的一系列 `reducer`，每个 `reducer` **根据它们的 `key` 来筛选出 `state` 中的一部分数据并处理**，然后这个生成的函数再将所有 `reducer` 的结果合并成一个大的对象。



[slide]
# Store
**Store** 是联系action和reducers的对象，`Store` 有以下职责：

- 维持应用的 state；
- 提供 `getState()` 方法获取 `state；`
- 提供 `dispatch(action)`  方法更新 `state；`
- 通过 `subscribe(listener)` 注册监听器;
- 通过 `subscribe(listener)` 返回的函数注销监听器。


[slide]
# 创建 Store
将 `reducer` 导入，并传递 `createStore()`

```js
import { createStore } from 'redux'
import todoApp from './reducers'
let store = createStore(todoApp)
```

[slide]
# 测试数据处理逻辑
```js
import {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters
} from './actions'

// 打印初始状态
console.log(store.getState())

// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
const unsubscribe = store.subscribe(() => console.log(store.getState()))

// 发起一系列 action
store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))
store.dispatch(addTodo('Learn about store'))
store.dispatch(toggleTodo(0))
store.dispatch(toggleTodo(1))
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

// 停止监听 state 更新
unsubscribe()
```




