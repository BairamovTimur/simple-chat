import { createSlice } from '@reduxjs/toolkit';
import validator from 'validator';

import { channelsActions } from './channels';

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
