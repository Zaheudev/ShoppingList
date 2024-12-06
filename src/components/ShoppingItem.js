import React from 'react';

const ShoppingItem = ({ item, onToggle, onDelete}) => {
  return (
    <li className="shopping-item">
      <span
        style={{
          textDecoration: item.resolved ? 'line-through' : 'none',
        }}
      >
        {item.name}
      </span>
      <button onClick={() => onToggle(item._id)}>
        {item.resolved ? 'Unresolve' : 'Resolve'}
      </button>
      <button onClick={() => onDelete(item._id)}>Delete</button>
    </li>
  );
};

export default ShoppingItem;
