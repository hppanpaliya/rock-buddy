import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';

const SpotifyAuth = () =>{
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
    return(
        <div>
        {!token ?
            <Button href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                to Spotify</Button>
            : <Button onClick={logout}>Logout of Spotify</Button>}
    
    </div>
    )

}

export default SpotifyAuth