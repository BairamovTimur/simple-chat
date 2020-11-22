import '@testing-library/jest-dom';
import nock from 'nock';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import MockedSocket from 'socket.io-mock';
import 'regenerator-runtime/runtime.js';
import { matches } from 'lodash';
import axios from 'axios';

import init from '../src/init.jsx';

const elements = {};
// eslint-disable-next-line functional/no-let
let socket;

beforeEach(async () => {
  const gon = {
    channels: [
      { id: 1, name: 'general', removable: false },
      { id: 2, name: 'random', removable: false },
    ],
    messages: [],
    currentChannelId: 1,
  };

  socket = new MockedSocket();
  axios.defaults.baseURL = 'http://localhost:80';
  // eslint-disable-next-line global-require
  axios.defaults.adapter = require('axios/lib/adapters/http');
  const vDom = await init(gon, socket.socketClient);
  render(vDom);
  elements.input = screen.getByRole('textbox', { name: 'body' });
  elements.submit = screen.getByRole('button', { name: 'Submit' });
});

test('app', async () => {
  const scope = nock('http://localhost:80')
    .post('/api/v1/channels/1/messages', matches({ data: { attributes: { message: 'Hello World!' } } }))
    .reply(200, {});

  const message = {
    data: {
      type: 'messages',
      id: 10,
      attributes: {
        channelId: 1,
        id: 10,
        message: 'Hello World!',
        nickName: 'Test',
      },
    },
  };

  socket.emit('newMessage', message);

  userEvent.type(elements.input, 'Hello World!');
  userEvent.click(elements.submit);
  const text = await screen.findByText('Hello World!');
  expect(text).toBeInTheDocument();
  expect(scope.isDone()).toBeTruthy();
});
