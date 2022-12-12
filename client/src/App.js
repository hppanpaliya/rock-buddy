import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

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
import { logout } from "./store/features/auth/";
import InfoPage from './components/info/InfoPage';
import AllEvents from './components/tmEvents/Events';


function App() {

    // const auth = useSelector((state) => state.auth);

    // useEffect(() => {
    //   console.log("App.js");
    //   const f = async () => {
    //     firebaseApp.auth().onAuthStateChanged(async (user) => {
    //       if (auth.user && !auth.loading) {
    //         return await refresh(user.displayName, user.email);
    //       }
    //       if (!user && !authenticated) {
    //         dispatch(logout());
    //       }
    //     });
    //     await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    //   };
    //   f();
    // }, []);

    const CLIENT_ID = "c427fff192174d81a2004d4d9f006507"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")

    useEffect(() => {
      const hash = window.location.hash
      let token = window.localStorage.getItem("token")

      if (!token && hash) {
          token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

          window.location.hash = ""
          window.localStorage.setItem("token", token)
      }

      setToken(token)

  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
}



  return (
    <Router>
    <div className="App">
      <header className="App-header">
       <h1>Rock Buddy</h1>
                {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    : <button onClick={logout}>Logout</button>}
      </header>
      <Navbarcustom></Navbarcustom>
      <div className='App-body'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/search' element={<Search />} />
          <Route path='/info/:category/:id' element={<InfoPage/>}/>
          <Route path='/events' element={<AllEvents/>}/>

          <Route path="/" element={<PrivateRoute/>}>
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
