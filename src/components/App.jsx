import React from 'react';
import { useSelector } from 'react-redux';

import Channels from './Channels.jsx';
import InputForm from './InputForm.jsx';
import MessageBox from './MessagesBox.jsx';
import Modal from './modals/index.jsx';

const App = () => {
  const loaded = useSelector((state) => state.loaded);
  if (loaded) {
    return (
      <div className="row h-100 pb-3">
        <Channels />
        <div className="col h-100">
          <div className="d-flex flex-column h-100">
            <MessageBox />
            <InputForm />
          </div>
        </div>
        <Modal />
      </div>
    );
  }
  return (
    <div className="container-fluid h-100">
      <div className="row align-items-center h-100">
        <div className="col-sm-12">
          <div className="row justify-content-center">
            <div className="col-4 text-center">
              <div className="spinner-grow text-primary align-self-center" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
