title: ReactSaga 详解
theme: light

[slide] 
# 范例教程

clone 这个 [教程仓库](https://github.com/redux-saga/redux-saga-beginner-tutorial)。


[slide] 
然后在命令行输入：

```sh
$ cd redux-saga-beginner-tutorial
$ npm install
$ npm start
```


[slide] 
我们先从最简单的用例开始：2 个按钮 `增加（Increment）` 和 `减少（Decrement）` 计数。之后我们将介绍异步调用。

不出意外的话，你应该能看到 2 个按钮 `Increment` 和 `Decrement`，以及按钮下方 `Counter : 0` 的文字。

> 如果你在运行这个应用程序的时候遇到问题，可随时在这个[教程仓库](https://github.com/redux-saga/redux-saga-beginner-tutorial/issues)上创建 issue。

[slide] 
# Hello，Sagas！
创建一个 `sagas.js` 的文件，然后添加以下代码片段：

```javascript
export function* helloSaga() {
  console.log('Hello Sagas!');
}
```



[slide] 
为了运行我们的 Saga，我们需要：

- 创建一个 Saga middleware 和要运行的 Sagas（目前我们只有一个 `helloSaga`）
- 将这个 Saga middleware 连接至 Redux store.


[slide] 
修改 `main.js`

- 引入 `./sagas` 模块中的 Saga
- 使用 `redux-saga` 模块的 `createSagaMiddleware` 函数来创建 Saga middleware
- 使用 `applyMiddleware` 将 middleware 连接至 Store
- 使用 `sagaMiddleware.run(helloSaga)` 运行 Saga


[slide] 
```javascript
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { helloSaga } from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(helloSaga)
const action = type => store.dispatch({type})
```


[slide] 
# 发起异步调用
为了演示异步调用，添加另外一个按钮，用于在点击 1 秒后增加计数。首先，在 UI 组件上添加一个按钮和一个回调 `onIncrementAsync`。


[slide] 
```js
const Counter = ({ value, onIncrement, onDecrement, onIncrementAsync }) =>
  <div>
    <button onClick={onIncrementAsync}>
      Increment after 1 second
    </button>
    ......
  </div>
```


[slide] 
接下来我们需要将组件的 `onIncrementAsync` 与 Store action 连接起来。


```javascript
function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')}
      onIncrementAsync={() => action('INCREMENT_ASYNC')} />,
    document.getElementById('root')
  )
}
```


[slide] 
我们需要在每个 `INCREMENT_ASYNC` action 启动一个做以下事情的任务：`等待 1 秒，然后增加计数`


[slide] 
添加以下代码到 `sagas.js` 模块：

```javascript
import { delay } from 'redux-saga'
import { put, takeEvery } from 'redux-saga/effects'

export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}
```


[slide] 
引入了一个工具函数 `delay`，这个函数返回一个延迟 1 秒再 resolve 的 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
我们将使用这个函数去 *block(阻塞)* Generator。


[slide] 
Sagas 被实现为 [Generator functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)，它会 yield 对象到 redux-saga middleware。
被 yield 的对象都是一类指令，指令可被 middleware 解释执行。当 middleware 取得一个 yield 后的 Promise，middleware 会暂停 Saga，直到 Promise 完成。
在上面的例子中，`incrementAsync` 这个 Saga 会暂停直到 `delay` 返回的 Promise 被 resolve，这个 Promise 将在 1 秒后 resolve。


[slide] 
一旦 Promise 被 resolve，middleware 会恢复 Saga 接着执行，直到遇到下一个 yield。
在这个例子中，下一个语句是另一个被 yield 的对象：调用 `put({type: 'INCREMENT'})` 的结果，意思是告诉 middleware 发起一个 `INCREMENT` 的 action。


[slide] 
`put` 就是我们称作 *Effect* 的一个例子。Effects 是一些简单 Javascript 对象，包含了要被 middleware 执行的指令。
当 middleware 拿到一个被 Saga yield 的 Effect，它会暂停 Saga，直到 Effect 执行完成，然后 Saga 会再次被恢复。


[slide] 
总结一下，`incrementAsync` Saga 通过 `delay(1000)` 延迟了 1 秒钟，然后 dispatch 一个叫 `INCREMENT` 的 action。


[slide] 
接下来，我们创建了另一个 Saga `watchIncrementAsync`。我们用了一个 `redux-saga` 提供的辅助函数 `takeEvery`，用于监听所有的 `INCREMENT_ASYNC` action，并在 action 被匹配时执行 `incrementAsync` 任务。


[slide] 
现在我们有了 2 个 Sagas，我们需要同时启动它们。为了做到这一点，我们将添加一个 `rootSaga`，负责启动其他的 Sagas。在同样的 `sagas.js` 文件中，重构文件如下：


[slide] 
```javascript
import { delay } from 'redux-saga'
import { put, takeEvery, all } from 'redux-saga/effects'
function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}
function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

export default function* rootSaga() {
  yield all([
    incrementAsync(),
    watchIncrementAsync()
  ])
}
```


[slide] 
这个 Saga yield 了一个数组，值是调用 `helloSaga` 和 `watchIncrementAsync` 两个 Saga 的结果。意思是说这两个 Generators 将会同时启动。
现在我们只有在 `main.js` 的 root Saga 中调用 `sagaMiddleware.run`。


[slide] 
```javascript
// ...
import rootSaga from './sagas'
const sagaMiddleware = createSagaMiddleware()
const store = ...
sagaMiddleware.run(rootSaga)
// ...
```



# Saga 辅助函数

`redux-saga` 提供了一些辅助函数，包装了一些内部方法，用来在一些特定的 `action` 被发起到 `Store` 时派生任务。这些辅助函数构建在低阶 API 之上。我们将会在高级概念一章看到这些函数是如何实现的。


[slide]  
# takeEvery
第一个函数`takeEvery` ，是最常见的，它提供了类似 redux-thunk 的行为。

让我们通过常见的 AJAX 例子来演示一下。每次点击 Fetch 按钮时，我们发起一个 `FETCH_REQUESTED` 的 action。
我们想通过启动一个从服务器获取一些数据的任务，来处理这个 action。


[slide]  
首先我们创建一个将执行异步 action 的任务：

```javascript
import { call, put } from 'redux-saga/effects'

export function* fetchData(action) {
   try {
      const data = yield call(Api.fetchUser, action.payload.url);
      yield put({type: "FETCH_SUCCEEDED", data});
   } catch (error) {
      yield put({type: "FETCH_FAILED", error});
   }
}
```


[slide]  
然后在每次 `FETCH_REQUESTED` action 被发起时启动上面的任务。

```javascript
import { takeEvery } from 'redux-saga'

function* watchFetchData() {
  yield* takeEvery('FETCH_REQUESTED', fetchData)
}
```


[slide]  
在上面的例子中，`takeEvery` 允许多个 `fetchData` 实例同时启动。在某个特定时刻，尽管之前还有一个或多个 `fetchData`
尚未结束，我们还是可以启动一个新的 `fetchData` 任务，


[slide]  
# takeLatest
如果我们只想得到最新那个请求的响应（例如，始终显示最新版本的数据）。我们可以使用 `takeLatest` 辅助函数。

```javascript
import { takeLatest } from 'redux-saga'

function* watchFetchData() {
  yield* takeLatest('FETCH_REQUESTED', fetchData)
}
```


[slide]  
和 `takeEvery` 不同，在任何时刻 `takeLatest` 只允许一个 `fetchData` 任务在执行。并且这个任务是最后被启动的那个。
如果已经有一个任务在执行的时候启动另一个 `fetchData` ，那之前的这个任务会被自动取消。


[slide]  
如果你有多个 Saga 监视不同的 action ，你可以用内置辅助函数创建很多观察者，就像用了 `fork` 来派生他们
（之后我们会讲到 `fork` ，现在就把它当作一个允许我们在后台启动多个 saga 的 Effect ）。


[slide]  
举个例子：

```javascript
import { takeEvery } from 'redux-saga/effects'
// FETCH_USERS
function* fetchUsers(action) { ... }
// CREATE_USER
function* createUser(action) { ... }
// 同时使用它们
export default function* rootSaga() {
  yield takeEvery('FETCH_USERS', fetchUsers)
  yield takeEvery('CREATE_USER', createUser)
}
```


[slide]  
# 声明式 Effects

在 `redux-saga` 的世界里，Sagas 都用 Generator 函数实现。我们从 Generator 里 yield 纯 JavaScript 对象以表达 Saga 逻辑。
我们称呼那些对象为 *Effect*。Effect 是一个简单的对象，这个对象包含了一些给 middleware 解释执行的信息。
你可以把 Effect 看作是发送给 middleware 的指令以执行某些操作（调用某些异步函数，发起一个 action 到 store，等等）。


[slide]  
你可以使用 `redux-saga/effects` 包里提供的函数来创建 Effect。

这一部分和接下来的部分，我们将介绍一些基础的 Effect。并见识到这些 Effect 概念是如何让 Sagas 很容易地被测试的。


[slide]  
Sagas 可以多种形式 yield Effect。最简单的方式是 yield 一个 Promise。

举个例子，假设我们有一个监听 `PRODUCTS_REQUESTED` action 的 Saga。每次匹配到 action，它会启动一个从服务器上获取产品列表的任务。

```javascript
import { takeEvery } from 'redux-saga/effects'
import Api from './path/to/api'

function* watchFetchProducts() {
  yield takeEvery('PRODUCTS_REQUESTED', fetchProducts)
}

function* fetchProducts() {
  const products = yield Api.fetch('/products')
  console.log(products)
}
```


[slide]  
在上面的例子中，我们在 Generator 中直接调用了 `Api.fetch`（在 Generator 函数中，`yield` 右边的任何表达式都会被求值，结果会被 yield 给调用者）。

`Api.fetch('/products')` 触发了一个 AJAX 请求并返回一个 Promise，Promise 会 resolve 请求的响应，
这个 AJAX 请求将立即执行。看起来简单又地道，但...


