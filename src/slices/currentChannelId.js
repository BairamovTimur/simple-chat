import { createSlice } from '@reduxjs/toolkit';
import { channelsActions, addChannel } from './channels';

const initialState = 1;

const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState,
  reducers: {
    changeChannel(state, { payload }) {
      return payload;
    },
  },
  extraReducers: {
    [channelsActions.removeChannel]: (state, { payload: { data } }) => {
      const { id } = data;
      return state === id ? initialState : state;
    },
    [addChannel.fulfilled]: (state, { payload: { data: { id } } }) => id,
  },
});

const { actions } = currentChannelIdSlice;
export const currentChannelIdActions = actions;
export default currentChannelIdSlice.reducer;
