import React from 'react';

const ShoppingItem = ({ item, onToggle, onDelete }) => {
  return (
    <div className="shopping-item">
      <span
        style={{
          textDecoration: item.resolved ? 'line-through' : 'none',
        }}
      >
        {item.name}
      </span>
      <button onClick={() => onToggle(item.id)}>
        {item.resolved ? 'Unresolve' : 'Resolve'}
      </button>
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </div>
  );
};

export default ShoppingItem;
