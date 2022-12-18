import React from "react";
import { Link } from "react-router-dom";
import { Box, List, ListItem, ListItemText } from "@mui/material";

const Conversation = ({ conversation, currentUserId }) => {
  return (
    <List>
      {conversation.map((message) => (
        <ListItem key={message.timestamp}>
          <ListItemText
            primary={
              <Box
                sx={{
                  borderRadius: "16px",
                  backgroundColor: message.sender === currentUserId ? "#1982FC" : "#d3d3d3",
                  padding: "8px",
                  color: message.sender === currentUserId ? "#fff" : "#000",
                }}
              >
                {message.text}
                <br />
                {message.link ? <Link to={message.link} style={{color: "#000"}} >{message.link}</Link> : null}
              </Box>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default Conversation;
