import { createSlice } from '@reduxjs/toolkit';
import Enum from 'enum';

import {
  addChannel,
  removeChannel,
  renameChannel,
} from './channels';

export const appState = new Enum({ loaded: 'loaded', nonLoaded: 'nonLoaded' });

const loadedSlice = createSlice({
  name: 'appState',
  initialState: appState.nonLoaded.value,
  reducers: {
    loaded() {
      return appState.loaded.value;
    },
  },
  extraReducers: {
    [addChannel.pending]: () => appState.nonLoaded.value,
    [addChannel.fulfilled]: () => appState.loaded.value,
    [addChannel.rejected]: () => appState.loaded.value,
    [removeChannel.pending]: () => appState.nonLoaded.value,
    [removeChannel.fulfilled]: () => appState.loaded.value,
    [removeChannel.rejected]: () => appState.loaded.value,
    [renameChannel.pending]: () => appState.nonLoaded.value,
    [renameChannel.fulfilled]: () => appState.loaded.value,
    [renameChannel.rejected]: () => appState.loaded.value,
  },
});

const { actions } = loadedSlice;
export const loadedActions = actions;

export default loadedSlice.reducer;
