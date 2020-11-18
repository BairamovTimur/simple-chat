import React from 'react';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
} from 'react-bootstrap';

import Channel from './Channel.jsx';
import InputForm from './InputForm.jsx';
import MessageBox from './MessagesBox.jsx';
import Modal from './Modal.jsx';
import { actions } from '../slices/index';

const Chat = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels);

  const handleAddChannel = () => {
    dispatch(actions.showModal({ modalType: 'add', channelName: '' }));
  };

  return (
    <div className="row h-100 pb-3">
      <div className="col-3 border-right">
        <div className="d-flex mb-2">
          <span>Channels</span>
          <Button type="button" variant="link" className="ml-auto p-0 btn" onClick={handleAddChannel}>+</Button>
        </div>
        {!isEmpty(channels)
          && (
            <ul className="nav flex-column nav-pills nav-fill">
              {channels.map((channel) => <Channel key={channel.id} channelData={channel} />)}
            </ul>
          )}
      </div>
      <div className="col h-100">
        <div className="d-flex flex-column h-100">
          <MessageBox />
          <InputForm />
        </div>
      </div>
      <Modal />
    </div>
  );
};

const Loader = () => (
  <div className="h-75 row justify-content-center">
    <div className="spinner-grow text-primary align-self-center" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

const App = () => {
  const loaded = useSelector((state) => state.loaded);

  return (
    <>
      <div className="container w-100"><h1>i-Slack</h1></div>
      <div className="container h-100 overflow-hidden">
        <div className="h-100">
          {loaded === 'loaded' ? <Chat /> : <Loader />}
        </div>
      </div>
    </>
  );
};

export default App;
