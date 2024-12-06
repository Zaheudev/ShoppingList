import React, { createContext, useState } from 'react';
import { getShoppingLists, createShoppingList } from '../utils/api'; // Correct function imported here

export const ShoppingListContext = createContext();

export const ShoppingListProvider = ({ children }) => {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [error, setError] = useState(null);

  const fetchLists = async () => {
    try {
      const lists = await getShoppingLists(); // Using the correct function
      setShoppingLists(lists);
    } catch (err) {
      setError(err.message || 'Error fetching shopping lists.');
      return err.status;
    }
  };

  // useEffect(() => {
  //   fetchLists();
  // }, []);

  const addList = async (data) => {
    try{
      const response = await createShoppingList(data);
      fetchLists();
      console.log(response);
    }catch(err){
      setError(err.message || 'Error creating shopping list.');
    }
  }

  return (
    <ShoppingListContext.Provider value={{ shoppingLists, addList, fetchLists, error }}>
      {children}
    </ShoppingListContext.Provider>
  );
};