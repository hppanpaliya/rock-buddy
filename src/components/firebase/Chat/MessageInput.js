import React from "react";
import { TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

const MessageInput = ({ selectedUser, messageText, setMessageText, sendMessage }) => {
  
  const [errorMessage, setErrorMessage] = useState("")



  const handleOnClick = () => {
    setErrorMessage("")

    if (!selectedUser) {
      alert("Please select a user to chat with")
      return;
    }
    if (messageText === "") {
      setErrorMessage("Please enter a message")
      return;
    }
    if (messageText.length < 1) {
      setErrorMessage("Please enter a message that is more than 1 character")
      return;
    }
    if (messageText.trim() === "") {
      setErrorMessage("Please enter a message that is not just spaces")
      return;
    }

    if (messageText.length > 1000) {
      setErrorMessage("Please enter a message that is less than 1000 characters")
      return;
    }
    console.log("message", messageText)

    setErrorMessage("")
    sendMessage()

  };




  return (
    <div className="message-input">
      <TextField
      style={{width: "80%"}}
        value={messageText}
        onChange={(event) => setMessageText(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleOnClick();
          }
        }}

        multiline={true}
        error={Boolean(errorMessage)}
        helperText={errorMessage}
        variant="outlined"
        placeholder="Type a message"

      />
      <Button variant="contained" endIcon={<SendIcon />} onClick={handleOnClick}>
        Send
      </Button>
    </div>
  );
};

export default MessageInput;
