import classes from "./MessageSection.module.css";
import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import { useParams } from "react-router-dom";
import database from "../../firebase";
import firebase from "firebase";
import { useStateValue } from "../../StateProvider";

const MessageSection = () => {
  const [inputMessage, setInputMessage] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  //everytime the roomID changes, get new messages with that roomID
  useEffect(() => {
    if (roomId) {
      database
        .collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) =>
          setRoomName(snapshot.data() ? snapshot.data().name : "NONAMEWTF")
        );

      database
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  const inputtingNewMessageHandler = (e) => {
    setInputMessage(e.target.value);
  };

  const sendMessageOnEnterHandler = (e) => {
    if (e.keyCode === 13) {
      sendMessageHandler(e);
    }
  };
  const sendMessageHandler = (e) => {
    e.preventDefault();
    database.collection("rooms").doc(roomId).collection("messages").add({
      name: user.displayName,
      message: inputMessage,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInputMessage("");
  };

  return (
    <div className={classes.messageSection}>
      {/*Header*/}
      <div className={`${classes.messageSection__header} ${classes.centered}`}>
        <div className={classes.messageSection__headerAvatar}>
          <Avatar
            src={`https://avatars.dicebear.com/api/human/${roomId}.svg?mood[]=happy`}
          />
        </div>
        <div className={classes.messageSection_headerPersonInfo}>
          <h3>{roomName}</h3>
          <p>
            Last seen
            {messages.length > 0
              ? new Date(
                  messages[messages.length - 1]?.timestamp?.toDate()
                ).toUTCString()
              : " not yet defined"}
          </p>
        </div>
        <div className={classes.messageSection__headerIcons}>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className={classes.messageSection__body}>
        {messages.map((message) => (
          <p
            className={`${classes.messageContent} ${
              message.name === user.displayName && classes.messageOutGoing
            }`}
          >
            <span className={classes.messagePersonName}>{message.name}</span>
            {message.message}
            <span className={classes.messageTime}>
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className={`${classes.messageSection__footer} ${classes.centered}`}>
        <div
          className={`${classes.messageSection__footerInputContainer} ${classes.centered}`}
        >
          <input
            className={classes.messageSection__footerInput}
            value={inputMessage}
            onChange={inputtingNewMessageHandler}
            onKeyDown={sendMessageOnEnterHandler}
            type="text"
            placeholder="Type your message here..."
          />
        </div>
        <div
          className={`${classes.messageSection__footerButtonContainer} ${classes.centered}`}
        >
          <IconButton onClick={sendMessageHandler}>
            <SendRoundedIcon />
          </IconButton>
          {/* <button className={classes.messageSection__footerButton}></button> */}
        </div>
      </div>
    </div>
  );
};

export default MessageSection;
