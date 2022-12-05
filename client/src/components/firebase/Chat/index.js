import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import firebaseApp from "./../Firebase";

const Chat = (props) => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.user);
    const [message, setMessage] = React.useState("");
    const [messages, setMessages] = React.useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    if (!auth.user) {
        return <Navigate to={`/`} />;
    }

    return <div></div>
};


export default Chat;