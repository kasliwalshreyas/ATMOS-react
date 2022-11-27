import React from "react";
import styles from "./Topbar.module.css"
const Topbar = (user)=>{
    return(
        <div className={styles.topbar}>
            Welcome <span> {user.user.user.userName}</span>
        </div>
    )
}

export default Topbar