import React, { useState, useEffect } from "react";
import { TextField, List, ListItemButton, ListItemText, Button, Modal } from "@mui/material";
import firebase from "firebase/compat/app";

function SendLinkMessage() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState(`Check this out! `);
  const currentUser = firebase.auth().currentUser;

  // Fetch the list of users from the database
  const fetchUsers = async () => {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser.uid;
    const unsubscribe = db.collection("users").onSnapshot((snapshot) => {
      const users = snapshot.docs.map((doc) => doc.data());
      // Create a new array of objects with all fields except for the email field
      const filteredUsers = users.map((user) => {
        const { email, ...rest } = user;
        return rest;
      });
      // Filter out the current user from the list
      const updatedUsers = filteredUsers.filter((user) => user.uid !== currentUser);
      setUsers(updatedUsers);
    });
    return () => unsubscribe();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter the list of users based on the search text
  const filteredUsers = users.filter((user) => user.username.includes(searchText));

  // Handle the search input change
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  // Open the modal
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const sendMessage = async () => {
    const db = firebase.firestore();
    console.log(selectedUser);
    const conversationRef = db
      .collection("messages")
      .doc(currentUser.uid < selectedUser.uid ? `${currentUser.uid}_${selectedUser.uid}` : `${selectedUser.uid}_${currentUser.uid}`);

    const conversationSnapshot = await conversationRef.get();
    const newMessages = (conversationSnapshot.data() && conversationSnapshot.data().messages) || [];
    newMessages.push({
      sender: currentUser.uid,
      text: message,
      link: window.location.pathname,
      timestamp: firebase.firestore.Timestamp.now(),
    });
    await conversationRef.set({ messages: newMessages });
    handleCloseModal();
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpenModal}>
        Send link
      </Button>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <div
          className="modal-content"
          style={{
            width: "500px",
            maxHeight: "500px",
            overflowY: "auto",
            margin: "0 auto",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#f2f2f2",
          }}
        >
          <TextField label="Search users" value={searchText} onChange={handleSearch} />
          <List>
            {filteredUsers.map((user) => (
              <ListItemButton
                selected={user === selectedUser}
                onClick={() => {
                  setSelectedUser(user);
                }}
                key={user.uid}
              >
                <ListItemText primary={user.username} />
              </ListItemButton>
            ))}
          </List>
          <TextField label="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
          <Button onClick={sendMessage}>Send Message</Button>
          <Button onClick={handleCloseModal}>Cancel</Button>
        </div>
      </Modal>
    </>
  );
}

export default SendLinkMessage;
