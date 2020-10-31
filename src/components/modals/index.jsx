import React from 'react';
import { useSelector } from 'react-redux';
import Add from './Add.jsx';
import Remove from './Remove.jsx';
import Rename from './Rename.jsx';

const mapping = {
  add: Add,
  remove: Remove,
  rename: Rename,
};

export default () => {
  const modalType = useSelector((state) => state.modal.modalType);

  if (!modalType) {
    return null;
  }

  const Component = mapping[modalType];

  return (
    <Component />
  );
};
