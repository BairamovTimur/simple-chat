// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import io from 'socket.io-client';
import Rollbar from 'rollbar';
import { render } from 'react-dom';
// @ts-ignore
import gon from 'gon';

import '../assets/application.scss';
import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const socket = io(document.URL, { transports: ['websocket'] });

// eslint-disable-next-line no-unused-vars
const rollbar = new Rollbar({
  accessToken: '8365a808ebc74a2db114bd93f439c562',
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const vDom = init(gon, socket);

render(vDom, document.getElementById('chat'));
