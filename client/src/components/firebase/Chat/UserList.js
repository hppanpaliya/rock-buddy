import React from "react";
import { TextField, List, ListItemText, ListItemButton } from "@mui/material";
import { useState } from "react";

const UserList = ({ users, selectedUser, setSelectedUser, searchText, handleSearch }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseEnter = (user) => {
    setHoveredItem(user);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const filteredUsers = users.filter((user) => user.username.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <div className="user-list">
      <TextField label="Search users" value={searchText} onChange={handleSearch} />
      <List>
        {filteredUsers.map((user) => (
          <ListItemButton
            key={user.uid}
            selected={user === hoveredItem || user === selectedUser}
            onClick={() => setSelectedUser(user)}
            onMouseEnter={() => handleMouseEnter(user)}
            onMouseLeave={handleMouseLeave}
          >
            {user.photoURL && (
              <img src={user.photoURL} alt={`${user.username} profile picture`} width={32} height={32} />
            )}
            <ListItemText primary={user.username} />
          </ListItemButton>
        ))}
      </List>
    </div>
  );
};

export default UserList;
