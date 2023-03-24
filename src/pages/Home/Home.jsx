import React, { useState } from "react";
import styles from "./Home.module.css";
import Greeting from "./Greeting";
import RecentProject from "./RecentProject";
import Priority from "./Priority";
import { useEffect } from "react";
import Navbar_v2 from "../../UI/Navbar_v2";

const Home = () => {
  // const [userID, setUserID] = useState(JSON.parse(localStorage.getItem("user")));
  const [user, setUser] = useState(null);
  // const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    // console.log('use effect from home');
    const getUser = async () => {
      const res = await fetch("http://localhost:4000/user/getUserInfo", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      // console.log(data, 'data from home');
      if (data.success) {
        // console.log(data.user, 'from home');
        setUser(data.user);
      }
    };
    getUser();
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      {user && <Navbar_v2 activeLink={"/home"} user={user} />}
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
