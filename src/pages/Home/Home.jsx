import Navbar from "../../UI/Navbar";
import React, { useState } from "react";
import styles from "./Home.module.css";
import Greeting from "./Greeting";
import RecentProject from "./RecentProject";
import Priority from "./Priority";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar_v2 from "../../UI/Navbar_v2";

const Home = () => {
  // const [userID, setUserID] = useState(JSON.parse(localStorage.getItem("user")));
  const [user, setUser] = useState(null);
  // const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("http://localhost:4000/user/getUserInfo", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setUser(data.user);
      }
    };
    getUser();
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      <Navbar_v2 activeLink={"/home"} />
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
