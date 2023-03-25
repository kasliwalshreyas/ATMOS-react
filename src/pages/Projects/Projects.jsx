import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import ProjectList from "./ProjectList";
import Navbar from "../../UI/Navbar";
import Navbar_v2 from "../../UI/Navbar_v2";

const Projects = () => {
  const [projectInfo, setProjectInfo] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    // console.log('use effect from home');
    const getUser = async () => {
      const res = await fetch("http://localhost:4000/user/getUserInfo", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setUser(data.user);
      }
    };
    getUser();
  }, []);


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
      {user && <Navbar_v2 activeLink={"/projects"} user={user} />}
      {/* <Navbar /> */}
      {user && projectInfo && (
        <ProjectList projects={projectInfo} userInfo={user} />
      )}
    </>
  );
};

export default Projects;
