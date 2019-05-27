# PubSub 用于兄弟组件通讯

## PubSub 使用方式

- react 导入库

  > npm install pubsub-js --save

- react 页面导入 pibsubjs

  > import PubSub from 'pubsub-js'

- pubsubjs 常用函数
  > 发送消息：PubSub.publish(名称,参数)  
  > 订阅消息：PubSub.subscrib(名称,函数)  
  > 取消订阅：PubSub.unsubscrib(名称)

## React 实例使用监听实现传参

- #### 子页面 home.js 使用 PubSub.publish 发送 state (Home.js)

```javascript
import React, { Component } from "react";
import PubSub from "pubsub-js";

class Home extends Component {
  state = {
    increase: "increase",
    decrease: "decrease"
  };

  buttonIncrease = () => {
    PubSub.publish("PubSubmessage", this.state.increase);
  };

  buttonDecrease = () => {
    PubSub.publish("PubSubmessage", this.state.decrease);
  };

  render() {
    return (
      <div>
        Some state changes:
        <button onClick={this.buttonIncrease}>Increase</button>
        <button onClick={this.buttonDecrease}>Decrease</button>
      </div>
    );
  }
}

export default Home;
```

- #### 父页面 App.js 接收使用 PubSub.subscribe 订阅指定消息，PubSub.unsubscribe 取消订阅消息 (App.js)

```javascript
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PubSub from "pubsub-js";

class App extends Component {
  state = {
    increase: "none"
  };

  componentDidMount = () => {
    this.pubsub_token = PubSub.subscribe("PubSubmessage", (topic, message) => {
      console.log(topic);
      this.setState({
        increase: message
      });
    });
  };

  componentWillUnmount = () => {
    PubSub.unsubscribe(this.pubsub_token);
  };

  render() {
    return (
      <div>
        <header>
          <Link to="/App/home">Home</Link>
        </header>
        <div style={{ marginTop: "1.5em" }}>{this.props.children}</div>
        <div style={{ marginTop: "1.5em" }}>{this.state.increase}</div>
      </div>
    );
  }
}

export default App;
```

- #### 入口文件 (index.js)

```javascript
import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Router, Route } from "react-router";

import App from "../components/App.js";
import Home from "../components/Home.js";

export default class RouterIndex extends Component {
  render() {
    return (
      <BrowserRouter>
        <App path="/App" component={App}>
          <Route path="/App/home" component={Home} />
        </App>
      </BrowserRouter>
    );
  }
}
```
