import { createSlice } from '@reduxjs/toolkit';
import { channelsActions, addChannel } from './channels';

const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState: 1,
  reducers: {
    changeChannel(state, { payload }) {
      return payload;
    },
  },
  extraReducers: {
    [channelsActions.removeChannel]: (state, { payload: { data } }) => {
      const { id } = data;
      const initState = 1;
      return state === id ? initState : state;
    },
    [addChannel.fulfilled]: (state, { payload: { data: { id } } }) => id,
  },
});

const { actions } = currentChannelIdSlice;
export const currentChannelIdActions = actions;
export default currentChannelIdSlice.reducer;
