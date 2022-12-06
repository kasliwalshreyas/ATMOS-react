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
    const [noMessages, setNoMessages] = useState(false);
    const [selected, setSelected] = useState(false);

    useEffect(()=>{
        async function getMessages(){;
            const res = await fetch("http://localhost:8000/conversationList/" + data.chatId);
            const da = await res.json();
            setMessages(da.messages);
            if(da.messages.length === 0){
                console.log("no messages");
                setNoMessages(true);
                setSelected(true);
            }
            else if(data.chatId === null){
                setSelected(false);
            }
            else{
                setNoMessages(false);
                setSelected(true);
            }
            // console.log("message in mess",da.messages);
            // console.log("data in mess", chat);
        }
        getMessages();
    });
   
    return(
        <div className={styles.messages}>
            {!selected && <div className={styles.noMessages}>Select a User to Chat...</div>}
            {noMessages && <div className={styles.noMessages}>No messages yet</div>}
            {messages && !noMessages && messages.map((item)=>{
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