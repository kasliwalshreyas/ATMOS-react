import ProjectInfo from "./ProjectInfo";
import FilterFunc from "./FilterFunc";
import SectionArena from "./SectionArena";
import { useState, useEffect } from "react";
import OverView from "../Overview/OverView";
import Charts from "../Charts/Charts";
import React from "react";
import Timeline from "../Timeline/Timeline";
import { useSelector, useDispatch } from 'react-redux';
import { setProject } from "../../../features/projectSlice";

const MainView = ({ overview, board, charts, timeline }) => {
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const [projectId, setProjectId] = useState(parseInt(localStorage.getItem("projectId")));
  const [projectInfo, setProjectInfo] = useState(null);
  // const [userID, setUserID] = useState(JSON.parse(localStorage.getItem("user")));
  // const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  // const projectInfo = useSelector((state) => state.projectInfo.projectInfo);

  // useEffect(() => {
  //   async function getUser() {
  //     const res = await fetch("http://localhost:8000/userList/" + userID);
  //     const data = await res.json();
  //     setUser(data);
  //   }
  //   getUser();
  // }, [userID]);

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
        // console.log(project);xx
        setProjectInfo(project);
        // dispatch(setProject(project));
      })
      .catch((err) => {
        console.log(err.message);
      }
      );
  }, [projectId]);


  console.log(projectInfo);

  return (
    <div className="normal-div" onClick={handleClickOutside}>
      {user && projectInfo && (<ProjectInfo
        projectInfo={projectInfo}
        setProjectInfo={setProjectInfo}
        isProfileClicked={isProfileClicked}
        setIsProfileClicked={setIsProfileClicked}
        userInfo={user}
      ></ProjectInfo>)}
      {/* <FilterFunc></FilterFunc>s */}
      {overview && projectInfo && <OverView projectId={projectId} projectInfo={projectInfo} setProjectInfo={setProjectInfo} ></OverView>}
      {board && projectInfo && <SectionArena projectId={projectId} projectInfo={projectInfo} setProjectInfo={setProjectInfo} userInfo={user} ></SectionArena>}
      {user && charts && projectInfo && <Charts projectId={projectId} projectInfo={projectInfo} setProjectInfo={setProjectInfo} userInfoOfUser={user}></Charts>}
    </div>
  );
};

export default MainView;
