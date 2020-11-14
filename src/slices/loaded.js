import { createSlice } from '@reduxjs/toolkit';
import {
  addChannel,
  removeChannel,
  renameChannel,
} from './channels';

const loadedSlice = createSlice({
  name: 'loading',
  initialState: 'nonLoaded',
  reducers: {
    nonloaded() {
      return 'nonLoaded';
    },
    loaded() {
      return 'loaded';
    },
  },
  extraReducers: {
    [addChannel.pending]: () => 'nonLoaded',
    [addChannel.fulfilled]: () => 'loaded',
    [addChannel.rejected]: () => 'loaded',
    [removeChannel.pending]: () => 'nonLoaded',
    [removeChannel.fulfilled]: () => 'loaded',
    [removeChannel.rejected]: () => 'loaded',
    [renameChannel.pending]: () => 'nonLoaded',
    [renameChannel.fulfilled]: () => 'loaded',
    [renameChannel.rejected]: () => 'loaded',
  },
});

const { actions } = loadedSlice;
export const loadedActions = actions;
export default loadedSlice.reducer;
