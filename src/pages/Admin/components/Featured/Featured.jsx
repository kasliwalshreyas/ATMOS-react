import React from "react";
import styles from "./Featured.module.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import 'react-circular-progressbar/dist/styles.css';
import { green } from "@mui/material/colors";
const Featured = () => {
    return (
        <div className={styles.featured}>
            <div className={styles.top}>
                <h1 className={styles.title}>Total Revenue</h1>
                <MoreVertIcon fontSize="small" />
            </div>
            <div className={styles.bottom}>
                <div className={styles.featuredChart}>
                    <CircularProgressbar value={70} text={"70%"} strokeWidth={5}/>
                </div>
                <p className={styles.title}>Total Users Registed Today</p>
                <p className={styles.amount}>23</p>
                <p className={styles.desc}>Previous Registrations Processing. Last Registrations May Not Be Included. </p>
                <div className={styles.summary}>
                    <div className={styles.item}>
                        <div className={styles.itemTitle}>
                            Target
                        </div>
                        <div className={styles.itemResult} style={{color: "green"}}>
                            <KeyboardArrowDownIcon color="green"/>
                            <div className={styles.resultAmount} style={{color: "green"}}>
                                12
                            </div>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.itemTitle}>
                            Target
                        </div>
                        <div className={styles.itemResult}  style={{color: "green"}}>
                            <KeyboardArrowDownIcon />
                            <div className={styles.resultAmount} >
                                12
                            </div>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.itemTitle}>
                            Target
                        </div>
                        <div className={styles.itemResult} style={{color: "green"}}>
                            <KeyboardArrowDownIcon />
                            <div className={styles.resultAmount}>
                                12
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
 
    );
}

export default Featured;