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
                  backgroundColor: message.sender === currentUserId ? "#1924fc" : "#d3d3d3",
                  padding: "8px",
                  color: message.sender === currentUserId ? "#fff" : "#000",
                  wordWrap: "break-word",
                  wordBreak: "break-all",
                }}
              >
                {message.text}
                <br />
                {message.link ? (
                  <Link to={message.link} style={{ color: message.sender === currentUserId ? "#FFF" : "#000" }}>
                    {message.link}
                  </Link>
                ) : null}
              </Box>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default Conversation;
