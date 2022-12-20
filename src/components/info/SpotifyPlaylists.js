import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import { useSelector } from "react-redux";
import SignIn from "../firebase/SignIn";
import Card from "@mui/material/Card";
import { CardMedia, Typography } from "@mui/material";
import { CardContent } from "@mui/material";
import { Box } from "@mui/system";
import rock from "../rock.png";
import Player from "./Player";

const SpotifyPlayLists = () => {
  const [playlists, setPlayLists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const auth = useSelector((state) => state.auth || null);
  let token = window.sessionStorage.getItem("token");

  useEffect(() => {
    async function handleToken() {
      const { data } = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {},
        }
      );
      //console.log(data.items.images);
      console.log(data);
      setPlayLists(data.items);
    }
    if (token) {
      handleToken();
    }
  }, [token]);

  async function playlistItems(id) {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/playlists/${id}/tracks`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    //console.log(data.items);
    setTracks(data.items);
  }

  // const buildPlaylist = (playlistItems) => {
  //   return (
  //     <Box sx={{ marginLeft: "25%", marginRight: "25%" }}>
  //       {playlistItems.map((item) => {
  //         <Card sx={{ maxWidth: 700 }} align="center">
  //           <CardContent>
  //             <Typography gutterBottom variant="h5" component="div">
  //               <code> Playlist Name: {item.name}</code>
  //             </Typography>
  //           </CardContent>
  //           <br />
  //           <br />
  //         </Card>;
  //       })}
  //     </Box>
  //   );
  // };

  const buildPlaylistCard = (playlist) => {
    return (
      <div key={playlist.id}>
        <Card sx={{ maxWidth: 700 }} align="center">
          <CardMedia
            component={"img"}
            alt={"an image from Unsplash"}
            image={playlist.images.length !== 0 ? playlist.images[0].url : rock}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <code> Playlist Name: {playlist.name}</code>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <code>
                {playlist.description.length > 100
                  ? playlist.description.substring(0, 100) + "..."
                  : playlist.description}
              </code>
            </Typography>
          </CardContent>
          <Box mx="auto">
            {playlist.tracks.total !== 0 ? (
              <Button
                onClick={() => playlistItems(playlist.id)}
                variant="contained"
              >
                <code>Open Playlist</code>
              </Button>
            ) : (
              <p>No tracks in the playlist</p>
            )}
          </Box>
          <br />
          <br />
        </Card>
        <br />
      </div>
    );
  };

  const setPlayerTrack = (uri) => {
    console.log("In player");
    const hash = window.location.hash;
    let spotifyUri = window.sessionStorage.getItem("spotifyUri");
    if(spotifyUri !== uri){
      window.location.hash = ""
      window.sessionStorage.setItem("spotifyUri", uri)
    }
  };

  if (!(tracks.length > 0)) {
    return (
      <Box sx={{ marginLeft: "25%", marginRight: "25%" }}>
        {playlists && playlists.map((playlist) => buildPlaylistCard(playlist))}
      </Box>
    );
  } else {
    console.log("Tracks already");
    return (
      <div>
        <Box sx={{ marginLeft: "25%", marginRight: "25%" }}>
          {tracks.map((item) => {
            console.log(item);
            return (
              <Card key={item.track.uri} sx={{ maxWidth: 700 }} align="center">
                <CardContent>
                  <Typography gutterBottom variant="p" component="div">
                    <code> Track Name: {item.track.name}</code>
                    <br/>
                    <code> Track Uri: {item.track.uri}</code>
                  </Typography>
                  <Button
                    onClick={() => setPlayerTrack(item.track.uri)}
                    variant="contained"
                  >
                    <code>Play</code>
                  </Button> 
                </CardContent>
              </Card>
            );
          })}
          <br />
        </Box>
      </div>
    );
  }
};

export default SpotifyPlayLists;
