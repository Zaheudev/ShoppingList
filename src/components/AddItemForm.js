import React, { useState } from "react";

const AddItemForm = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, tags: tags.split(",").map((tag) => tag.trim()) });
    onClose();
  };

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
      </form>
    </div>
  );
};

export default AddItemForm;
