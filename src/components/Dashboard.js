import React, { useContext, useEffect, useState } from "react";
import ShoppingListCard from "./ShoppingListCard";
import NotificationPanel from "./NotificationPanel";
import AddItemForm from "./AddItemForm";
import { ShoppingListContext } from "../context/ShoppingListContext";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const context = useContext(ShoppingListContext);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  let list = context.shoppingLists;
  let addShoppingList = context.addList;
  let fetch = context.fetchLists;

  useEffect(() => {
    fetch().then((err) => {
      if (err === 401) {
        navigate('/');
      }
    });
  }, []);

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
          {list.map((list) => (
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
