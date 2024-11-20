import React, { createContext, useState, useEffect } from 'react';
import { getShoppingLists } from '../utils/api'; // Correct function imported here

export const ShoppingListContext = createContext();

export const ShoppingListProvider = ({ children }) => {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const lists = await getShoppingLists(); // Using the correct function
        setShoppingLists(lists);
      } catch (err) {
        setError(err.message || 'Error fetching shopping lists.');
      }
    };
    fetchLists();
  }, []);

  return (
    <ShoppingListContext.Provider value={{ shoppingLists, setShoppingLists, error }}>
      {children}
    </ShoppingListContext.Provider>
  );
};
