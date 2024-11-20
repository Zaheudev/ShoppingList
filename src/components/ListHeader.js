import React from 'react';

const ListHeader = ({ title, onArchive }) => {
  return (
    <div className="list-header">
      <h2>{title}</h2>
      <button onClick={onArchive}>Archive</button>
    </div>
  );
};

export default ListHeader;
