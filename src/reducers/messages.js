import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { uniqueId } from 'lodash';
import routes from '../routes';

export const postMessage = createAsyncThunk(
  'postMessageStatus',
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
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
