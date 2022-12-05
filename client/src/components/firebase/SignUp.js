import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import firebaseApp from "./../firebase/Firebase";

const SignUp = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [username, setUsername] = React.useState("");

  const handleSubmit = async (e) => {
    let errorMessage;
    e.preventDefault();
    if (password === confirmPassword) {
      firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          firebaseApp
            .firestore()
            .collection("users")
            .doc(userCredential.user.uid)
            .set({
              username: username,
              email: email,
              accountCreated: "firebaseApp.firestore.FieldValue.serverTimestamp()",
              uid: userCredential.user.uid,
              // add more user data here if needed
            })
            .then(() => {
              console.log("Document successfully written!");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });

          // Signed in
          console.log(userCredential);
          console.log("Signed up");
        })
        .catch((error) => {
          errorMessage = error;
          console.log(errorMessage);
          console.log("Sign up failed");
        });
    } else {
      alert("Passwords do not match");
    }
  };

  if (auth.user) {
    return <Navigate to={`/`} />;
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
        <br />
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
};

export default SignUp;
