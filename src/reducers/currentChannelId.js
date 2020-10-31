import { createSlice } from '@reduxjs/toolkit';
import { channelsActions } from './channels';

const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState: {},
  reducers: {
    changeChannel(state, { payload }) {
      return payload;
    },
  },
  extraReducers: {
    [channelsActions.removeChannel]: (state, { payload: { data } }) => {
      const { id } = data;
      return state === id ? 1 : state;
    },
  },
});

const { actions } = currentChannelIdSlice;
export const currentChannelIdActions = actions;
export default currentChannelIdSlice.reducer;
