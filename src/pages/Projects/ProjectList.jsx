import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { setProjectList } from "../../features/projectListSlice";
import { useSelector, useDispatch } from 'react-redux';

const ProjectList = ({ projects, userInfo }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(userInfo);
  console.log(projects, 'inside projectList');


  useEffect(() => {

    const getProjects = (projectID, projects) => {
      for (let i = 0; i < projects.length; i++) {
        if (projects[i].id === projectID) {
          return projects[i];
        }
      }
    }

    function getProjectList() {
      const projectInfoList = [];
      for (let i = 0; i < user.projectIDList.length; i++) {
        const data = getProjects(user.projectIDList[i], projects);
        console.log(data);
        projectInfoList.push(data);
      }
      dispatch(setProjectList(projectInfoList));
    }
    getProjectList();

  }, [dispatch]);

  const projectList = useSelector((state) => state.projectList.projectList)

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
      {/* {console.log(projectList)} */}
      {projectList && projectList
        .map((project) =>
          <div className="project-real" key={project.id}>
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
