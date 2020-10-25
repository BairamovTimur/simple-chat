import React from 'react';

export default ({ children }) => (
  <div className="col h-100">
    <div className="d-flex flex-column h-100">
      {children}
    </div>
  </div>
);
