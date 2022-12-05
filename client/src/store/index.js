//import { createStore, applyMiddleware } from "redux";

import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./features/auth/index";

const store = configureStore({
  reducer: {
    auth: userReducers,
  },
});

export default store;