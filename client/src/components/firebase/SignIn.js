import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import firebaseApp from "./../firebase/Firebase";
import { login } from "./../../store/features/auth/";
import { Button,Typography ,TextField} from "@mui/material";
import validator from "validator";

const SignIn = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth || null);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate input
    if (!email || !password) {
      setError("Please enter a valid email and password.");
      return;
    }

    if (!validator.isEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const userCredential = await firebaseApp.auth().signInWithEmailAndPassword(email, password);
      // Signed in
      dispatch(
        login({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          username: userCredential.user.displayName,
        })
      ).then(() => {
        console.log("Sign in successfully!");
        return <Navigate to={`/`} />;
      });
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
        <TextField
          id="email"
          name="email"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <br /> <br />
        <TextField
          id="password"
          name="password"
          type="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br /> 
        {error ? (
          <Typography variant="body2" className="error">
                    <br />
            {error}
          </Typography>
        ) : null}
        <br />
        <Button type="submit" variant="contained" color="primary">
          Sign In
        </Button>
      </form>
      <br />
      <Button variant="outlined">Forgot Password</Button>
      <br /> <br />
    </div>
  );
};

export default SignIn;
