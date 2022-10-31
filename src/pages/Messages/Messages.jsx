import Navbar from "../../UI/Navbar";
import React from "react"
import { ChatEngine } from 'react-chat-engine';
const Messages = () => {
  return (
    <>
      <Navbar />
      <div className="messages">
      <ChatEngine height = "100vh"  projectID="5451affd-20e6-4d49-a60b-c93bb9fcba13" userName="dersabce" userSecret="D@123456"  />
      </div>
    </>
  );
};

export default Messages;
