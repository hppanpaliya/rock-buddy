//import { createStore, applyMiddleware } from "redux";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducers from "./features/auth/authSlice";
import spotifyReducers from "./features/auth/spotifySlice";
import spotifyPlayerReducers from "./features/auth/playerSlice";

const rootReducer = combineReducers({
  auth: userReducers,
  spotify: spotifyReducers,
  spotifyPlayer: spotifyPlayerReducers,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
