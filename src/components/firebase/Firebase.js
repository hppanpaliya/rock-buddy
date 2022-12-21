import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
//import { getStorage } from "firebase/storage";


let app = firebase.initializeApp({
  // apiKey: REACT_APP_FIREBASE_KEY,
  // authDomain: REACT_APP_FIREBASE_DOMAIN,
  // databaseURL: REACT_APP_FIREBASE_DATABASE,
  // projectId: REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: REACT_APP_FIREBASE_SENDER_ID,
  // appId: REACT_APP_FIREBASE_APP_ID,
  // measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
  apiKey: "AIzaSyCLQ8xQLKzxf5MGmD1U4tHsQrMLv_Eo60s",
  authDomain: "rock--buddy.firebaseapp.com",
  databaseURL: "https://rock--buddy-default-rtdb.firebaseio.com",
  projectId: "rock--buddy",
  storageBucket: "rock--buddy.appspot.com",
  messagingSenderId: "43403153573",
  appId: "1:43403153573:web:c6790b8135258c5f173d4c",
  measurementId: "G-XDMSZ61PKR",
});
// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION); // or LOCAL
app.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
export default app;
