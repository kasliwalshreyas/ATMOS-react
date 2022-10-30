import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../useFetch";
import ProjectList from "./ProjectList";
import Navbar from "../../UI/Navbar";
const Projects = () => {

  const [userID, setUserID] = useState(JSON.parse(localStorage.getItem("user")));
  const [user, setUser] = useState(null);

  useEffect(() => {

    async function getUser() {
      const res = await fetch("http://localhost:8000/userList/" + userID);
      const data = await res.json();
      setUser(data);
    }
    getUser();
  }, [userID]);



  const { data: projects, isPending, error } = useFetch(
    "http://localhost:8000/projectList"
  );
  // const createProject = () => { };

  return (
    <>
      <Navbar />

      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {user && projects && <ProjectList projects={projects} userInfo={user} />}
    </>
  );
};

export default Projects;
