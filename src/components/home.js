import React, {useState} from 'react';
import Music from '../img/music2.jpg'
import './home.css'
import { useSelector } from "react-redux";

let bgImage = "https://imageio.forbes.com/blogs-images/markbeech/files/2018/01/Led-Zeppelin-%C2%A9-Neil-Zlozower-Six-Months-Use-Only-Do-Not-Use-After-of-July-24-2018_preview-1200x798.jpeg?format=jpg&width=1200"
const Home = (props) =>{
    const auth = useSelector((state) => state.auth);
    return(
        <div >
        <img width="auto" height="auto" src={Music} alt={"Home Page"}></img>
        <div className="typewriter">
             <h1>Rock Buddy...</h1>   
             
        </div>
        
        </div>
    )

};

export default Home;