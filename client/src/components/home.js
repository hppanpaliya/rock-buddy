import React, {useState} from 'react';
import Music from '../img/music2.jpg'
import './home.css'

const Home = (props) =>{
    return(
        <div >
        <img width="auto" height="auto" src={Music} alt={"Home Page"}></img>
        <div class="typewriter">
             <h1>Rock Buddy...</h1>    
        </div>
        </div>
    )
    
};

export default Home;