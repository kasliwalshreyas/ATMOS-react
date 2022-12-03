import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../useFetch";
import ProjectList from "./ProjectList";
import Navbar from "../../UI/Navbar";
import { useSelector } from 'react-redux';


const Projects = () => {

  // const [userID, setUserID] = useState(JSON.parse(localStorage.getItem("user")));
  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   async function getUser() {
  //     const res = await fetch("http://localhost:8000/userList/" + userID);
  //     const data = await res.json();
  //     setUser(data);
  //   }
  //   getUser();
  //   console.log(user, 'from projects');

  // }, []);

  const user = useSelector((state) => state.user.user);

  // const getAllProjects = async () => {
  //   const res = await fetch("http://localhost:8000/projectList");
  //   const projects = res.json();
  //   return projects;
  // }
  // const projects = null;
  // projects = getAllProjects();

  const { data: projects, isPending, error } = useFetch(
    "http://localhost:8000/projectList"
  );

    
  return (
    <>
      <Navbar />
      {user && projects && <ProjectList projects={projects} userInfo={user} />}
    </>
  );
};

export default Projects;
