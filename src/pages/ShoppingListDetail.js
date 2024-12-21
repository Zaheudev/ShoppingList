import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ShoppingListDetail.css";
import {
  getShoppingList,
  deleteShoppingList,
  addNewItems,
  deleteItem,
  resolveItem,
  inviteMember,
} from "../utils/api";
import ItemField from "../components/ItemField";
import ShoppingItem from "../components/ShoppingItem";
import AddMemberField from "../components/AddMemberField";

const API_BASE_URL = "http://localhost:5000/api";

const ShoppingListDetail = () => {
  const { listId } = useParams();
  const [shoppingList, setShoppingList] = useState(null);
  const [error, setError] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [openItemForm, setOpenItemForm] = useState(false);
  const [openMembersForm, setOpenMembersForm] = useState(false);
  const [items, setItems] = useState([{ name: null, date: null }]);
  const [members, setMembers] = useState([null]);

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

  const addNewMember = () => {
    members.push(null);
    setMembers([...members]);
  };

  const removeNewMember = (e) => {
    members[e.target.id] = -1;
    setMembers([...members]);
  };

  const updateNewMember = (e) => {
    // target[0] it's "name" or "date"
    //target[1] it's any index from 0 to count.length-1;
    let target = e.target.id;
    members[target] = e.target.value;
    setMembers([...members]);
  };

  const toggle = async (e) => {
    try {
      const response = await resolveItem(listId, e);
      fetchList();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteItemBtn = async (e) => {
    try {
      const response = await deleteItem(listId, e);
      fetchList();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitItems = async (e) => {
    e.preventDefault();
    console.log(items);
    try {
      items
        .filter((e) => e !== -1)
        .forEach(async (item) => {
          const response = await addNewItems(listId, item);
          console.log(response);
          fetchList();
        });
    } catch (err) {
      setError(err.message || "Error creating new items.");
    }
    setOpenItemForm(false);
  };

  const handleSubmitMembers = async (e) => {
    e.preventDefault();
    console.log(members);
    try {
      members
        .filter((e) => e !== -1)
        .forEach(async (member) => {
          const response = await inviteMember(listId, member);
          console.log(response);
        });
    } catch (err) {
      setError(err.message || "Error inviting new members.");
    }
    setOpenMembersForm(false);
  };

  if (error) return <p className="error">{error}</p>;
  if (deleted) return <p>Shopping List deleted!</p>;
  if (!shoppingList) return <p>Loading...</p>;

  return (
    <div className="shopping-list-detail">
      <h1>{shoppingList.title}</h1>
      <ul>
        {shoppingList.items.map((item) => (
          <ShoppingItem
            item={item}
            key={item._id}
            onToggle={toggle}
            onDelete={deleteItemBtn}
          />
        ))}
      </ul>
      <button onClick={deleteList}>Delete List</button>
      <button onClick={() => setOpenItemForm(true)}>Add New Items</button>
      <button onClick={() => setOpenMembersForm(true)}>Invite Members</button>
      {openItemForm && (
        <form onSubmit={handleSubmitItems}>
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
          <button type="button" onClick={() => setOpenItemForm(false)}>
            Cancel
          </button>
        </form>
      )}

      {openMembersForm && (
        <form onSubmit={handleSubmitMembers}>
          <h2>
            Add Member{" "}
            <button type="button" onClick={addNewMember}>
              +
            </button>
          </h2>
          {members.map((val, index) => {
            if (val !== -1) {
              return (
                <AddMemberField
                  key={index}
                  remove={removeNewMember}
                  id={index}
                  update={updateNewMember}
                />
              );
            }
          })}
          <button type="submit">Update</button>
          <button type="button" onClick={() => setOpenMembersForm(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default ShoppingListDetail;
