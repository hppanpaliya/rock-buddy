import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useSelector } from "react-redux";
import SignIn from '../firebase/SignIn'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken as setBearerToken, deleteToken } from "../../store/features/auth/spotifySlice";
import { Box,} from '@mui/material';

const SpotifyAuth = () =>{
    const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
    const REDIRECT_URI = "http://rock-buddy.vercel.app/spotify"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const dispatch = useDispatch();

    const [token, setToken] = useState("")
    const [playlists, setPlayLists] = useState([])
    const auth = useSelector((state) => state.auth || null);

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            dispatch(setBearerToken({ token : token}))
            window.localStorage.setItem("token", token)
        }
        // console.log(token);
        setToken(token)
    }, [])

    const logout = () => {
        setToken("")
        dispatch(deleteToken())
        window.localStorage.removeItem("token")
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