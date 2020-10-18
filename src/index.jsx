// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

// import faker from 'faker';
// @ts-ignore
import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

import React from 'react';
import { render } from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import reducers from './reducers/index.js';
import App from './components/App.jsx';
// import { fetchTasks } from './actions/index.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('gon', gon);

// const store = createStore(
//  reducers,
// );

render(
  // <Provider store={store}>
  <App channels={gon.channels} currentChannelId={gon.currentChannelId} />,
  // </Provider>,
  document.getElementById('chat'),
);
