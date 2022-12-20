import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false);
  const token = window.sessionStorage.getItem("token");
  useEffect(() => setPlay(true), [trackUri]);

  if (!accessToken) return null;
  //spotify player is an external component from npm and cannot have a label added to so there is a totally error
  return (
    <SpotifyPlayer
      token={token}
      showSaveIcon
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
      }}
      id='spotifyplayer'
      play={play}
      uris={trackUri ? [trackUri] : []}
    />
  );
}
