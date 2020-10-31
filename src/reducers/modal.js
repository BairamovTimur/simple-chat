import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {},
  reducers: {
    showModal(state, { payload }) {
      const { modalType, channelId, channelName } = payload;
      return { modalType, channelId, channelName };
    },
    hideModal() {
      return { modalType: null, channelId: null, channelName: null };
    },
  },
});

const { actions } = modalSlice;
export const modalActions = actions;
export default modalSlice.reducer;
