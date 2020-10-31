import React from 'react';
import { useSelector } from 'react-redux';

import Channels from './Channels.jsx';
import Chat from './Chat.jsx';
import InputForm from './InputForm.jsx';
import MessageBox from './MessagesBox.jsx';
import Modal from './modals/index.jsx';

export default () => {
  const channels = useSelector((state) => state.channels);

  return (
    <div className="row h-100 pb-3">
      <Channels channels={channels} />
      <Chat>
        <MessageBox />
        <InputForm />
      </Chat>
      <Modal />
    </div>
  );
};
