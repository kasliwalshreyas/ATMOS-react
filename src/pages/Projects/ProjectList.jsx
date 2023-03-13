import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { setProjectList, setLastUsed, selectedProjectList } from "../../features/projectListSlice";
import { setProject } from "../../features/projectSlice";
import { useSelector, useDispatch } from 'react-redux';


const ProjectList = ({ projects, userInfo }) => {
  // const dispatch = useDispatch();
  const [user, setUser] = useState(userInfo);
  console.log(user, 'user from project list');
  console.log(projects, 'projects from project list');

  // useEffect(() => {
  //   const getProjects = (projectID, projects) => {
  //     for (let i = 0; i < projects.length; i++) {
  //       if (projects[i].id === projectID) {
  //         return projects[i];
  //       }
  //     }
  //   }
  //   function getProjectList() {
  //     const projectInfoList = [];
  //     for (let i = 0; i < user.projectIDList.length; i++) {
  //       const data = getProjects(user.projectIDList[i], projects);
  //       console.log(data);
  //       projectInfoList.push(data);
  //     }
  //     dispatch(setProjectList(projectInfoList));
  //   }
  //   getProjectList();
  // }, [dispatch]);

  // const projectList = useSelector(selectedProjectList);

  const navigate = useNavigate();
  // const updateLastUsed = (project) => {
  //   // dispatch(setLastUsed({ projectId: project.id }));
  //   // console.log(project.id, projectList, 'from project list');
  // };

  const insideProject = (project) => {
    // updateLastUsed(project);
    // localStorage.setItem("projectId", project.id);
    navigate(`/projects/${project._id}/overview`);
  };

  return (
    <div className="projectlist">
      <div className="plus-container">
        <Link className="plus" to="/createproject">
          +
        </Link>
      </div>
      {/* {console.log(projectList)} */}
      {projects && projects
        .map((project) =>
          <div className="project-real" key={project._id}>
            <div className="project-container">
              <a
                onClick={() => {
                  insideProject(project);
                }}
              >
                <img
                  className="project-img"
                  src={`./images/img/img${1 % 10}.PNG`}
                />
              </a>
            </div>
            <div className="project-name">
              {console.log(project)}
              <p>{project.projectName}</p>
            </div>
          </div>
        )
        .reverse()}
    </div>
  );
};

export default ProjectList;
