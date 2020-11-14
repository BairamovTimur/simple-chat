// @ts-ignore
import cookies from 'js-cookie';
import faker from 'faker';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import Rollbar from 'rollbar';
import validator from 'validator';

import reducers, { actions } from './slices/index';
import App from './components/App.jsx';
import NickNameContext from './context';

export default (gon, socket) => {
  const getNickName = () => (cookies.get('nickName') ? cookies.get('nickName') : faker.name.findName());

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
      channelName: '',
      errorMessage: '',
    },
    loaded: 'nonLoaded',
  };

  const nickName = getNickName();
  cookies.set('nickName', nickName);

  const middleware = getDefaultMiddleware();

  const store = configureStore({
    reducer: reducers,
    middleware,
    preloadedState,
  });

  const { dispatch } = store;

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
