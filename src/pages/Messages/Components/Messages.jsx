import React from "react";
import Message from "./Message";
import styles from "./Messages.module.css";
import { useEffect, useContext , useState } from "react";
import {ChatContext} from "./context/ChatContext"
const Messages = (user)=>{
    const { data } = useContext(ChatContext) ;
    const [messages, setMessages] = useState([]);

    useEffect(()=>{
        async function getMessages(){;
            const res = await fetch("http://localhost:8000/conversationList/" + data.chatId);
            const da = await res.json();
            setMessages(da.messages);
            console.log("message",da.messages);
        }
        getMessages();
    },[data.user.id, data.chatId])
   

    return(
        <div className={styles.messages}>
            {messages && messages.map((item)=>{
                console.log("item",item);
                let props = {
                    messages: item,
                    user: user.user.user
                }
                return(
                    <Message {...props} key={item.id} />
                )
            })}
        </div>
    )
}

export default Messages