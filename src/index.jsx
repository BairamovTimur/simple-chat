// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import io from 'socket.io-client';
// @ts-ignore
import gon from 'gon';

import '../assets/application.scss';
import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const socket = io(document.URL, { transports: ['websocket'] });

init(gon, socket);
