import React from "react";
import { useState } from "react";
import { CardImg, Card, Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { useEffect } from "react";
import Sidebar from "./Sidebar";
// import styles from './Sidebar.module.css'
const ProfileSection = ({user} ) => {
    const [userName, setUserName] = useState(user.userName);
    const [projects, setProjects] = useState(null);
    const [highUsers, setHighUsers] = useState(null);
    const [mediumUsers, setMediumUsers] = useState(null);
    const [lowUsers, setLowUsers] = useState(null);
    const [chats, setChats] = useState(null);
    const project = new Object()
    // const project= {
    //     id: "",
    //     name: "",
    //     high: [
    //         {
    //             id: "",
    //             name: "",
    //             sent: [
    //                 {
    //                     to: "",
    //                     message: "",
    //                     time: ""
    //                 }
    //             ],
    //             recieved: [
    //                 {
    //                     from: "",
    //                     message: "",
    //                     time: ""
    //                 }
    //             ]
        
    //         }
    //     ],
    //     medium: [
    //         {
    //             id: "",
    //             name: "",
    //             sent: [
    //                 {
    //                     to: "",
    //                     message: "",
    //                     time: ""
    //                 }
    //             ],
    //             recieved: [
    //                 {
    //                     from: "",
    //                     message: "",
    //                     time: ""
    //                 }
    //             ]
        
    //         }
    //     ],
    //     low: [
    //         {
    //             id: "",
    //             name: "",
    //             sent: [
    //                 {
    //                     to: "",
    //                     message: "",
    //                     time: ""
    //                 }
    //             ],
    //             recieved: [
    //                 {
    //                     from: "",
    //                     message: "",
    //                     time: ""
    //                 }
    //             ]
        
    //         }
    //     ]
    // }

    useEffect(() => {
        async function getProjects() {
            let arr = []
            let high = []
            let medium = []
            let low = []
            for(let i = 0; i < user.projectIDList.length; i++) {
                const project= {
                    id: "",
                    name: "",
                    high: [],
                    medium: [],
                    low: []
                }
                const res = await fetch("http://localhost:8000/projectList/" + user.projectIDList[i]);
                const data = await res.json();
                project.id = user.projectIDList[i]
                project.name = data.projectName
                for(let j = 0; j < data.highAccess.length; j++) {
                    const res = await fetch("http://localhost:8000/userList/" + data.highAccess[j]);
                    const r = await res.json();
                    // const d = r.filter((user) => user.id === data.highAccess[j])
                    let k = 0
                    if(r.id !== user.id && r) {
                        // project.high[k++].id = r.id
                        // project.high[k++].name = r.userName
                        project.high.push({id: r.id, name: r.userName})
                    }
                }
                for(let j = 0; j < data.mediumAccess.length; j++) {
                    const res = await fetch("http://localhost:8000/userList/" + data.mediumAccess[j]);
                    const r= await res.json();
                    if(r.id !== user.id && r) {
                        // project.medium[j].id = r.id
                        // project.medium[j].name = r.userName
                        project.medium.push({id: r.id, name: r.userName})
                    }
                }
                for(let j = 0; j < data.lowAccess.length; j++) {
                    const res = await fetch("http://localhost:8000/userList/" + data.lowAccess[j]);
                    const r = await res.json();
                    if(r.id !== user.id && r) {
                        // project.low[j].id = r.id
                        // project.low[j].name = r.userName
                        project.low.push({id: r.id, name: r.userName})
                    }
                }
                console.log(project)
                arr[i] = project
            }
            setProjects(arr);

        }
        getProjects();
    }, []);



    return (
        <>
            <h1>{userName}</h1>
            {projects && (
        <Sidebar user={user} projects={projects}  />
        )}
            {/* <div className="sidenav">
  <a href="#about">About</a>
  <a href="#services">Services</a>
  <a href="#clients">Clients</a>
  <a href="#contact">Contact</a>
  <button className="dropdown-btn">Dropdown
    <i className="fa fa-caret-down"></i>
  </button>
  <div className="dropdown-container">
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
    <a href="#">Link 3</a>
  </div>
  <a href="#contact">Search</a>
</div> */}

            {/* {projects && (projects.map((project) => {
                return(
                    <><h1>{project.name}</h1><p>{project.id}</p>
                    <h2>High Access</h2>
                    {project.high.map((user) => {
                        if(user.id !== undefined) {
                        return(
                            <div><h1>{user.name}</h1><p>{user.id}</p></div>
                        )
                        }
                    })}
                    <h2>Medium Access</h2>
                    {project.medium.map((user) => {
                        if(user.id !== undefined) {
                        return(
                            <div><h1>{user.name}</h1><p>{user.id}</p></div>
                        )
                        }
                    })}
                    <h2>Low Access</h2>
                    {project.low.map((user) => {
                        if(user.id !== undefined) {
                        return(
                            <div><h1>{user.name}</h1><p>{user.id}</p></div>
                        )
                        }
                    })}
                    </>
            )}))}  */}
        </>
    )
}

export default ProfileSection;

