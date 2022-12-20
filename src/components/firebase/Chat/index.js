import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "./Chat.css";
import UserList from "./UserList";
import Conversation from "./Conversation";
import MessageInput from "./MessageInput";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
const drawerWidth = 240;

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [searchText, setSearchText] = useState("");

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

  useEffect(() => {
    const fetchConversation = async () => {
      const db = firebase.firestore();
      const currentUser = firebase.auth().currentUser.uid;
      if (!selectedUser) return;
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
      text: `${currentUser.displayName}: ${messageText}`,
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
          <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Chat
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <UserList
            users={filteredUsers}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            searchText={searchText}
            setSearchText={setSearchText}
            handleSearch={handleSearch}
          />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Box sx={{
    flexGrow: 1,
    bgcolor: 'background.default',
    p: 3,
    height: '60%',
    overflow: 'scroll'
  }}>
        <Conversation conversation={conversation} currentUserId={firebase.auth().currentUser.uid} />
        </Box>
        <MessageInput selectedUser={selectedUser} messageText={messageText} setMessageText={setMessageText} sendMessage={sendMessage} />
      </Box>
    </Box>

  );
};

export default Chat;
