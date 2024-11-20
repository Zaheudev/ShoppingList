import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ShoppingListOverview.css';
import axios from 'axios';
import './ShoppingListOverview.css';

const API_BASE_URL = "http://localhost:5000/api";

const ShoppingListOverview = () => {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/shoppingLists`);
        setShoppingLists(response.data);
      } catch (err) {
        setError('Error fetching shopping lists');
      }
    };
    fetchLists();
  }, []);

  return (
    <div className="shopping-list-overview">
      <h2>Shopping Lists</h2>
      {error && <p className="error">{error}</p>}
      <div className="list-grid">
        {shoppingLists.map((list) => (
          <div className="list-tile" key={list._id}>
            <Link to={`/list/${list._id}`}>
              <h3>{list.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingListOverview;
