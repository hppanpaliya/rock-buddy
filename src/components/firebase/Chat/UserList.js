import React from "react";
import { TextField, ListItemText, ListItemButton, Toolbar } from "@mui/material";
import { useState } from "react";
import Card from "react-bootstrap/Card";

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
        <Toolbar /> 
      <TextField value={searchText} onChange={handleSearch} />
      <br /><br />
      <Card>
        {filteredUsers.map((user) => (
          <ListItemButton
            key={user.uid}
            selected={user === hoveredItem || user === selectedUser}
            onClick={() => setSelectedUser(user)}
            onMouseEnter={() => handleMouseEnter(user)}
            onMouseLeave={handleMouseLeave}
            style={{ wordWrap: "break-word",
            wordBreak: "break-all", }} 
          >
            {user.photoURL && <img src={user.photoURL} alt={`${user.username} profile picture`} width={64} height={64} />} &nbsp;
            <ListItemText primary={user.username} />
          </ListItemButton>
        ))}
      </Card>
    </div>
  );
};

export default UserList;
