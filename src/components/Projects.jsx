import { Link } from "react-router-dom"
import { useState } from "react"
import useFetch from "../useFetch"
import ProjectList from "./ProjectList"
const Projects = () => {
    const {data: projects, isPending, error} = useFetch('http://localhost:8000/projectList')
    const createProject = () => {

    }

    return (
        <div onClick={createProject} className="projects">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {projects && <ProjectList projects={projects}/>}
        </div>
    )
}

export default Projects