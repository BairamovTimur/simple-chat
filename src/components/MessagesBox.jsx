import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { scroller } from 'react-scroll';

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

  useEffect(() => {
    scroller.scrollTo('element-for-scrolling', {
      duration: 800,
      delay: 0,
      smooth: true,
      containerId: 'messages-box',
    });
  }, [messages]);

  return (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      {messages.map(({ id, message, nickName }) => (
        <Message key={id} message={message} nickName={nickName} />
      ))}
      <div name="element-for-scrolling" />
    </div>
  );
};

export default MessagesBox;
