import React from 'react';
import Channels from './Channels.jsx';
import Chat from './Chat.jsx';
import InputForm from './InputForm.jsx';
import MessageBox from './MessagesBox.jsx';

export default (props) => {
  const { channels, currentChannelId } = props;

  return (
    <div className="row h-100 pb-3">
      <Channels channels={channels} currentChannelId={currentChannelId} />
      <Chat>
        <MessageBox currentChannelId={currentChannelId} />
        <InputForm currentChannelId={currentChannelId} />
      </Chat>
    </div>
  );
};
