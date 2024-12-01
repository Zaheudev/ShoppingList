import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ShoppingListDetail.css";
import { getShoppingList, deleteShoppingList, addNewItems } from "../utils/api";
import ItemField from "../components/ItemField";

const API_BASE_URL = "http://localhost:5000/api";

const ShoppingListDetail = () => {
  const { listId } = useParams();
  const [shoppingList, setShoppingList] = useState(null);
  const [error, setError] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [items, setItems] = useState([{ name: null, date: null }]);

  const fetchList = async () => {
    try {
      const response = await getShoppingList(listId);
      setShoppingList(response[0]);
    } catch (err) {
      setError("Error fetching shopping list details");
    }
  };

  useEffect(() => {
    fetchList();
  }, [listId]);

  const deleteList = async () => {
    try {
      const response = await deleteShoppingList(listId);
      setDeleted(true);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const addNewItem = () => {
    items.push({ name: null, date: null });
    setItems([...items]);
  };

  const removeNewItem = (e) => {
    items[e.target.id] = -1;
    setItems([...items]);
  };

  const updateNewItems = (e) => {
    // target[0] it's "name" or "date"
    //target[1] it's any index from 0 to count.length-1;
    let target = e.target.id.split(`#`);
    if (target[0] === "name") {
      items[target[1]].name = e.target.value;
    } else {
      items[target[1]].date = e.target.value;
    }
    setItems([...items]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(items);
    try {
      items
        .filter((e) => e !== -1)
        .forEach(async (item) => {
          const response = await addNewItems(listId, item);
          console.log(response);
        });
    } catch (err) {
      setError(err.message || "Error creating new items.");
    }
    fetchList();
    setOpenForm(false);
  };

  if (error) return <p className="error">{error}</p>;
  if (deleted) return <p>Shopping List deleted!</p>;
  if (!shoppingList) return <p>Loading...</p>;

  return (
    <div className="shopping-list-detail">
      <h1>{shoppingList.title}</h1>
      <ul>
        {shoppingList.items.map((item) => (
          <li key={item._id}>
            {item.name} - {item.resolved ? "Resolved" : "Unresolved"}
          </li>
        ))}
      </ul>
      <button onClick={deleteList}>Delete List</button>
      <button onClick={() => setOpenForm(true)}>Add New Items</button>
      {openForm && (
        <form onSubmit={handleSubmit}>
          <h2>
            Add Item{" "}
            <button type="button" onClick={addNewItem}>
              +
            </button>
          </h2>
          {items.map((val, index) => {
            if (val !== -1) {
              return (
                <ItemField
                  key={index}
                  remove={removeNewItem}
                  id={index}
                  update={updateNewItems}
                />
              );
            }
          })}
          <button type="submit">Update</button>
          <button type="button" onClick={() => setOpenForm(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default ShoppingListDetail;
