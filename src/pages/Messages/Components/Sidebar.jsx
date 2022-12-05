import Search from "./Search";
import React from "react";
import styles from "../Chats.module.css";
import Topbar from "./Topbar";
import Chats from "./Chats";
const Sidebar = (user)=>{
    return(
        <div>
            <Topbar user={user}/>
            <Search user={user}/>
            <div style={{height: "70vh",overflow: "scroll"}}>
            <Chats user={user}/>
            </div>
        </div>
    )
}

export default Sidebar