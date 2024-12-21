import React, { useState } from "react";
import ItemField from "./ItemField";
import AddMemberField from "./AddMemberField";

const AddItemForm = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [items, setItems] = useState([{ name: null, date: null }]);
  const [members, setMembers] = useState([null]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      tags: tags.split(",").map((tag) => tag.trim()),
      items: items.filter((e) => e !== -1),
      members: members.filter((e) => e !== -1),
    });
    onClose();
  };

  //to do link items to specific list in their structure

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
    let target = e.target.id;
    members[target] = e.target.value;
    setMembers([...members]);
  };

  console.log(members);

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h2>Add New Shopping List</h2>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Tags (comma-separated):
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </label>
        <button type="submit">Add</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
        <div>
          <h3>
            Add Item{" "}
            <button type="button" onClick={addNewItem}>
              +
            </button>
          </h3>
          {/* {Array.from(Array(count)).map(() => {
            return <ItemField key={Math.random()*999}/>;
          })} */}
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
          <h3>
            Add Member{" "}
            <button type="button" onClick={addNewMember}>
              +
            </button>
          </h3>
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
        </div>
      </form>
    </div>
  );
};

export default AddItemForm;
