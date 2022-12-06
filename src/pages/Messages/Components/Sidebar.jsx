import Search from "./Search";
import React from "react";
import styles from "./Sidebar.module.css";
import Topbar from "./Topbar";
import Chats from "./Chats";
const Sidebar = (user)=>{
    return(
        <div>
            <Topbar user={user}/>
            <Search user={user}/>
            <div className={styles.chat}>
            <Chats user={user}/>
            </div>
        </div>
    )
}

export default Sidebar