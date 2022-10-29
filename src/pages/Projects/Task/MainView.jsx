import ProjectInfo from "./ProjectInfo";
import FilterFunc from "./FilterFunc";
import SectionArena from "./SectionArena";
import { useState, useEffect } from "react";
import OverView from "../Overview/OverView";
import Charts from "../Charts/Charts";
import React from "react";

const MainView = ({ overview, board, charts }) => {
  //   console.log(from);
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const [projectId, setProjectId] = useState(parseInt(localStorage.getItem("projectId")));
  // const [projectName, setProjectName] = useState()
  const [projectInfo, setProjectInfo] = useState(null);


  const handleClickOutside = (event) => {
    event.stopPropagation();
    setIsProfileClicked(false);
  };

  const populateProject = (project, userInfoList) => {
    if (project) {
      for (let i = 0; i < project.highAccess.length; i++) {
        project.highAccess[i] = userInfoList.find(
          (element) => element.id === project.highAccess[i]
        );
      }
      for (let i = 0; i < project.mediumAccess.length; i++) {
        project.mediumAccess[i] = userInfoList.find(
          (element) => element.id === project.mediumAccess[i]
        );
      }
      for (let i = 0; i < project.lowAccess.length; i++) {
        project.lowAccess[i] = userInfoList.find(
          (element) => element.id === project.lowAccess[i]
        );
      }

    }
    return project;
  };

  useEffect(() => {
    // console.log("projectID:", projectId);
    fetch(`http://localhost:8000/projectList/${projectId}`)
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then(async (project) => {
        // console.log(project);
        const userInfoList = await fetch("http://localhost:8000/userList/")
          .then((res) => {
            return res.json();
          });
        return [project, userInfoList];
      })
      .then(([project, userInfoList]) => {
        // console.log(data);
        // console.log(userInfoList, project);
        project = populateProject(project, userInfoList);
        // console.log(project);
        setProjectInfo(project);
      })
      .catch((err) => {
        console.log(err.message);
      }
      );
  }, [projectId]);


  // console.log(projectInfo);

  return (
    <div className="normal-div" onClick={handleClickOutside}>
      {projectInfo && (<ProjectInfo
        projectInfo={projectInfo}
        setProjectInfo={setProjectInfo}
        isProfileClicked={isProfileClicked}
        setIsProfileClicked={setIsProfileClicked}
      ></ProjectInfo>)}
      {/* <FilterFunc></FilterFunc>s */}
      {overview && projectInfo && <OverView projectId={projectId} projectInfo={projectInfo} setProjectInfo={setProjectInfo} ></OverView>}
      {board && projectInfo && <SectionArena projectId={projectId} projectInfo={projectInfo} setProjectInfo={setProjectInfo} ></SectionArena>}
      {charts && projectInfo && <Charts projectId={projectId} projectInfo={projectInfo} setProjectInfo={setProjectInfo}></Charts>}
    </div>
  );
};

export default MainView;
