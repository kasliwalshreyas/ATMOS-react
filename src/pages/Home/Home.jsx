import Navbar from "../../UI/Navbar";
import React, { useState } from "react"
import styles from "./Home.module.css";
import Greeting from "./Greeting"
import RecentProject from "./RecentProject"
import Priority from "./Priority"
import { useEffect } from "react";
import {useSelector} from 'react-redux';
const Home = () => {
  const [userID, setUserID] = useState(JSON.parse(localStorage.getItem("user")));
  // const [user, setUser] = useState(null);
  const user = useSelector((state) => state.user.user);

  // useEffect(() => {

  //   async function getUser() {
  //     const res = await fetch("http://localhost:8000/userList/" + userID);
  //     const data = await res.json();
  //     setUser(data);
  //   }
  //   getUser();
  // }, [userID]);





  return (
    <>
      <Navbar />
      <div className={styles.home}>
        <div className={styles.greetingContainer}>
          {user && <Greeting user={user} />}
        </div>
        <div className={styles.projectUsedContainer}>
          {user && <RecentProject user={user} />}
          {user && <Priority user={user} />}
        </div>
      </div>
    </>
  );
};

export default Home;
