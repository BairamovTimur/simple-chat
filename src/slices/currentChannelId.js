import { createSlice } from '@reduxjs/toolkit';
import { channelsActions } from './channels';

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
    [channelsActions.addChannel]: (state, { payload: { data } }) => {
      const { attributes } = data;
      return attributes.id;
    },
  },
});

const { actions } = currentChannelIdSlice;
export const currentChannelIdActions = actions;
export default currentChannelIdSlice.reducer;
