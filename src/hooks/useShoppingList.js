import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Update this to match your backend URL

const useShoppingList = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch shopping lists
  const fetchLists = async (filterArchived = false) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/shoppingLists`, {
        params: { archived: filterArchived },
      });
      setLists(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new shopping list
  const addList = async (newList) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/shoppingLists`, newList);
      setLists((prev) => [...prev, response.data]);
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete a shopping list
  const deleteList = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/shoppingLists/${id}`);
      setLists((prev) => prev.filter((list) => list._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Update shopping list status
  const updateListStatus = async (id, updatedFields) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/shoppingLists/${id}`, updatedFields);
      setLists((prev) =>
        prev.map((list) => (list._id === id ? response.data : list))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchLists(); // Fetch lists on component mount
  }, []);

  return {
    lists,
    loading,
    error,
    fetchLists,
    addList,
    deleteList,
    updateListStatus,
  };
};

export default useShoppingList;
