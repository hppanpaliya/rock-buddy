
import { createSlice } from "@reduxjs/toolkit";



const spotifySlice = createSlice({
    name: "spotify",
    initialState: {
      token: null,
    },
    reducers: {
      setToken: (state, action) => {
        const { token } = action.payload;
        state.token = token;
      },
      deleteToken: (state) => {
        state.token = null;
      },
    },
  });
  
  export const { setToken, deleteToken } = spotifySlice.actions;
  export default spotifySlice.reducer;