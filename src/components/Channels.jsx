import React from 'react';
import cn from 'classnames';

export default (props) => {
  const { channels, currentChannelId } = props;

  console.log(currentChannelId);
  console.log(channels);

  const renderChanells = () => channels.map(({ id, name }) => {
    const activeChannel = currentChannelId === id;
    const classes = cn('nav-link btn-block mb-2 text-left btn', {
      'btn-primary': activeChannel,
      'btn-light': !activeChannel,
    });

    return (
      <li className="nav-item" key={id}>
        <button type="button" className={classes}>
          {name}
        </button>
      </li>
    );
  });

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="ml-auto p-0 btn btn-link">
          +
        </button>
      </div>
      {channels && <ul>{renderChanells()}</ul>}
    </div>
  );
};
