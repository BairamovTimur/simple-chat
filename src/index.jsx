// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

// import faker from 'faker';
// @ts-ignore
import gon from 'gon';
import cookies from 'js-cookie';
import faker from 'faker';
import io from 'socket.io-client';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import Rollbar from 'rollbar';

import reducers, { actions } from './reducers/index';
import App from './components/App.jsx';
import NickNameContext from './context';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const getNickName = () => {
  const nickName = cookies.get('nickName');
  if (nickName) {
    return nickName;
  }

  const newNick = faker.name.findName();
  cookies.set('nickName', newNick);
  return newNick;
};

const { channels, currentChannelId, messages } = gon;

// eslint-disable-next-line no-unused-vars
const rollbar = new Rollbar({
  accessToken: '8365a808ebc74a2db114bd93f439c562',
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const preloadedState = {
  channels,
  currentChannelId,
  messages,
  modal: { modalType: null, channelId: null, channelName: null },
};

const nickName = getNickName();

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
  thunk: true,
});

const store = configureStore({
  reducer: reducers,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
});

const { dispatch } = store;

const socket = io(document.URL, { transports: ['websocket'] });

socket.on('newMessage', (data) => {
  dispatch(actions.addMessage(data));
});

socket.on('newChannel', (data) => {
  dispatch(actions.addChannel(data));
});

socket.on('removeChannel', (data) => {
  dispatch(actions.removeChannel(data));
});

socket.on('renameChannel', (data) => {
  dispatch(actions.renameChannel(data));
});

render(
  <Provider store={store}>
    <NickNameContext.Provider value={nickName}>
      <App />
    </NickNameContext.Provider>
  </Provider>,
  document.getElementById('chat'),
);
