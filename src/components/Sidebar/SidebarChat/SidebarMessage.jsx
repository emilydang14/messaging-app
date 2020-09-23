import React, { useState, useEffect } from "react";
import classes from "./SidebarMessage.module.css";
import { Avatar } from "@material-ui/core";
import AddCommentIcon from "@material-ui/icons/AddComment";
import database from "../../../firebase";
import { Link, useHistory } from "react-router-dom";

//object destructuring function arguements (props)
const SidebarChat = ({ id, name, createNewMessage }) => {
  //Set random avatar for each Message
  const [avatarId, setavatarId] = useState("");
  const [messages, setMessages] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (id) {
      database
        .collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);
  useEffect(() => {
    setavatarId(Math.floor(Math.random() * 5000));
  }, []);

  const addNewChatHandler = () => {
    const newChatName = prompt("Enter new room name: ");
    if (newChatName) {
      database.collection("rooms").add({
        name: newChatName,
      });
    }
  };

  const deleteChatRoomHandler = () => {
    database
      .collection("rooms")
      .doc(id)
      .delete()
      .then(() => history.push("/app"));
  };

  return !createNewMessage ? (
    <Link to={`/rooms/${id}`}>
      <div className={`${classes.sidebarMessage} ${classes.centered}`}>
        <div className={classes.sidebarMessage__left}>
          <Avatar
            src={`https://avatars.dicebear.com/api/human/${avatarId}.svg?mood[]=happy
`}
          />
        </div>
        <div className={classes.sidebarMessage__right}>
          <h3>{name}</h3>
          <p>{messages[0]?.message}</p>
        </div>
        <div className={classes.deleteChatRoom} onClick={deleteChatRoomHandler}>
          X
        </div>
      </div>
    </Link>
  ) : (
    <div className={`${classes.sidebar__createNewChat} ${classes.centered}`}>
      <div className={classes.sidebar__createNewChat__left}>
        <h3>Chats</h3>
      </div>
      <div
        onClick={addNewChatHandler}
        className={classes.sidebar__createNewChat__right}
      >
        <AddCommentIcon className={classes.addChatIcon} />
      </div>
    </div>
  );
};

export default SidebarChat;
