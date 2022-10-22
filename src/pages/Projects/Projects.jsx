import React from "react"
import { Link } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../useFetch";
import ProjectList from "./ProjectList";
import Navbar from "../../UI/Navbar";
const Projects = () => {
  const {
    data: projects,
    isPending,
    error,
  } = useFetch("http://localhost:8000/projectList");
  // const createProject = () => { };

  return (
    <>
      <Navbar />

      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {projects && <ProjectList projects={projects} />}

    </>
  );
};

export default Projects;
