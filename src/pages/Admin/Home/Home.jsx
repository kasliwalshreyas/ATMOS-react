import React from "react";
// import { Navbar } from "react-bootstrap";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import styles from "./Home.module.css";
import Widget from "../components/Widget/Widget";
import Featured from "../components/Featured/Featured";
import Chart from "../components/Chart/Chart";

const Home = () => {
    return (
        <div className={styles.home}>
        <Sidebar />
        <div className={styles.homeContainer}>
            <Navbar />
            <div className={styles.widgets}>
                <Widget type="Users"/>
                <Widget type="Projects"/>
                <Widget type="Teams"/>
                <Widget type="Revenue"/>
            </div>
               <div className={styles.charts}>
                <Featured />
                <div className={styles.chart}>
                <Chart />
                </div>
               </div>
        </div>
        </div>
    );
    }

export default Home;