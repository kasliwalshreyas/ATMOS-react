import React from "react";
import { Link } from "react-router-dom";
const ProjectList = ({ projects }) => {
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
              <Link to="/task" state={{ from: project.id }}>
                <img
                  className="project-img"
                  src={`./images/img/img${project.id % 10}.PNG`}
                />
              </Link>
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
