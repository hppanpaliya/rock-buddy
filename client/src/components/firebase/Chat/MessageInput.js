import React from "react";
import { TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const MessageInput = ({ messageText, setMessageText, sendMessage }) => {
  return (
    <div className="message-input">
      <TextField
      style={{width: "40%"}}
        value={messageText}
        onChange={(event) => setMessageText(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            sendMessage();
          }
        }}
      />
      <Button variant="contained" endIcon={<SendIcon />} onClick={sendMessage}>
        Send
      </Button>
    </div>
  );
};

export default MessageInput;
