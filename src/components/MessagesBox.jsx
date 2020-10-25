import React from 'react';
import { useSelector } from 'react-redux';

const getMessageChannel = (channelId, messages) => messages
  .filter((message) => message.channelId === channelId);

export default (props) => {
  const { currentChannelId } = props;

  const messages = useSelector((state) => getMessageChannel(currentChannelId, state.messages));

  const renderMessages = () => messages.map(({ id, message, nickName }) => (
    <div key={id}>
      <b>{`${nickName}:`}</b>
      {message}
    </div>
  ));

  return (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      {messages && renderMessages()}
    </div>
  );
};
