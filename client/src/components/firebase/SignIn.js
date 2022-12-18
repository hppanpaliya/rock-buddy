import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import firebaseApp from "./../firebase/Firebase";
import { login } from "./../../store/features/auth/";
import firebase from "firebase/compat/app";

const SignIn = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth || null);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.

    try {
      const userCredential = await firebaseApp.auth().signInWithEmailAndPassword(email, password);
      // Signed in
      dispatch(
        login({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          username: userCredential.user.displayName,
        })
      )
    } catch (error) {
      console.log(error);
      setError(error.message);
      console.log("Sign in failed");
    }
  };

  if (auth && auth.user) {
    return <Navigate to={`/`} />;
  }

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
        <br />
        <br />
        <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
        <br />
        {error ? <span style={{ color: "red" }}>{/* {error.replace("Firebase: ", "")} */}Please check email and password.</span> : null}
        <br />
        <input type="submit" value="Sign In" />
      </form>
      <br />

      <button className="forgotPassword" /* onClick={passwordReset} */>Forgot Password</button>
    </div>
  );
};

export default SignIn;
