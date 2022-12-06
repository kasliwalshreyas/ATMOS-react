import React from "react";
import styles from "./Message.module.css";
import { useEffect, useContext , useState } from "react";
import {ChatContext} from "./context/ChatContext"
const Message = (props)=>{
    const { data } = useContext(ChatContext) ;
    // console.log("goprops",props.messages);
    // console.log("goprops",props.user);
    return(
        <div className={`${styles.message} ${props.messages.senderId === props.user.id && styles.owner}`}>
            <div className={styles.messageInfo}>
                <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" alt="" />
                <span>{props.messages.senderName}</span>
            </div>
            <div className={styles.messageText}>
                <p>{props.messages.text}</p>
            </div>
        </div>
    )
    
}

export default Message