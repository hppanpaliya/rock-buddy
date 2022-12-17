import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import firebaseApp from "./../firebase/Firebase";
import firebase from "firebase/compat/app";

const SignUp = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [signUpError, setSignUpError] = React.useState("");
  const [signUpSuccess, setSignUpSuccess] = React.useState(false);

  const isUsernameAvailable = async (user) => {
    const usernameRef = firebase.firestore().collection("users").doc(user);
    const usernameDoc = await usernameRef.get();
  
    if (usernameDoc.exists) { 
      return false;
    }
    return true;

  }



  const handleSubmit = async (e) => {
    let errorMessage;
    setSignUpError("");
    e.preventDefault();
      
    if (password === confirmPassword && await isUsernameAvailable(username) === true ) {
      firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          firebaseApp
            .firestore()
            .collection("users")
            .doc(username)
            .set({
              username: username,
              email: email,
              uid: userCredential.user.uid,
              // add more user data here if needed
            })
            .then(() => {
              console.log("Document successfully written!");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });

          userCredential.user.updateProfile({
            displayName: username,
            photoURL: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg",
          });
          // Signed in
          console.log(userCredential);
          console.log("Signed up");
          setSignUpSuccess(true);
        })
        .catch((error) => {
          errorMessage = error;
          console.log({ errorMessage });
          setSignUpError(errorMessage.message);
          console.log("Sign up failed");
        });
      if (!errorMessage) {
        return <Navigate to={`/`} />;
      }
    } else {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
      }
      if (await isUsernameAvailable(username) === false) {
        alert("Username is already taken");
      }
    }
  };

  if (auth.user) {
    return <Navigate to={`/`} />;
  }

  if (signUpSuccess) {
    return <Navigate to={`/signIn`} />;
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} />
        <br />
        <br />
        <input type="text" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
        <br />
        <br />
        <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
        <br />
        <br />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Repeat Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        <br />
        {signUpError ? <span style={{ color: "red" }}>{signUpError.replace("Firebase: ", "")}</span> : null}
        <br />
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
};

export default SignUp;
