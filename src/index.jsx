// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
// @ts-ignore
import gon from 'gon';

import '../assets/application.scss';
import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
init(gon);
