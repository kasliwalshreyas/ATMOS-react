import React from "react";
import styles from "./Chat.module.css";
import Messages from "./Messages";
import Input from "./Input";
import { useEffect, useContext , useState } from "react";
import {ChatContext} from "./context/ChatContext"
const Chat = (user)=>{
    const { data } = useContext(ChatContext) ;
    useEffect(()=>{
        console.log("go",user);
    },[])

    
    return(
        <div className={styles.chat}>
            <div className={styles.chatInfo}>
                <span>{data.user?.userName}</span>
                <div className={styles.chatIcons}>
                    <img src="../images/camera.png" alt="" />
                    <img src="../images/add-user.png" alt="" />
                    <img src="../images/more.png" alt="" />
                </div>
            </div>
                <Messages user={user}/> 
                <Input user={user}/>
        </div>
    )
}

export default Chat