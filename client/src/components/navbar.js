import React from 'react';

import Nav from 'react-bootstrap/Nav';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import { useSelector } from "react-redux";


function Navbarcustom() {
    const auth = useSelector((state) => state.auth);
    if(auth.user){
        return(
            <Nav variant="tabs" defaultActiveKey="/">
        <Nav.Item>
            <Nav.Link eventKey="link-1" as={Link} to="/">Home</Nav.Link>
        </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2" as={Link} to="/search">Search</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2" as={Link} to="/events">Events</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-3" as={Link} to="/profile">Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-4" as={Link} to="/signOut">Logout</Nav.Link>
            </Nav.Item>
    </Nav>    
        )
    }

    return(
    <Nav variant="tabs" defaultActiveKey="/">
        <Nav.Item>
            <Nav.Link eventKey="link-1" as={Link} to="/">Home</Nav.Link>
        </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2" as={Link} to="/search">Search</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2" as={Link} to="/events">Events</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-3" as={Link} to="/signup">Signup</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-4" as={Link} to="/signin">Login</Nav.Link>
            </Nav.Item>
    </Nav>
    )
  }

  export default Navbarcustom;