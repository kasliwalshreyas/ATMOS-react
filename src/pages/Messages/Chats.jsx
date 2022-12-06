import React, {useEffect} from "react";
import { useState } from "react";
import Navbar from "../../UI/Navbar";
import Chat from "./Components/Chat";
import ProfileSection from "./ProfileSection";
import Sidebar from "./Components/Sidebar";
import styles from "./Chats.module.css"
import { useSelector, useDispatch } from 'react-redux';

const Chats = () => {
  const [userID, setUserID] = useState(JSON.parse(localStorage.getItem("user")));
  // const [user, setUser] = useState(null);
  const user = useSelector((state) => state.user.user);
  // const user = useSelector((state) => state.user.user);

  // useEffect(() => {

  //   async function getUser() {
  //     const res = await fetch("http://localhost:8000/userList/" + userID);
  //     const data = await res.json();
  //     setUser(data);
  //   }
  //   getUser();
  //   // console.log(user);
  // }, [userID]);

  return (
    <>
      <Navbar />
      {user&& <div className={styles.container}>
        <div className={styles.chat_sidebar}>
            <Sidebar user={user} />
        </div>
        <div className={styles.chat}>
            <Chat user={user}/>
        </div>
      </div>
      }
      {/* {user && (
        <ProfileSection user={user} />
        )} */}
    </>
    
  );
}

export default Chats;