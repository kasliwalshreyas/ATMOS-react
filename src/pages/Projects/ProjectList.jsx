import React from "react";
import { Link, useNavigate } from "react-router-dom";


const ProjectList = ({ projects }) => {

  const handleLinkClick = (project) => {

    
    const navigate = useNavigate();
  
    const insideProject = (project) => {
      localStorage.setItem('projectId', project.id);
      navigate('/task/overview');
    }
    project.lastUsed = new Date();
    
    fetch(`http://localhost:8000/projectList/${project.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify(project)
        }).then((result) => {
            return result.json()
        })

  return (
    <div className="projectlist">
      <div className="plus-container">
        <Link className="plus" to="/createproject">
          +
        </Link>
      </div>
      {projects
        .map((project) => (
          <div className="project-real">
            <div className="project-container">
<<<<<<< HEAD
              <Link onClick={() => {
                handleLinkClick(project)
                }}
                to="/task" state={{ from: project.id }}>
=======
              <a onClick={() => { insideProject(project) }}>
>>>>>>> 15df0e06cce66f2a8de2aaf3185525f5148656a3
                <img
                  className="project-img"
                  src={`./images/img/img${project.id % 10}.PNG`}
                />
              </a>
            </div>
            <div className="project-name">
              <p>{project.projectName}</p>
            </div>
          </div>
        ))
        .reverse()}
    </div>
  );
};

export default ProjectList;
