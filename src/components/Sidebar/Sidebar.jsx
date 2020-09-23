import React, { useState, useEffect } from "react";
import classes from "./Sidebar.module.css";
import SearchIcon from "./../../assets/icons/search-icon.png";
import SidebarMessage from "./SidebarChat/SidebarMessage";
import database from "../../firebase";
import { useStateValue } from "../../StateProvider";
import { useParams } from "react-router-dom";

const Sidebar = () => {
  const [chatRoom, setChatRoom] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = database.collection("rooms").onSnapshot((snapshot) =>
      setChatRoom(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    //cleanup Function, when components unmount, everything reset
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebar__bodyOverlay}>
        {/* Header */}
        <div className={`${classes.sidebar__header} ${classes.centered}`}>
          <div className={`${classes.sidebar__headerTop} ${classes.centered}`}>
            <div
              className={`${classes.sidebar__avatarContainer} ${classes.centered}`}
            >
              <img
                className={classes.sidebar__headerAvatar}
                src={
                  user
                    ? user.photoURL
                    : "https://avatars.dicebear.com/api/human/fadfasd.svg?mood[]=happy"
                }
                alt="Header Avatar"
              />
            </div>
          </div>
          <div
            className={`${classes.sidebar__headerBottom} ${classes.centered}`}
          >
            <h3>{user ? user.displayName : "Name Undefined"}</h3>
            <p>{user ? user.email : "emailundefined@gmail.com"}</p>
          </div>
        </div>
        {/* Search Section */}
        <div className={`${classes.sidebar__search} ${classes.centered}`}>
          <div className={classes.sidebar__searchContainer}>
            <input
              type="text"
              className={classes.sidebar__searchInput}
              placeholder="Search..."
            />
            <div className={classes.sidebar__searchIconContainer}>
              <img
                src={SearchIcon}
                alt="Search"
                className={classes.sidebar__searchIcon}
              />
            </div>
          </div>
        </div>
        {/* Chat Section */}
        <div className={classes.sidebar__message}>
          <SidebarMessage createNewMessage />
          {chatRoom.map((room) => (
            <SidebarMessage key={room.id} id={room.id} name={room.data.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
