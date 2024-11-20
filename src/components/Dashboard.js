import React, { useContext, useState } from 'react';
import ShoppingListCard from './ShoppingListCard';
import NotificationPanel from './NotificationPanel';
import AddItemForm from './AddItemForm';
import { ShoppingListContext } from '../context/ShoppingListContext';
import './Dashboard.css';

const Dashboard = () => {
  const { shoppingLists, addShoppingList } = useContext(ShoppingListContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddList = (newList) => {
    addShoppingList(newList);
    closeModal();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Your Shopping Lists</h2>
        <button onClick={openModal}>Add Shopping List</button>
      </div>
      <div className="dashboard-content">
        <div className="shopping-lists">
          {shoppingLists.map((list) => (
            <ShoppingListCard key={list._id} list={list} />
          ))}
        </div>
        <NotificationPanel />
      </div>
      {isModalOpen && (
        <AddItemForm onClose={closeModal} onSubmit={handleAddList} />
      )}
    </div>
  );
};

export default Dashboard;
