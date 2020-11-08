import { createSlice } from '@reduxjs/toolkit';
import {
  addChannel,
  removeChannel,
  renameChannel,
} from './channels';

const loadedSlice = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {
    nonloaded() {
      return false;
    },
    loaded() {
      return true;
    },
  },
  extraReducers: {
    [addChannel.pending]: () => false,
    [addChannel.fulfilled]: () => true,
    [addChannel.rejected]: () => true,
    [removeChannel.pending]: () => false,
    [removeChannel.fulfilled]: () => true,
    [removeChannel.rejected]: () => true,
    [renameChannel.pending]: () => false,
    [renameChannel.fulfilled]: () => true,
    [renameChannel.rejected]: () => true,
  },
});

const { actions } = loadedSlice;
export const loadedActions = actions;
export default loadedSlice.reducer;
