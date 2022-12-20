import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useSelector } from "react-redux";
import SignIn from '../firebase/SignIn'
import { Link } from 'react-router-dom';
import { 
	Box,
	Card,
	CardHeader,
	CardContent,
	CardMedia,
	Typography,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	ImageList,
	ImageListItem,
	ImageListItemBar,
	Grid,
	Stack,
	Chip
} from '@mui/material';

const SpotifyAuth = () =>{
    const CLIENT_ID = "c427fff192174d81a2004d4d9f006507"
    const REDIRECT_URI = "http://localhost:3000/spotify"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")
    const [playlists, setPlayLists] = useState([])
    const auth = useSelector((state) => state.auth || null);

    useEffect(() => {
        const hash = window.location.hash
        let token = window.sessionStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
            
            window.location.hash = ""
            window.sessionStorage.setItem("token", token)
        }
        console.log(token);
        setToken(token)
    }, [])

    

    const logout = () => {
        setToken("")
        window.sessionStorage.removeItem("token")
    }



    return (
        <Box>
            {auth.user === null ? <SignIn></SignIn> : !(token) ? <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-read-private%20playlist-modify-public%20playlist-modify-private`}>Login to Spotify</a> : <Button onClick={logout}>Logout of Spotify</Button> }       
            {token ?
                    <Link to="/profile">Go to profile</Link>
                    : <h2>Please login</h2>
                }
        </Box>
    );

}

export default SpotifyAuth