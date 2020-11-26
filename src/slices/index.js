import { combineReducers } from 'redux';

import messages, { messagesActions } from './messages';
import channels, {
  channelsActions,
  addChannel,
  removeChannel,
  renameChannel,
} from './channels';
import currentChannelId, { currentChannelIdActions } from './currentChannelId';
import modal, { modalActions } from './modal';
import loaded, { loadedActions, appState as appStateStatus } from './loaded';

export default combineReducers({
  messages,
  channels,
  currentChannelId,
  modal,
  loaded,
});

export const actions = {
  ...messagesActions,
  ...currentChannelIdActions,
  ...channelsActions,
  ...modalActions,
  ...loadedActions,
};

export const asyncActions = {
  addChannel,
  removeChannel,
  renameChannel,
};

export const appState = appStateStatus;
