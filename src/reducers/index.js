import { combineReducers } from 'redux';

import messages, { actions as messagesActions, postMessage } from './messages';

export default combineReducers({
  messages,
});

export const actions = { ...messagesActions };

export const asyncActions = {
  postMessage,
};
