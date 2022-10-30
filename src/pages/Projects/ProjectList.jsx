import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const ProjectList = ({ projects }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();
  const handleLinkClick = (project) => {
    project.lastUsed = new Date();

    fetch(`http://localhost:8000/projectList/${project.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    }).then((result) => {
      return result.json();
    });
  };

  const insideProject = (project) => {
    handleLinkClick(project);
    localStorage.setItem("projectId", project.id);
    navigate("/task/overview");
  };

  return (
    <div className="projectlist">
      <div className="plus-container">
        <Link className="plus" to="/createproject">
          +
        </Link>
      </div>
      {projects
        .map((project) =>
            user.id === project.userId && <div className="project-real">
              <div className="project-container">
                <a
                  onClick={() => {
                    insideProject(project);
                  }}
                >
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
          )
        .reverse()}
    </div>
  );
};

export default ProjectList;
