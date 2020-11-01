import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { uniqueId } from 'lodash';
import validator from 'validator';

import routes from '../routes';
import { channelsActions } from './channels';

export const addMessage = createAsyncThunk(
  'AddingMessageStatus',
  async ({ channelId, message, nickName }) => {
    const pureMessage = validator.escape(message);
    const response = await axios.post(routes.channelMessagesPath(channelId), {
      data: {
        attributes: {
          channelId,
          message: pureMessage,
          nickName,
          id: uniqueId(),
        },
        id: channelId,
      },
    });
    return response.data;
  },
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { messages: [] },
  reducers: {
    addMessage(state, { payload: { data } }) {
      const { attributes } = data;
      attributes.message = validator.unescape(attributes.message);
      state.push(attributes);
    },
  },
  extraReducers: {
    [channelsActions.removeChannel]: (state, { payload: { data } }) => {
      const { id } = data;
      return state.filter((message) => message.channelId !== id);
    },
  },
});

const { actions } = messagesSlice;
export const messagesActions = actions;
export default messagesSlice.reducer;
