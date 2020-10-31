import { combineReducers } from 'redux';

import messages, { messagesActions, addMessage } from './messages';
import channels, { channelsActions, addChannel, removeChannel, renameChannel } from './channels';
import currentChannelId, { currentChannelIdActions } from './currentChannelId';
import modal, { modalActions } from './modal';

export default combineReducers({
  messages,
  channels,
  currentChannelId,
  modal,
});

export const actions = {
  ...messagesActions,
  ...currentChannelIdActions,
  ...channelsActions,
  ...modalActions,
};

export const asyncActions = {
  addMessage,
  addChannel,
  removeChannel,
  renameChannel,
};
