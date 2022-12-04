import React from "react";
import Message from "./Message";
import styles from "./Messages.module.css";
import { useEffect, useContext , useState } from "react";
import {ChatContext} from "./context/ChatContext"
import {ChatsContext} from "./context/ChatsContext"
const Messages = (user)=>{
    const { data } = useContext(ChatContext) ;
    const [messages, setMessages] = useState([]);
    const { chat } = useContext(ChatsContext) ;

    useEffect(()=>{
        async function getMessages(){;
            const res = await fetch("http://localhost:8000/conversationList/" + data.chatId);
            const da = await res.json();
            setMessages(da.messages);
            // console.log("message in mess",da.messages);
            // console.log("data in mess", chat);
        }
        getMessages();
    });
   

    return(
        <div className={styles.messages}>
            {messages && messages.map((item)=>{
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