import ProjectInfo from "./ProjectInfo";
import FilterFunc from "./FilterFunc";
import SectionArena from "./SectionArena";
import { useState, useEffect } from "react";
import OverView from "../Overview/OverView";
import Charts from "../Charts/Charts";
import Navbar from "../../../UI/Navbar";
import React from "react";
import Timeline from "../Timeline/Timeline";
import { useSelector, useDispatch } from "react-redux";
import { setProject } from "../../../features/projectSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar_v2 from "../../../UI/Navbar_v2";
import ProjectInfo_v2 from "./ProjectInfo_v2";

const MainView = ({ overview, board, charts, timeline }) => {


  const { id: projectID } = useParams();
  // console.log(projectID, 'id from main view');

  const navigate = useNavigate();

  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const [projectId, setProjectId] = useState(projectID);
  const [projectInfo, setProjectInfo] = useState(null);
  const [user, setUser] = useState(null);
  const [userAccessLevel, setUserAccessLevel] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');


  useEffect(() => {
    const user = async () => {
      const res = await fetch("http://localhost:4000/user/getUserInfo", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      console.log(data, 'userInfo from main view');
      setUser(data.user);
      return data;
    }
    user();
  }, [projectID]);


  useEffect(() => {
    const project = async () => {
      const res = await fetch(`http://localhost:4000/project/getProjectDetails/${projectId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      console.log(data, 'projectInfo from main view');
      setProjectInfo(data.project);
      return data;
    }
    project();
  }, [projectID]);






  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.user.user);
  const handleClickOutside = (event) => {
    event.stopPropagation();
    setIsProfileClicked(false);
  };

  return (
    <>
      {/* <Navbar /> */}
      {/* <Navbar_v2 activeLink={'/projects'} /> */}
      <div className="normal-div" onClick={handleClickOutside}>
        {/* {user && projectInfo && (
          <ProjectInfo
            projectInfo={projectInfo}
            setProjectInfo={setProjectInfo}
            isProfileClicked={isProfileClicked}
            setIsProfileClicked={setIsProfileClicked}
            userInfo={user}
          ></ProjectInfo>
        )} */}
        {
          user && projectInfo && (
            <ProjectInfo_v2
              projectInfo={projectInfo}
              setProjectInfo={setProjectInfo}
              isProfileClicked={isProfileClicked}
              setIsProfileClicked={setIsProfileClicked}
              userInfo={user}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            ></ProjectInfo_v2>
          )


        }


        {/* <FilterFunc></FilterFunc>s */}
        {activeTab === 'Overview' && projectInfo && (
          <OverView
            projectId={projectId}
            projectInfo={projectInfo}
            setProjectInfo={setProjectInfo}
            userInfo={user}
          ></OverView>
        )}
        {activeTab === 'Board' && projectInfo && (
          <SectionArena
            projectId={projectId}
            projectInfo={projectInfo}
            setProjectInfo={setProjectInfo}
            userInfo={user}
          ></SectionArena>
        )}
        {user && activeTab === 'Charts' && projectInfo && (
          <Charts
            projectId={projectId}
            projectInfo={projectInfo}
            setProjectInfo={setProjectInfo}
            userInfoOfUser={user}
          ></Charts>
        )}
        {user && activeTab === 'Timeline' && projectInfo && (
          <Timeline
            projectId={projectId}
            projectInfo={projectInfo}
            setProjectInfo={setProjectInfo}
            userInfoOfUser={user}
          ></Timeline>
        )}
      </div>
    </>
  );
};

export default MainView;
