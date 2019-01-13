import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import reducer from './reducers';
import { BrowserRouter } from 'react-router-dom';
import async from './middleware/async';
// import reduxPromise from 'redux-promise';

import './css/index.css';
import './css/res.css';
import './css/github.css';
import './css/antd.css';
import './css/antdcode.css';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ;
const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(async))
);

// const store = createStore(
//   reducer,
//   applyMiddleware(async)
// );

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, 
  document.querySelector('#root')
);