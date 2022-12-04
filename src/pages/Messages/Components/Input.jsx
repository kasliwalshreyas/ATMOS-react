import React from "react";
import styles from "./Input.module.css";
import { useEffect, useContext , useState } from "react";
import {ChatContext} from "./context/ChatContext"
import {ChatsContext} from "./context/ChatsContext"
const Input = (user)=>{
    const { data } = useContext(ChatContext) ;
    const [text, setText] = useState("");
    const { dispatch } = useContext(ChatsContext);
    const handleSend = async ()=>{
        const res = await fetch("http://localhost:8000/conversationList/" + data.chatId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const da = await res.json();
        const res1 = await fetch("http://localhost:8000/conversationList/" + data.chatId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messages: [...da.messages, {text: text, senderName: user.user.user.userName, senderId:  user.user.user.id , date: new Date().toLocaleString()}]
            })
        });
        const da1 = await res1.json();
        console.log(da1);
        dispatch({type: "CHANGE_CHAT", payload: {text: text, senderName: user.user.user.userName, senderId:  user.user.user.id , date: new Date().toLocaleString()}});
        setText("");

        // const res = await fetch("http://localhost:8000/conversationList",{
        //     method:"POST",
        //     headers:{
        //         "Content-Type":"application/json"
        //     },
        //     body:JSON.stringify({
        //         senderId:data.user.id,
        //         receiverId:data.chatId,
        //         message:text
        //     })
        // })
        // const da = await res.json();
        // console.log(da);
    }
    return(
        <div className={styles.inputBox}>
            <input type="text" placeholder="Type Something........" onChange={e=>{setText(e.target.value)}} value={text} />
            <div className={styles.send}>
                <img src="../images/attachment.png" alt="" />
                <input type="file" style={{display: "none"}} id="file" /> 
                <label htmlFor="file"> 
                    <img src="../images/image.png" alt="" /> 
                </label> 
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Input