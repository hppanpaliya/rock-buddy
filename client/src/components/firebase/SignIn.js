import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import firebaseApp from "./../firebase/Firebase";
import { login } from "./../../store/features/auth/";

const SignIn = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth || null);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        firebaseApp
          .firestore()
          .collection("users")
          .doc(userCredential.user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log("Document data:", doc.data());

              dispatch(
                login({
                  uid: userCredential.user.uid,
                  email: userCredential.user.email,
                  username: doc.data().username,
                })
              );
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      })
      .catch((error) => {
        console.log(error);
        console.log("Sign in failed");
      });
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
        <br />
        <input type="submit" value="Sign In" />
      </form>
      <br />

      <button className="forgotPassword" /* onClick={passwordReset} */>Forgot Password</button>
    </div>
  );
};

export default SignIn;
