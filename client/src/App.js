import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

//components
import Home from './components/home'
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
import { logout } from "./store/features/auth/";

function App() {

    const auth = useSelector((state) => state.auth);

    useEffect(() => {
      console.log("App.js");
      const f = async () => {
        firebaseApp.auth().onAuthStateChanged(async (user) => {
          if (auth.user && !auth.loading) {
            return await refresh(user.displayName, user.email);
          }
          if (!user && !authenticated) {
            dispatch(logout());
          }
        });
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
      };
      f();
    }, []);



  return (
    <Router>
      <div className="App">
        {/* <header className="App-header">
          <h1>Rock Buddy</h1>
        </header> */}
        <nav style={{ display: "inline" }}>
          <ul style={{ display: "inline", listStyleType: "none" }}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/signout">Sign Out</Link>
            </li>
            <li>
              <Link to="/changepassword">Change Password</Link>
            </li>
            <li>
              <Link to="/chat">Chat</Link>
            </li>
          </ul>
        </nav>
        <div className="App-body">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route exact path="/search" element={<Search />} />
              <Route exact path="/changePassword" element={<ChangePassword />} />
              <Route exact path="/chat" element={<Chat />} />
            </Route>
            <Route exact path="/signIn" element={<SignIn />} />
            <Route exact path="/signOut" element={<SignOut />} />
            <Route exact path="/signUp" element={<SignUp />} />
            <Route exact path="*" element={<Error404 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
