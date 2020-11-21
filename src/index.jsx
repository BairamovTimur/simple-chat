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

const { rollbarToken } = gon;

// eslint-disable-next-line no-unused-vars
const rollbar = new Rollbar({
  enabled: (process.env.NODE_ENV === 'production'),
  accessToken: rollbarToken,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const socket = io(document.URL, { transports: ['websocket'] });

const vDom = init(gon, socket);

render(vDom, document.getElementById('chat'));
