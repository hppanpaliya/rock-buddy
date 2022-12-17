import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "./Chat.css";

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const db = firebase.firestore();
      const data = await db.collection("users").get();
      setUsers(data.docs.map((doc) => doc.data()));
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (!selectedUser) return;

    const fetchConversation = async () => {
      const db = firebase.firestore();
      const currentUser = firebase.auth().currentUser.uid;
      const conversationRef = db
        .collection("messages")
        .doc(currentUser < selectedUser.uid ? `${currentUser}_${selectedUser.uid}` : `${selectedUser.uid}_${currentUser}`);
      const conversationSnapshot = await conversationRef.get();
      setConversation((conversationSnapshot.data() && conversationSnapshot.data().messages) || []);
    };

    fetchConversation();
  }, [selectedUser]);

  const sendMessage = async () => {
    if (!messageText) return;

    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const conversationRef = db
      .collection("messages")
      .doc(currentUser.uid < selectedUser.uid ? `${currentUser.uid}_${selectedUser.uid}` : `${selectedUser.uid}_${currentUser.uid}`);
    const conversationSnapshot = await conversationRef.get();
    const newMessages = (conversationSnapshot.data() && conversationSnapshot.data().messages) || [];
    newMessages.push({
      sender: currentUser.uid,
      text: `${currentUser.displayName}: ${messageText}`,
      timestamp: firebase.firestore.Timestamp.now(),
    });
      await conversationRef.set({ messages: newMessages });
    setConversation(newMessages);
    setMessageText("");
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredUsers = users.filter((user) => user.username.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <div className="chat">
      <div className="user-list">
        <input type="text" placeholder="Search users" value={searchText} onChange={handleSearch} />
        {filteredUsers.map((user) => (
          <div key={user.uid} className={`user ${user === selectedUser ? "selected" : ""}`} onClick={() => setSelectedUser(user)}>
            {user.username}
          </div>
        ))}
      </div>
      <div className="conversation">
        {conversation.map((message) => (
          <div key={message.timestamp} className={`message ${message.sender === firebase.auth().currentUser.uid ? "sent" : "received"}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={messageText}
          onChange={(event) => setMessageText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
