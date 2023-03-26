import React, { useState, useEffect } from "react"

const GetMessages = ({project})=>{
    // const [chats , setChats] = useState(null);
    console.log("chats ", project)
    async function getUser() {
        const res = await fetch(`http://localhost:4000/chat/getChats/project/${project._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        const data = await res.json();
        console.log(data);
        if (data.success) {
          console.log(data)
          // setChats(data);
        }
      }
    useEffect(() => {
        getUser();
      }, []);
    //   console.log("gf",chats)
    return(
        <>
        <h1>Messages</h1>
        {/* {chats && <h1>{chats}</h1>} */}
        </>
    )
}

export default GetMessages;