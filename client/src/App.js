import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

//components
import Home from './components/home'
import Navbarcustom from './components/navbar';
import Search from './components/search/Search';
import Error404 from './components/404'
import SignIn from "./components/firebase/SignIn";
import SignOut from "./components/firebase/SignOut";
import SignUp from "./components/firebase/SignUp";
import ChangePassword from "./components/firebase/ChangePassword";
import PrivateRoute from "./components/firebase/PrivateRoute";
import Chat from "./components/firebase/Chat";
import firebaseApp from './components/firebase/Firebase';
import { useSelector } from 'react-redux';
import { login,logout } from "./store/features/auth/";
import InfoPage from './components/info/InfoPage';
import AllEvents from './components/tmEvents/Events';
import Profile from './components/profile/profile';
import EventSearch from './components/tmEvents/EventSearch';
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";


function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  useEffect(() => {

    const Fireauth = getAuth();
    console.log("App.js");
    console.log({auth});
    
    if (auth && !auth.user && auth.loading) {
      dispatch(logout());
    }

    
    firebaseApp.auth().onAuthStateChanged(async (user) => {
      console.log("onAuthStateChanged");
      if (user && user._delegate && user._delegate.auth.currentUser) {
        console.log("reload user");
        dispatch(
          login({
            uid: user._delegate.auth.currentUser.uid,
            email: user._delegate.auth.currentUser.email,
            username: user._delegate.auth.currentUserdisplayName,
          })
        );
      }
    });
    

  }, []);


  return (
    <Router>
      <div className="App">
        <Navbarcustom></Navbarcustom>
        <div className='App-body'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/search' element={<Search />} />
            <Route path='/info/:category/:id' element={<InfoPage/>}/>
            <Route path='/events' element={<AllEvents/>}/>
            <Route path='/events/search' element={<EventSearch/>}/>

            <Route path="/" element={<PrivateRoute/>}>
              <Route path='/profile' element={<Profile/>}/>
              <Route exact path="/changePassword" element={<ChangePassword />} />
              <Route exact path="/chat" element={<Chat />} />
            </Route>

            <Route exact path="/signIn" element={<SignIn />} />
            <Route exact path="/signOut" element={<SignOut />} />
            <Route exact path="/signUp" element={<SignUp />} />
            <Route exact path='*' element={<Error404/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
