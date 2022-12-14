import React from 'react';

import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import { useSelector } from "react-redux";


function Navbarcustom() {
    const auth = useSelector((state) => state.auth || null);

    if(auth && auth.user){
        return(
            <Nav variant="tabs" defaultActiveKey="/">
        <Nav.Item>
            <Nav.Link eventKey="link-1" as={Link} to="/">Home</Nav.Link>
        </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2" as={Link} to="/search">Search</Nav.Link>
            </Nav.Item>

            <NavDropdown title="Live Rock Events" id="basic-nav-dropdown">
                <Nav.Item>
                    <Nav.Link eventKey="link-3" as={Link} to="/events">All Events</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-4" as={Link} to="/events/search">Search Events</Nav.Link>
                </Nav.Item>
            </NavDropdown>
            
            <Nav.Item>
                <Nav.Link eventKey="link-5" as={Link} to="/profile">Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-6" as={Link} to="/signOut">Logout</Nav.Link>
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

            <NavDropdown title="Live Rock Events" id="basic-nav-dropdown">
                <Nav.Item>
                    <Nav.Link eventKey="link-3" as={Link} to="/events">All Events</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-4" as={Link} to="/events/search">Search Events</Nav.Link>
                </Nav.Item>
            </NavDropdown>

            <Nav.Item>
                <Nav.Link eventKey="link-5" as={Link} to="/signup">Signup</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-6" as={Link} to="/signin">Login</Nav.Link>
            </Nav.Item>
    </Nav>
    )
  }

  export default Navbarcustom;