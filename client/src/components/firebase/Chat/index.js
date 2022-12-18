// import React, { useState, useEffect } from "react";
// import firebase from "firebase/compat/app";
// import "./Chat.css";
// import UserList from "./UserList";
// import Conversation from "./Conversation";
// import MessageInput from "./MessageInput";
// import {Grid} from "@mui/material"

// const Chat = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [conversation, setConversation] = useState([]);
//   const [messageText, setMessageText] = useState("");
//   const [searchText, setSearchText] = useState("");

//   const fetchUsers = async () => {
//     const db = firebase.firestore();
//     const unsubscribe = db.collection("users").onSnapshot((snapshot) => {
//       setUsers(snapshot.docs.map((doc) => doc.data()));
//     });

//     return () => unsubscribe();
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     const fetchConversation = async () => {
//       const db = firebase.firestore();
//       const currentUser = firebase.auth().currentUser.uid;
//       const conversationRef = db
//         .collection("messages")
//         .doc(currentUser < selectedUser.uid ? `${currentUser}_${selectedUser.uid}` : `${selectedUser.uid}_${currentUser}`);
//       conversationRef.onSnapshot((snapshot) => {
//         setConversation((snapshot.data() && snapshot.data().messages) || []);
//       });
//     };

//     fetchConversation();
//   }, [selectedUser]);

//   const sendMessage = async () => {
//     if (!messageText) return;

//     const db = firebase.firestore();
//     const currentUser = firebase.auth().currentUser;
//     const conversationRef = db
//       .collection("messages")
//       .doc(currentUser.uid < selectedUser.uid ? `${currentUser.uid}_${selectedUser.uid}` : `${selectedUser.uid}_${currentUser.uid}`);
//     const unsubscribe = conversationRef.onSnapshot((snapshot) => {
//       setConversation((snapshot.data() && snapshot.data().messages) || []);
//     });

//     const conversationSnapshot = await conversationRef.get();
//     const newMessages = (conversationSnapshot.data() && conversationSnapshot.data().messages) || [];
//     newMessages.push({
//       sender: currentUser.uid,
//       text: `${currentUser.displayName} ${messageText}`,
//       timestamp: firebase.firestore.Timestamp.now(),
//     });
//     await conversationRef.set({ messages: newMessages });
//     unsubscribe();
//     setMessageText("");
//   };

//   const handleSearch = (event) => {
//     setSearchText(event.target.value);
//   };

//   const filteredUsers = users.filter((user) => user.username.toLowerCase().includes(searchText.toLowerCase()));

//   return (
//     <Grid container>
//       <Grid item xs={3}>
//         <UserList
//           users={filteredUsers}
//           selectedUser={selectedUser}
//           setSelectedUser={setSelectedUser}
//           searchText={searchText}
//           setSearchText={setSearchText}
//           handleSearch={handleSearch}
//         />
//       </Grid>
//       <Grid item xs={9}>
//         <Conversation conversation={conversation} currentUserId={firebase.auth().currentUser.uid} />
//         <MessageInput messageText={messageText} setMessageText={setMessageText} sendMessage={sendMessage} />
//       </Grid>
//     </Grid>
//   );
// };

// export default Chat;

import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "./Chat.css";
import UserList from "./UserList";
import Conversation from "./Conversation";
import MessageInput from "./MessageInput";
import { Grid } from "@mui/material";

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [searchText, setSearchText] = useState("");

  const fetchUsers = async () => {
    const db = firebase.firestore();
    const unsubscribe = db.collection("users").onSnapshot((snapshot) => {
      setUsers(snapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchConversation = async () => {
      const db = firebase.firestore();
      const currentUser = firebase.auth().currentUser.uid;
      const conversationRef = db
        .collection("messages")
        .doc(currentUser < selectedUser.uid ? `${currentUser}_${selectedUser.uid}` : `${selectedUser.uid}_${currentUser}`);
      conversationRef.onSnapshot((snapshot) => {
        setConversation((snapshot.data() && snapshot.data().messages) || []);
      });
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
    const unsubscribe = conversationRef.onSnapshot((snapshot) => {
      setConversation((snapshot.data() && snapshot.data().messages) || []);
    });

    const conversationSnapshot = await conversationRef.get();
    const newMessages = (conversationSnapshot.data() && conversationSnapshot.data().messages) || [];
    newMessages.push({
      sender: currentUser.uid,
      text: `${currentUser.displayName} ${messageText}`,
      timestamp: firebase.firestore.Timestamp.now(),
    });
    await conversationRef.set({ messages: newMessages });
    unsubscribe();
    setMessageText("");
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredUsers = users.filter((user) => user.username.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <Grid container>
      <Grid item xs={3}>
        <UserList
          users={filteredUsers}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          searchText={searchText}
          setSearchText={setSearchText}
          handleSearch={handleSearch}
        />
      </Grid>
      <Grid item xs={9}>
        <Conversation conversation={conversation} currentUserId={firebase.auth().currentUser.uid} />
      </Grid>
      <Grid item xs={9}>
        <MessageInput messageText={messageText} setMessageText={setMessageText} sendMessage={sendMessage} />
      </Grid>
    </Grid>
  );
};

export default Chat;
