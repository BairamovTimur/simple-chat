import { createSlice } from '@reduxjs/toolkit';
import {
  addChannel,
  removeChannel,
  renameChannel,
} from './channels';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modalType: null,
    channelId: null,
    channelName: '',
    errorMessage: '',
  },
  reducers: {
    showModal(state, { payload }) {
      const { modalType, channelId, channelName } = payload;
      return {
        modalType,
        channelId,
        channelName,
        errorMessage: '',
      };
    },
    hideModal() {
      return {
        modalType: null,
        channelId: null,
        channelName: '',
        errorMessage: '',
      };
    },
  },
  extraReducers: {
    [addChannel.pending]: (state) => ({
      ...state,
      ...{ modalType: null },
    }),
    [addChannel.fulfilled]: () => ({
      modalType: null,
      channelId: null,
      channelName: '',
      errorMessage: '',
    }),
    [addChannel.rejected]: (state, { error, meta }) => ({
      ...state,
      ...{ modalType: 'add', errorMessage: error.message, channelName: meta.arg.channelName },
    }),
    [removeChannel.pending]: (state) => ({
      ...state,
      ...{ modalType: null },
    }),
    [removeChannel.fulfilled]: () => ({
      modalType: null,
      channelId: null,
      channelName: '',
      errorMessage: '',
    }),
    [removeChannel.rejected]: (state, { error }) => ({
      ...state,
      ...{ modalType: 'remove', errorMessage: error.message },
    }),
    [renameChannel.pending]: (state) => ({
      ...state,
      ...{ modalType: null },
    }),
    [renameChannel.fulfilled]: () => ({
      modalType: null,
      channelId: null,
      channelName: '',
      errorMessage: '',
    }),
    [renameChannel.rejected]: (state, { error, meta }) => ({
      ...state,
      ...{ modalType: 'rename', errorMessage: error.message, channelName: meta.arg.channelName },
    }),
  },
});

const { actions } = modalSlice;
export const modalActions = actions;
export default modalSlice.reducer;
