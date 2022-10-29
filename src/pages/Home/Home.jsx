import Navbar from "../../UI/Navbar";
import React from "react"
import styles from "./Home.module.css";
import Greeting from "./Greeting"
import RecentProject from "./RecentProject"
import Priority from "./Priority"
const Home = () => {

  return (
    <>
      <Navbar />
      <div className={styles.home}>
        <div className={styles.greetingContainer}>
            <Greeting />
        </div>
        <div className={styles.projectUsedContainer}>
          <RecentProject />
          <Priority/>
        </div>
      </div>
    </>
  );
};

export default Home;
