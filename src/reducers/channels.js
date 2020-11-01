import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import validator from 'validator';

import routes from '../routes';

export const addChannel = createAsyncThunk(
  'AddingChannelStatus',
  async (name) => {
    const pureName = validator.escape(name);
    const response = await axios.post(routes.channelsPath(), {
      data: {
        attributes: {
          name: pureName,
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
    const pureName = validator.escape(channelName);
    const response = await axios.patch(routes.channelPath(channelId), {
      data: {
        attributes: {
          name: pureName,
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
      attributes.name = validator.unescape(attributes.name);
      state.push(attributes);
    },
    removeChannel(state, { payload: { data } }) {
      const { id } = data;
      return state.filter((channel) => channel.id !== id);
    },
    renameChannel(state, { payload: { data } }) {
      const { id, attributes } = data;
      attributes.name = validator.unescape(attributes.name);
      return state.map((channel) => (channel.id === id ? attributes : channel));
    },
  },
});

const { actions } = channelsSlice;
export const channelsActions = actions;
export default channelsSlice.reducer;
