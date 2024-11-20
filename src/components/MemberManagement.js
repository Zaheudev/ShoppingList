import React from 'react';

const MemberManagement = ({ members, onAdd, onRemove }) => {
  return (
    <div className="member-management">
      <h3>Members</h3>
      <ul>
        {members.map((member) => (
          <li key={member.id}>
            {member.name} <button onClick={() => onRemove(member.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const email = e.target.elements.email.value.trim();
          if (email) {
            onAdd(email);
            e.target.elements.email.value = '';
          }
        }}
      >
        <input type="email" name="email" placeholder="Add member by email" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default MemberManagement;
