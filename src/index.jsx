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

const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  localStorage.debug = 'chat:*';
}

// eslint-disable-next-line no-unused-vars
const rollbar = new Rollbar({
  enabled: isProduction,
  accessToken: process.env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const socket = io(document.URL, { transports: ['websocket'] });

const vDom = init(gon, socket);

render(vDom, document.getElementById('chat'));
