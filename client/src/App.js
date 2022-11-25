import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

//components
import Home from './components/home'
import Search from './components/search/Search';
import Error404 from './components/404'
import InfoPage from './components/InfoPage';


function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
       <h1>Rock Buddy</h1>
      </header>
      <div className='App-body'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/search' element={<Search />} />
          <Route path='/info/:category/:id' element={<InfoPage/>}/>
          <Route exact path='*' element={<Error404/>}/>
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
