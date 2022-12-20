import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import { useSelector } from "react-redux";
import SignIn from "../firebase/SignIn";
import Card from "@mui/material/Card";
import { CardMedia, Modal, Typography } from "@mui/material";
import { CardContent, Grid } from "@mui/material";
import { Box } from "@mui/system";
import rock from "../rock.png";
import Player from "./Player";
import { useDispatch } from "react-redux";
import { setTrackID } from "../../store/features/auth/playerSlice";
import IconButton from "@mui/material/IconButton";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import CloseIcon from "@mui/icons-material/Close";

const SpotifyPlayLists = () => {
  const [playlists, setPlayLists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [playingTrack, setPlayingTracks] = useState([]);
  const [open, setOpen] = useState(false);
  const auth = useSelector((state) => state.auth || null);
  const dispatch = useDispatch();
  let offset = 0;
  let limit = 50;
  let hasNextPage = true;
  let playlist = [];

  let token = window.sessionStorage.getItem("token");

  useEffect(() => {
    async function handleToken() {
      try {
        while (hasNextPage) {
          const data = await axios.get(`https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          playlist = playlist.concat(data.data.items);
          offset += limit;
          hasNextPage = data.data.next !== null;
        }
        // console.log(playlist);
        setPlayLists(playlist);
      } catch (error) {
        console.error(error);
      }
    }
    if (token) {
      handleToken();
    }
  }, [token]);

  async function playlistItems(id) {
    if (id === "") {
      setTracks([]);
      return;
    }
    try {
      const { data } = await axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      //console.log(data.items);
      setTracks(data.items);
    } catch (error) {
      console.error(error);
    }


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
      <Grid item xs={2} sm={4} md={4} key={playlist.id}>
        <Card>
          <CardMedia component={"img"} alt={"an image from Unsplash"} image={playlist.images.length !== 0 ? playlist.images[0].url : rock} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <code> Playlist Name: {playlist.name}</code>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <code>{playlist.description.length > 100 ? playlist.description.substring(0, 100) + "..." : playlist.description}</code>
            </Typography>
          </CardContent>
          <Box mx="auto">
            {playlist.tracks.total !== 0 ? (
              /* 
              <Button
                onClick={() => playlistItems(playlist.id)}
                variant="contained"
              >
                <code>Open Playlist</code>
              </Button>
              */
              <Button
                onClick={() => {
                  playlistItems("")
                  setOpen(true);
                  playlistItems(playlist.id);
                }}
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
      </Grid>
    );
  };

  const setPlayerTrack = (uri) => {
    console.log("Clicked Play");
    const hash = window.location.hash;
    let spotifyUri = window.sessionStorage.getItem("spotifyUri");
    if (spotifyUri !== uri) {
      window.location.hash = "";
      dispatch(setTrackID(uri));
      window.sessionStorage.setItem("spotifyUri", uri);
      setOpen(false)
    }
    //setPlayerTrack(uri);
  };

  if(! token){
    return(
      <div>
      <h1> User Playlists</h1>
      <p>Please sign in to Spotify to view playlists</p>

      </div>
    )
  }
  if(playlists.length === 0){
    return(
      <div>
      <h1> User Playlists</h1>
      <p>No playlists found</p>
      </div>

    )
  }

  return (
    <div>
      <Box sx={{ maxWidth: "75%", marginLeft: "auto", marginRight: "auto" }}>
        <Typography gutterBottom variant="p" component="div">
          <h1> User Playlists</h1>
          <br />
          <br />
        </Typography>
        <Grid container spacing={{ xs: 2, mid: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {console.log("inside grid")}
          {playlists && playlists.map((playlist) => buildPlaylistCard(playlist))}
        </Grid>
      </Box>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        style={{
          overflowY: "auto",
          position: "absolute",
          backgroundColor: "#f2f2f2dd",
        }}
        fullscreen="true"
      >
        <div>
          <IconButton style={{ position: "sticky", top: 0}} onClick={() => setOpen(false)}>
            <CloseIcon sx={{ fontSize: 40 }} />
          </IconButton>
          {tracks.map((item,count) => {
            // console.log(item);
            return (
              <div key={count} >
                <Card sx={{ maxWidth: "100%", marginLeft: "15%", marginRight: "15%", verticalAlign: "top", minHeight: "10vh" }}>
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
                    <CardContent sx={{ flex: "1 0 auto", justifyContent: "left" }}>
                      <Typography component="div" variant="h5">
                        {item.track.name}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        {item.track.artists.length > 1 ? "Various Artists" : item.track.artists[0].name}
                      </Typography>
                    </CardContent>
                    <Box sx={{ maxWidth: "50%", marginLeft: "auto", marginRight: "5%" }}>
                      <IconButton aria-label="play/pause" onClick={() => setPlayerTrack(item.track.uri)} variant="contained">
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
      </Modal>
    </div>
  );
};

export default SpotifyPlayLists;
