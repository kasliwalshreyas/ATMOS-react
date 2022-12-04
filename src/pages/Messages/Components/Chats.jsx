import React from "react";
import { useEffect, useContext , useState } from "react";
import styles from "./Chats.module.css"
import {ChatContext} from "./context/ChatContext"
const Chats = (user)=>{
    const [chats, setChats] = React.useState([])
    const { dispatch } = useContext(ChatContext);
    const [userName, setUserName] = useState(user.user.user.userName);
    const [projects, setProjects] = useState(null);
    const [cid, setCid] = React.useState(null);
    const handleUsers = async (us)=>{
        const c = {
            id: "",
            userInfo: {
                id : "",
                userName: "",
                date: "",
            }
        }
        console.log("SearchedUser",us);
        const currentUser = user.user.user.id.toString();
        const selectedUser = us.id.toString();
        const combinedId = currentUser > selectedUser ? currentUser + selectedUser : selectedUser + currentUser;      
        console.log(combinedId);  
        const res = await fetch("http://localhost:8000/conversationList",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id: combinedId, messages: []})
        })
        const data = await res.json();
        const res1 = await fetch("http://localhost:8000/userChat/" + currentUser,{
            method: "GET",
            headers: {"Content-Type": "application/json"},
            })
        const data1 = await res1.json();
        console.log("data11",data1);
        setCid(data1)

        c.id = combinedId;
        c.userInfo.id = us.id;
        c.userInfo.userName = us.userName;
        c.userInfo.date = new Date().toTimeString().slice(0,5);
        console.log("c",c);
        let u = JSON.parse(JSON.stringify(data1));
        // console.log("ub",u);
        u.cid.push(c);
        // console.log("ua",u);
        // console.log("data12",data1);
        console.log("u1",u);
        const res2 = await fetch(`http://localhost:8000/userChat/${user.user.user.id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({cid: u.cid})
            })
        const data2 = await res2.json();
        const res4 = await fetch("http://localhost:8000/userChat/" + selectedUser,{
            method: "GET",
            headers: {"Content-Type": "application/json"},
            })
        const data4 = await res4.json();
        // console.log("data41",data4);
        setCid(data4)
        c.id = combinedId;
        c.userInfo.id = user.user.user.id;
        c.userInfo.userName = user.user.user.userName;
        c.userInfo.date = new Date().toTimeString().slice(0,5);
        u = JSON.parse(JSON.stringify(data4));
        u.cid.push(c);
        // console.log("data42",data4);
        // console.log("u2",u);
        const res3 = await fetch("http://localhost:8000/userChat/" + selectedUser, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({cid: u.cid})
            })
        const data3 = await res3.json();
        // console.log("If",data);

    }
    useEffect(()=>{
        async function getChats(){
            console.log("loged in user id - ",user.user.user.id);
            const res = await fetch("http://localhost:8000/userChat/" + user.user.user.id); 
            const data = await res.json();
            // console.log("dataChat",data);
            setChats(data.cid);
        }
        user.user.user.id && getChats();

        async function getProjects() {
            let arr = []
            for(let i = 0; i < user.user.user.projectIDList.length; i++) {
                const project= {
                    id: "",
                    name: "",
                    high: [],
                    medium: [],
                    low: []
                }
                const res = await fetch("http://localhost:8000/projectList/" + user.user.user.projectIDList[i]);
                const data = await res.json();
                project.id = user.user.user.projectIDList[i]
                project.name = data.projectName
                // console.log("data",projects);
                for(let j = 0; j < data.highAccess.length; j++) {
                    const res = await fetch("http://localhost:8000/userList/" + data.highAccess[j]);
                    const r = await res.json();
                    let k = 0
                    if(r.id !== user.user.user.id && r) {
                        project.high.push({id: r.id, name: r.userName, date: r.date})
                        handleUsers(r);
                    }

                }
                for(let j = 0; j < data.mediumAccess.length; j++) {
                    const res = await fetch("http://localhost:8000/userList/" + data.mediumAccess[j]);
                    const r= await res.json();
                    if(r.id !== user.user.user.id && r) {
                        project.medium.push({id: r.id, name: r.userName, date: r.date})
                        handleUsers(r);
                    }
                }
                for(let j = 0; j < data.lowAccess.length; j++) {
                    const res = await fetch("http://localhost:8000/userList/" + data.lowAccess[j]);
                    const r = await res.json();
                    if(r.id !== user.user.user.id && r) {
                        project.low.push({id: r.id, name: r.userName, date: r.date})
                        handleUsers(r);
                    }
                }
                // console.log(project)
                arr[i] = project
            }
            setProjects(arr);
            // console.log("projects",arr)
        }
        getProjects();
    },[])
    // Date().splice(0,15);
    const handleSelect = (u)=>{
        dispatch({type: "CHANGE_USER", payload: {currentuser: user.user.user , searchUser: u}});
    }
    return(
        <div className={styles.chat}>
            {/* {chats && chats.map((item)=>{
                return(
                <div className={styles.userChat} key={item.id} onClick={()=>handleSelect(item.userInfo)}>
                    <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" alt="profile pic"/>
                    <div className={styles.userChatInfo}>
                        <span>{item.userInfo.userName}</span>
                        <p>last seen- {item.userInfo.date}</p>
                        {projects && projects.map((pro)=>{
                            if(pro.high.find((user)=>user.id === item.userInfo.id) ) {
                                return <p>Common Project-{pro.name}<br/>Role- High</p>
                            }
                            else if(pro.medium.find((user)=>user.id === item.userInfo.id)) {
                                return <p>Common Project-{pro.name}<br/>Role- Medium</p>
                            }
                            else if(pro.low.find((user)=>user.id === item.userInfo.id)) {
                                return <p>Common Project-{pro.name}<br/>Role- Low</p>
                            }
                        })}
                
                    </div>
                </div>
            )
            })} */}
            {projects && projects.map((pro)=>{
                if((pro.high.length !== 0) || (pro.medium.length !== 0) || (pro.low.length !== 0)) {
                return(
                    <div key={pro.id}>
                        <span className={styles.projectInfo}>
                            <h3>{pro.name}</h3>
                            <h6>Project ID- {pro.id}</h6>
                        </span>
                        
                        {pro.high.map((u)=>{
                            return(
                            <div className={styles.userChat} key={u.id} onClick={()=>handleSelect(u)}>
                                <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" alt="profile pic"/>
                                <div className={styles.userChatInfo}>
                                <span>{u.name}</span>
                                <p>High Access</p> 
                                <p>last seen- {u.date}</p>
                                </div>
                            </div>
                        )})}
                        {pro.medium.map((u)=>{
                            return(
                            <div className={styles.userChat} key={u.id} onClick={()=>handleSelect(u)}>
                                <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" alt="profile pic"/>
                                <div className={styles.userChatInfo}>
                                <span>{u.name}</span>
                                <p>Medium Access</p> 
                                <p>last seen- {u.date}</p>
                                </div>
                            </div>
                        )}
                        )}
                        {pro.low.map((u)=>{
                            return(
                            <div className={styles.userChat} key={u.id} onClick={()=>handleSelect(u)}>
                                <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" alt="profile pic"/>
                                <div className={styles.userChatInfo}>
                                <span>{u.name}</span>
                                <p>Low Access</p> 
                                <p>last seen- {u.date}</p>
                                </div>
                            </div>
                        )}
                        )}
                    </div>
                    //     <div className={styles.userChatInfo}>
                    //         <p>Medium Access- {pro.medium.map((user)=>user.name + ", ")}</p>
                    //         <p>Low Access- {pro.low.map((user)=>user.name + ", ")}</p>
                    //     </div>
                    // </div>
                )
}})}

        </div>
    )
}

export default Chats