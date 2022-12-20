import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import { useSelector } from "react-redux";

import SignIn from "../firebase/SignIn";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setToken as setBearerToken,
  deleteToken,
} from "../../store/features/auth/spotifySlice";
import { login } from "./../../store/features/auth/authSlice";
import { Box, Card } from "@mui/material";
import { Modal, Typography } from "@mui/material";
import { CardContent } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from "@mui/icons-material/Close";
import { setTrackID } from "../../store/features/auth/playerSlice";

const SpotifyAuth = () => {
  const CLIENT_ID = "c427fff192174d81a2004d4d9f006507";
  const REDIRECT_URI = "http://localhost:3000/spotify";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const dispatch = useDispatch();

  const [token, setToken] = useState("");
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const auth = useSelector((state) => state.auth || null);
  const [open, setOpen] = useState(false);

    useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      dispatch(setBearerToken({ token: token }));
      window.localStorage.setItem("token", token);
    }
    // console.log(token);
    setToken(token);

    async function getRecentlyPlayedTracks() {
      try {
        const { data } = await axios.get(
          "https://api.spotify.com/v1/me/player/recently-played",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("In recently played");
        console.log(data);
        setRecentlyPlayed(data.items);
      } catch (error) {
        console.error(error);
      }
    }
    if (token) {
      getRecentlyPlayedTracks();
    }
  }, []);

  const logout = () => {
    setToken("");
    dispatch(deleteToken());
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("spotifyUri");
  };

  const renderSpotifyLogin = () => {
    return (
      <div>
        <Box sx={{ maxWidth: "75%", marginLeft: "auto", marginRight: "auto" }}>
          <Typography gutterBottom variant="p" component="div">
            <br />
            <br />
            <h2>
              {" "}
              Please login to your spotify account to start adding your favorite
              tracks and access your playlists{" "}
            </h2>
          </Typography>
          <a
            className="btn btn-success btn-lg"
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-read-private%20playlist-modify-public%20playlist-modify-private%20user-read-recently-played`}
          >
            Login to Spotify
          </a>
        </Box>
      </div>
    );
  };

  const renderSpotifyLogout = () => {
    //console.log("Cnt",recentlyPlayed.length);
    return (
      <div>
        {/* <Button onClick={getRecentlyPlayedTracks}>Recently Played Songs</Button> */}
        <Button onClick={logout}>Logout of Spotify</Button>
        <RenderRecentlyPlayedTracks></RenderRecentlyPlayedTracks>
      </div>
    );
  };


  const setPlayerTrack = (uri) => {
    console.log("Clicked Play");
    const hash = window.location.hash;
    let spotifyUri = window.localStorage.getItem("spotifyUri");
    if (spotifyUri !== uri) {
      window.location.hash = "";
      dispatch(setTrackID(spotifyUri));
      window.localStorage.setItem("spotifyUri", uri);
      setOpen(false);
    }
    //setPlayerTrack(uri);
  };

  const RenderRecentlyPlayedTracks = () => {
    console.log("in rendering recent tracks", recentlyPlayed);
    return (
      <div>
        <h2>Recently Played Tracks</h2>
        <div>
          {recentlyPlayed.length > 0 &&
            recentlyPlayed.map((item) => {
              console.log(item);
              return (
                <div key={item.track.id}>
                  <Card
                    sx={{
                      maxWidth: "100%",
                      marginLeft: "15%",
                      marginRight: "15%",
                      verticalAlign: "top",
                      minHeight: "10vh",
                    }}
                  >
                    <Box
                      sx={{
                        maxWidth: "800%",
                        marginLeft: "10",
                        marginRight: "10",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        verticalAlign: "top",
                      }}
                    >
                      <CardContent
                        sx={{ flex: "1 0 auto", justifyContent: "left" }}
                      >
                        <Typography component="div" variant="h5">
                          {item.track.name}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          {item.track.artists.length > 1
                            ? "Various Artists"
                            : item.track.artists[0].name}
                        </Typography>
                      </CardContent>
                      <Box
                        sx={{
                          maxWidth: "50%",
                          marginLeft: "auto",
                          marginRight: "5%",
                        }}
                      >
                        <IconButton
                          aria-label="play/pause"
                          onClick={() => setPlayerTrack(item.track.uri)}
                          variant="contained"
                        >
                          <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                        </IconButton>
                      </Box>
                    </Box>
                  </Card>
                  <br />
                </div>
              );
            })}
        </div>
      </div>
    );
  };

  return (
    <div>
      <Box>
      {token ? (
          <Button to="/profile">Go to profile</Button>
        ) : (
          <h2>Please login</h2>
        )}
        {auth.user === null ? (
          <SignIn></SignIn>
        ) : !token ? (
          renderSpotifyLogin()
        ) : (
          renderSpotifyLogout()
        )}
      </Box>
    </div>
  );
};

export default SpotifyAuth;
