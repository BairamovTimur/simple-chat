import '@testing-library/jest-dom';
import nock from 'nock';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import MockedSocket from 'socket.io-mock';
import 'regenerator-runtime/runtime.js';
import { matches } from 'lodash';
import axios from 'axios';

import init from '../src/init.jsx';

// eslint-disable-next-line functional/no-let
let socket;
// eslint-disable-next-line functional/no-let
let host;

beforeAll(async () => {
  host = 'http://localhost:80';
  axios.defaults.baseURL = host;
  // eslint-disable-next-line global-require
  axios.defaults.adapter = require('axios/lib/adapters/http');
});

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
  const vDom = await init(gon, socket.socketClient);
  await render(vDom);
});

test('add message', async () => {
  const input = screen.getByRole('textbox', { name: 'body' });
  const submit = screen.getByRole('button', { name: 'Submit' });

  const scope = nock(host)
    .post('/api/v1/channels/1/messages', matches({ data: { attributes: { message: 'Hello World!' } } }))
    .reply(201, {});

  userEvent.type(input, 'Hello World!');
  userEvent.click(submit);
  await waitFor(() => expect(scope.isDone()).toBeTruthy());

  const newMessage = {
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

  socket.emit('newMessage', newMessage);
  const text = await screen.findByText('Hello World!');

  expect(text).toBeInTheDocument();
});

test('channel add', async () => {
  const buttonAddChannel = screen.getByRole('button', { name: '+' });

  const newChannel = {
    data: {
      type: 'channels',
      id: 8,
      attributes: {
        name: 'testChannel',
        removable: true,
        id: 8,
      },
    },
  };

  const scope = nock(host)
    .post('/api/v1/channels', matches({ data: { attributes: { name: 'testChannel' } } }))
    .reply(201, newChannel);

  userEvent.click(buttonAddChannel);
  const textFormAdd = await screen.findByText('Add channel');
  expect(textFormAdd).toBeInTheDocument();

  const input = screen.getByRole('textbox', { name: 'channelName' });
  const submit = screen.getByRole('button', { name: 'channelSubmit' });

  userEvent.type(input, 'testChannel');
  userEvent.click(submit);
  await waitFor(() => expect(scope.isDone()).toBeTruthy());

  socket.emit('newChannel', newChannel);
  const channelName = await screen.findByText('testChannel');
  expect(channelName).toBeInTheDocument();
});
