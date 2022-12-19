//import { createStore, applyMiddleware } from "redux";

import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./features/auth/index";

// import storage from 'redux-persist/lib/storage';
// import { persistReducer, persistStore } from 'redux-persist';
// import thunk from 'redux-thunk';

// const persistConfig = {
//   key: 'root',
//   storage,
// }

// const persistedReducer = persistReducer(persistConfig, userReducers)

const store = configureStore({
  reducer: {
    auth: userReducers,
  },
  
});
export default store;


// const store1 = configureStore({
//   reducer: persistedReducer,
//   middleware: [thunk]
  
// });

// const store = persistStore(store1)
// export default store
