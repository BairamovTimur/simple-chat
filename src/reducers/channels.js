import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../routes';

export const addChannel = createAsyncThunk(
  'AddingChannelStatus',
  async (name) => {
    const response = await axios.post(routes.channelsPath(), {
      data: {
        attributes: {
          name,
        },
      },
    });
    return response.data;
  },
);

export const removeChannel = createAsyncThunk(
  'DeletedChannelStatus',
  async (channelId) => {
    const response = await axios.delete(routes.channelPath(channelId));
    return response.data;
  },
);

export const renameChannel = createAsyncThunk(
  'RenamedChannelStatus',
  async ({ channelId, channelName }) => {
    const response = await axios.patch(routes.channelPath(channelId), {
      data: {
        attributes: {
          name: channelName,
        },
      },
    });
    return response.data;
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { channels: [] },
  reducers: {
    addChannel(state, { payload: { data } }) {
      const { attributes } = data;
      state.push(attributes);
    },
    removeChannel(state, { payload: { data } }) {
      const { id } = data;
      return state.filter((channel) => channel.id !== id);
    },
    renameChannel(state, { payload: { data } }) {
      const { id, attributes } = data;
      return state.map((channel) => (channel.id === id ? attributes : channel));
    },
  },
});

const { actions } = channelsSlice;
export const channelsActions = actions;
export default channelsSlice.reducer;
