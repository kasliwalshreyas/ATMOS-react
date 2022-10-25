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

  useEffect(() => {
    // console.log("projectID:", projectId)
    fetch(`http://localhost:8000/projectList/${projectId}`)
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((res) => {
        // console.log(res);
        setProjectInfo(res);
      })

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
      <FilterFunc></FilterFunc>
      {overview && projectInfo && <OverView projectId={projectId} projectInfo={projectInfo} setProjectInfo={setProjectInfo} ></OverView>}
      {board && projectInfo && <SectionArena projectId={projectId} projectInfo={projectInfo} setProjectInfo={setProjectInfo} ></SectionArena>}
      {charts && <Charts></Charts>}
    </div>
  );
};

export default MainView;
