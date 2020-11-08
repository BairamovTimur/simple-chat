// @ts-ignore
import cookies from 'js-cookie';
import faker from 'faker';
import io from 'socket.io-client';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import Rollbar from 'rollbar';
import validator from 'validator';

import reducers, { actions } from './slices/index';
import App from './components/App.jsx';
import NickNameContext from './context';

export default (gon) => {
  const getNickName = () => {
    const nickName = cookies.get('nickName');
    if (nickName) {
      return nickName;
    }

    return faker.name.findName();
  };

  const setNickNameInCookies = (nickName) => {
    cookies.set('nickName', nickName);
  };

  const { currentChannelId } = gon;

  const channels = gon.channels.map((channel) => ({
    ...channel,
    name: validator.unescape(channel.name),
  }));

  const messages = gon.messages.map((item) => ({
    ...item,
    message: validator.unescape(item.message),
  }));

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
    modal: {
      modalType: null,
      channelId: null,
      channelName: null,
      errorMessage: '',
    },
    loaded: false,
  };

  const nickName = getNickName();
  setNickNameInCookies(nickName);

  const middleware = getDefaultMiddleware({
    thunk: true,
  });

  const store = configureStore({
    reducer: reducers,
    middleware,
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

  dispatch(actions.loaded());

  render(
    <Provider store={store}>
      <NickNameContext.Provider value={nickName}>
        <App />
      </NickNameContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
