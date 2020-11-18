import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const getMessageChannel = (channelId, messages) => messages
  .filter((message) => message.channelId === channelId);

const Message = (props) => {
  const { message, nickName } = props;
  return (
    <div>
      <b>{`${nickName}: `}</b>
      {message}
    </div>
  );
};

const MessagesBox = () => {
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const messages = useSelector((state) => getMessageChannel(currentChannelId, state.messages));

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.scrollIntoView();
  }, [messages]);

  return (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      {messages.map(({ id, message, nickName }) => (
        <Message key={id} message={message} nickName={nickName} />
      ))}
      <div ref={inputRef} />
    </div>
  );
};

export default MessagesBox;
