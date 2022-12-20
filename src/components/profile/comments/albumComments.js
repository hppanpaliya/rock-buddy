import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";

const db = firebase.firestore();

function CommentSection(props) {
  const { albumId } = props;
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");
  const [noError, setNoError] = useState(true)
  const userInfo = useSelector((state) => state.auth).user;
  console.log(userInfo);

  useEffect(() => {
    const unsubscribe = db
      .collection("comments")
      .where("album_id", "==", albumId)
      .onSnapshot((snapshot) => {
        const newComments = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(newComments);
      });
    return () => unsubscribe();
  }, [albumId]);

  async function handleCommentSubmit(event) {
    event.preventDefault();
    if(commentText.trim().length < 3 || typeof(commentText) !== 'string'){
      setNoError(false);
      return
    }
    setNoError(true);

    try {
      await db.collection("comments").add({
        album_id: albumId,
        comment_text: commentText,
        comment_author: userInfo.username,
      });
      setCommentText("");
      setCommentAuthor("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div style={{ maxWidth: "50%", margin: "auto" }}>
      <CommentList comments={comments} />
      {userInfo && userInfo.username ? (
        <form onSubmit={handleCommentSubmit}>
          <TextField
            label="Enter your comment"
            variant="outlined"
            fullWidth
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">
            Submit Comment
          </Button>
          <div hidden={noError}>Invalid input! Comment must be at least 3 characters!</div>
        </form>
      ) : (
        <p>Please login to comment</p>
      )}
    </div>
  );
}

function CommentList(props) {
  const { comments } = props;
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          <b>{comment.comment_author}:</b> {comment.comment_text}
        </li>
      ))}
    </ul>
  );
}

export default CommentSection;
