import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { uniqueId } from 'lodash';
import routes from '../routes';
import { channelsActions } from './channels';

export const addMessage = createAsyncThunk(
  'AddingMessageStatus',
  async ({ channelId, message, nickName }) => {
    const response = await axios.post(routes.channelMessagesPath(channelId), {
      data: {
        attributes: {
          channelId,
          message,
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
