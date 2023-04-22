import React, { useEffect, useRef, useState } from 'react'
import "./ChatBox.css";
import InputEmoji from 'react-input-emoji'
import { Text } from '@mantine/core';
import { Button } from '@mantine/core';
import { format } from "timeago.js"
const ChatBox = ({ chat, currentUserId, setSendMessage, receiveMessage }) => {
    const [userData, setUserData] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const scroll = useRef()


    useEffect(() => {
        const userId = chat.members.find((id) => id !== currentUserId)
        // userId && console.log(userId)
        const getUserData = async () => {
            try {
                const res = await fetch(`http://localhost:4000/admin/users/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const data = await res.json();
                setUserData(data.user);
                console.log("this is", data)
            } catch (error) {
                console.log(error)
            }
        }
        if (chat !== null) {
            getUserData()
        }
    }, [chat, currentUserId])

    useEffect(() => {
        const chatId = chat._id;
        const getMessages = async () => {
            try {
                const res = await fetch(`http://localhost:4000/message/${chatId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const data = await res.json();
                setMessages(data);
                console.log("this is", data)
            } catch (error) {
                console.log(error)
            }
        }
        if (chat !== null) {
            getMessages()
        }
    }, [chat, currentUserId])

    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }
    const handleSend = async (e) => {
        e.preventDefault();
        const message = {
            senderId: currentUserId,
            text: newMessage,
            chatId: chat._id,
        }
        // send 
        try {
            const res = await fetch("http://localhost:4000/message/sendmessage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(message)
            });

            const data = await res.json();
            //   console.log(data)
            setMessages([...messages, data])
            setNewMessage("")
        } catch (error) {
            console.log(error);
        }
        // send message with socket
        const receiverId = chat.members.find((id) => id !== currentUserId)
        setSendMessage({ ...message, receiverId })
    }

    useEffect(() => {
        // console.log("rec",receiveM essage)
        if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
            console.log("latest receive message ", receiveMessage)
            if(currentUserId !== receiveMessage.senderId)
            setMessages([...messages, receiveMessage])
        }
    }, [receiveMessage])

    // scroll to the end
    useEffect(() => {
        // scroll.current.scrollImtoView
        scroll.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])
    return (
        <div className="ChatBox-container">
            {/* header */}
            {chat ? (
                <>
                    <div className='chat-header'>
                        <div className="follower">
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <img
                                    src={userData ? userData.avatar : 'avatar.png'}
                                    alt="Profile"
                                    className="followerImage"
                                    style={{ width: "50px", height: "50px" }}
                                />
                                <div className="name" style={{ fontSize: "0.9rem" }}>
                                    <span>
                                        {userData && <Text>{userData.userName}</Text>}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <hr
                            style={{
                                width: "95%",
                                border: "0.1px solid #ececec",
                                marginTop: "20px",
                            }}
                        />

                    </div>

                    {/* body  */}

                    <div className="chat-body">
                        {messages && messages.map((msg, index) => {
                            // console.log(msg)
                            return (
                                <>
                                    <div ref={scroll} className={msg.senderId === currentUserId ? "own-message" : "message"} key={index}>
                                        <span>{msg.text}</span>
                                        <span>{format(msg.createdAt)}</span>
                                    </div>
                                </>
                            )
                        })}

                    </div>
                    {/* chat sender */}
                    <div className='chat-sender'>
                        <div>+</div>
                        <InputEmoji
                            value={newMessage}
                            onChange={handleChange}
                        />
                        <Button radius="md" size="md" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} onClick={handleSend}>
                            Send
                        </Button>
                    </div>
                </>
            ) : (
                <span className="chatbox-empty-message">
                    Tap on a chat to start conversation...
                </span>
            )}
        </div>
    )
}

export default ChatBox
