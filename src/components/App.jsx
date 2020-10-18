import React from 'react';
import Channels from './Channels.jsx';
import MessageBox from './MessagesBox.jsx';

export default (props) => {
  const { channels, currentChannelId, messages } = props;

  return (
    <div className="row h-100 pb-3">
      <Channels channels={channels} currentChannelId={currentChannelId} />
      <MessageBox messages={messages} />
    </div>
  );
};
