import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ShoppingListDetail.css';
import axios from 'axios';
import './ShoppingListDetail.css';
import { getShoppingList } from '../utils/api'; 

const API_BASE_URL = "http://localhost:5000/api";

const ShoppingListDetail = () => {
  const { listId } = useParams();
  const [shoppingList, setShoppingList] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await getShoppingList(listId);
        setShoppingList(response[0]);
      } catch (err) {
        setError('Error fetching shopping list details');
      }
    };
    fetchList();
  }, [listId]);

  if (error) return <p className="error">{error}</p>;
  if (!shoppingList) return <p>Loading...</p>;

  console.log(shoppingList);

  return (
    <div className="shopping-list-detail">
      <h1>{shoppingList.title}</h1>
      <ul>
        {shoppingList.items.map((item) => (
          <li key={item._id}>
            {item.name} - {item.resolved ? 'Resolved' : 'Unresolved'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingListDetail;
