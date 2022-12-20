
import { createSlice } from "@reduxjs/toolkit";


const spotifyPlayerSlice = createSlice({
    name: "spotifyPlayer",
    initialState: {
      trackID: null,
    },
    reducers: {
      setTrackID: (state, action) => {
        const  trackID  = action.payload;
        state.trackID = trackID;
      },
      deleteTrackID: (state) => {
        state.trackID = null;
      },
    },
  });
  
  export const { setTrackID, deleteTrackID } = spotifyPlayerSlice.actions;
  export default spotifyPlayerSlice.reducer;