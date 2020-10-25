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

import reducers, { actions } from './reducers/index';
import App from './components/App.jsx';
import NickNameContext from './context';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('gon', gon);

const getNickName = () => {
  const nickName = cookies.get('nickName');
  if (nickName) {
    return nickName;
  }

  const newNick = faker.name.findName();
  cookies.set('nickName', newNick);
  return newNick;
};

// const { channels, currentChannelId, messages } = gon;

const { messages } = gon;

const preloadedState = { messages };

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
  // @ts-ignore
  preloadedState,
});

const { dispatch } = store;

const socket = io(document.URL, { transports: ['websocket'] });

socket.on('newMessage', (data) => {
  dispatch(actions.addMessage(data));
});

render(
  <Provider store={store}>
    <NickNameContext.Provider value={nickName}>
      <App channels={gon.channels} currentChannelId={gon.currentChannelId} />
    </NickNameContext.Provider>
  </Provider>,
  document.getElementById('chat'),
);
