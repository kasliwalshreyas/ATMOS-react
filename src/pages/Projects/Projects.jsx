import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import ProjectList from "./ProjectList";
import Navbar from "../../UI/Navbar";
import { useSelector } from "react-redux";
import Navbar_v2 from "../../UI/Navbar_v2";

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

  const user = useSelector((state) => state.user.userInfo);
  // console.log(user, "user from projects");
  // let token = useSelector((state) => state.user.token);
  // console.log(user, 'user from projects');
  // if (token == null) {
  //   token = localStorage.getItem('token');
  // }
  // console.log(token, 'token from projects');

  const [projectInfo, setProjectInfo] = useState(null);
  // const [user, setUser] = useState(null);

  // const getAllProjects = async () => {
  //   const res = await fetch("http://localhost:8000/projectList");
  //   const projects = res.json();
  //   return projects;
  // }
  // const projects = null;
  // projects = getAllProjects();

  // const { data: projects, isPending, error } = useFetch(
  //   "http://localhost:4000/project/getUserProjects"
  // );

  //async query to get all user's projects
  useEffect(() => {
    const projects = async () => {
      const res = await fetch("http://localhost:4000/project/getUserProjects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      // console.log(data, "data from Projects");
      setProjectInfo(data.projects);
    };
    projects();
  }, []);

  return (
    <>
      <Navbar_v2 activeLink={"/projects"} />
      {/* <Navbar /> */}
      {user && projectInfo && (
        <ProjectList projects={projectInfo} userInfo={user} />
      )}
    </>
  );
};

export default Projects;
