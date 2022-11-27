import React from "react";
import { useEffect, useContext , useState } from "react";
import styles from "./Chats.module.css"
import {ChatContext} from "./context/ChatContext"
const Chats = (user)=>{
    const [chats, setChats] = React.useState([])
    const { dispatch } = useContext(ChatContext);
    const [userName, setUserName] = useState(user.user.user.userName);
    const [projects, setProjects] = useState(null);
    useEffect(()=>{
        async function getChats(){
            console.log(user.user.user.id);
            const res = await fetch("http://localhost:8000/userChat/" + user.user.user.id); 
            const data = await res.json();
            console.log("dataChat",data);
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
                console.log("data",projects);
                for(let j = 0; j < data.highAccess.length; j++) {
                    const res = await fetch("http://localhost:8000/userList/" + data.highAccess[j]);
                    const r = await res.json();
                    let k = 0
                    if(r.id !== user.user.user.id && r) {
                        project.high.push({id: r.id, name: r.userName})
                    }
                }
                for(let j = 0; j < data.mediumAccess.length; j++) {
                    const res = await fetch("http://localhost:8000/userList/" + data.mediumAccess[j]);
                    const r= await res.json();
                    if(r.id !== user.user.user.id && r) {
                        project.medium.push({id: r.id, name: r.userName})
                    }
                }
                for(let j = 0; j < data.lowAccess.length; j++) {
                    const res = await fetch("http://localhost:8000/userList/" + data.lowAccess[j]);
                    const r = await res.json();
                    if(r.id !== user.user.user.id && r) {
                        project.low.push({id: r.id, name: r.userName})
                    }
                }
                console.log(project)
                arr[i] = project
            }
            setProjects(arr);
            console.log("projects",arr)
        }
        getProjects();
    },[])
    // Date().splice(0,15);
    const handleSelect = (u)=>{
        dispatch({type: "CHANGE_USER", payload: {currentuser: user.user.user , searchUser: u}});
    }
    return(
        <div className={styles.chat}>
            {chats && chats.map((item)=>{
                return(
                <div className={styles.userChat} key={item.id} onClick={()=>handleSelect(item.userInfo)}>
                    <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" alt="profile pic"/>
                    <div className={styles.userChatInfo}>
                        <span>{item.userInfo.userName}</span>
                        <p>last seen- {item.userInfo.date}</p>
                        {/* <p>Common Projects-{projects.map((pro)=>{
                            if(pro.high.find((user)=>user.id === item.userInfo.id) || pro.medium.find((user)=>user.id === item.userInfo.id) || pro.low.find((user)=>user.id === item.userInfo.id)) {
                                return pro.name
                            }
                        })}</p> */}
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
            })}

        </div>
    )
}

export default Chats