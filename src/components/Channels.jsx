import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; import {
  Button,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';
import { isEmpty } from 'lodash';

import { actions } from '../slices/index';

const Channels = () => {
  const channels = useSelector((state) => state.channels);
  const dispatch = useDispatch();

  const currentChannelId = useSelector((state) => state.currentChannelId);

  const handleClickChannel = (id) => () => {
    dispatch(actions.changeChannel(id));
  };

  const handleClickAddChannel = () => {
    dispatch(actions.showModal({ modalType: 'add' }));
  };

  const handleClickRemoveChannel = (channelId) => () => {
    dispatch(actions.showModal({ modalType: 'remove', channelId }));
  };

  const handleClickRenameChannel = (channelId, channelName) => () => {
    dispatch(actions.showModal({ modalType: 'rename', channelId, channelName }));
  };

  const renderDropdownButton = (variantButton, id, name) => (
    <DropdownButton title="" id="bg-nested-dropdown" variant={variantButton}>
      <Dropdown.Item onClick={handleClickRemoveChannel(id)}>Remove</Dropdown.Item>
      <Dropdown.Item onClick={handleClickRenameChannel(id, name)}>Rename</Dropdown.Item>
    </DropdownButton>
  );

  const renderChannels = () => channels.map(({ id, name, removable }) => {
    const activeChannel = currentChannelId === id;
    const variantButton = activeChannel ? 'primary' : 'light';

    return (
      <li className="nav-item" key={id}>
        <div role="group" className="d-flex mb-2 dropdown btn-group">
          <Button type="button" variant={variantButton} onClick={handleClickChannel(id)}>{name}</Button>
          {removable && renderDropdownButton(variantButton, id, name)}
        </div>
      </li>
    );
  });

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <Button type="button" variant="link" className="ml-auto p-0 btn" onClick={handleClickAddChannel}>+</Button>
      </div>
      {!isEmpty(channels) && <ul className="nav flex-column nav-pills nav-fill">{renderChannels()}</ul>}
    </div>
  );
};

export default Channels;
