import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; import {
  Button,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';

import { actions } from '../slices/index';

const Channel = ({ channelData }) => {
  const { id, name, removable } = channelData;
  const dispatch = useDispatch();

  const currentChannelId = useSelector((state) => state.currentChannelId);

  const handleChannel = () => () => {
    dispatch(actions.changeChannel(id));
  };

  const handleRemoveChannel = (channelId) => () => {
    dispatch(actions.showModal({ modalType: 'remove', channelId }));
  };

  const handleRenameChannel = (channelId, channelName) => () => {
    dispatch(actions.showModal({ modalType: 'rename', channelId, channelName }));
  };

  const renderDropdownButton = (variantButton) => (
    <DropdownButton title="" id="bg-nested-dropdown" variant={variantButton}>
      <Dropdown.Item onClick={handleRemoveChannel(id)}>Remove</Dropdown.Item>
      <Dropdown.Item onClick={handleRenameChannel(id, name)}>Rename</Dropdown.Item>
    </DropdownButton>
  );

  const variantButton = currentChannelId === id ? 'primary' : 'light';

  return (
    <li className="nav-item" key={id}>
      <div role="group" className="d-flex mb-2 dropdown btn-group">
        <Button type="button" variant={variantButton} onClick={handleChannel(id)}>{name}</Button>
        {removable && renderDropdownButton(variantButton, id, name)}
      </div>
    </li>
  );
};

export default Channel;
