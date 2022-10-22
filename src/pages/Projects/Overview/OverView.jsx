import React from "react"
import styles from './OverView.module.css';

const OverView = () => {
    return (
        <div className={styles.overviewMainView}>
            <div className={styles.projectDescription}></div>
            <div className={styles.teamMembers}></div>
        </div>
    );
}

export default OverView;