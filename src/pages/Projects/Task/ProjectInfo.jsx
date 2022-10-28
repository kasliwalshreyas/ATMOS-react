import React from "react";
import Nav from "react-bootstrap/Nav";
import { Route, Router, Routes } from "react-router-dom";
import SectionArena from "./SectionArena";
import { useState } from "react";
import useFetch from "../../../useFetch";

<<<<<<< HEAD
const ProjectInfo = ({
  isProfileClicked,
  setIsProfileClicked,
  projectInfo,
  setProjectInfo,
}) => {
  let id = 2;
  const { data: userWanted, isPendings, errors } = useFetch(
    "http://localhost:8000/userList/" + id
  );

  const [starred, setStarred] = useState(false);
  const handleStarClick = () => {
    if (starred === false) {
      setStarred(true);
      userWanted && userWanted.favoriteProjectList.indexOf(id);
    } else {
      let index;
      userWanted && userWanted.favoriteProjectList
        ? (index = userWanted.favoriteProjectList.push(id))
        : (index = -1);
      if (index > -1) {
        userWanted.favoriteProjectList.splice(index, 1);
      }
      setStarred(false);
=======
const ProjectInfo = ({ isProfileClicked, setIsProfileClicked, projectInfo, setProjectInfo }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));


    let id = 2;
    const { data: userWanted, isPendings, errors } = useFetch(
        "http://localhost:8000/userList/" + id
    );

    const [starred, setStarred] = useState(false);
    const handleStarClick = () => {
        if (starred === false) {
            setStarred(true)
            userWanted && userWanted.favoriteProjectList.indexOf(id)
        }
        else {
            let index;
            userWanted && userWanted.favoriteProjectList ? index = userWanted.favoriteProjectList.push(id) : index = -1;
            if (index > -1) {
                userWanted.favoriteProjectList.splice(index, 1);
            }
            setStarred(false)
        }

        fetch(`http://localhost:8000/userList/${id}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userWanted),
        }).then((result) => {
            return result.json();
        });
>>>>>>> ecf2ab3c12c04ee78fec9e1d7dc4c7270dd17a8c
    }

    fetch(`http://localhost:8000/userList/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userWanted),
    }).then((result) => {
      return result.json();
    });
  };
  const handleProfileClickedInside = (event) => {
    event.stopPropagation();
    setIsProfileClicked(true);
  };

  return (
    <div className="project-info">
      <div className="project-name-and-logo">
        <div className="project-logo">
          <img
            className="project-logo-img"
            src="https://img.icons8.com/dusk/64/000000/microsoft-project.png"
          />
        </div>
        <div className="project-name-plus-extra-info">
          <div className="name-and-track-log">
            <div className="project-name-div">
              <h3 className="project-name-heading">
                {projectInfo && projectInfo.projectName}
              </h3>
              <div className="info-favorite-logo">
                <img
                  className="info-logo-img"
                  src="https://img.icons8.com/material-outlined/24/000000/info--v1.png"
                />
                {/* {!starred && <img onClick={handleStarClick} className="favorite-logo-img" src="https://img.icons8.com/ios-filled/50/000000/star--v1.png" />} */}
                {starred && (
                  <img
                    onClick={handleStarClick}
                    className="favorite-logo-img"
                    src="https://www.linkpicture.com/q/star.png"
                  />
                )}
                {!starred && (
                  <img
                    onClick={handleStarClick}
                    className="favorite-logo-img"
                    src="https://www.linkpicture.com/q/star-shape.png"
                  />
                )}
              </div>
            </div>
            <div className="track-log">
              <p>🟩 On Track</p>
            </div>
          </div>
        </div>
        <div className="user-profiles">
          <img
            id="user-profile"
            className="user-profile"
            onClick={handleProfileClickedInside}
            src="https://img.icons8.com/color/48/000000/name--v1.png"
          />
          <div
            id="dropdownMenu-user-profile"
            className={isProfileClicked ? "show" : "hide"}
          >
            <a href="/user-profile" className="user-profile-dropdown-option">
              Profile
            </a>
            <a href="/admin-portal" className="user-profile-dropdown-option">
              Admin Portal
            </a>
          </div>
        </div>
      </div>
      {/* <Router> */}
      <Nav className="nav-bar" as="ul">
        <Nav.Item as="li">
          <Nav.Link href="/task/overview" className="nav-option option-1">
            Overview
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="/task" className="nav-option option-2">
            Board
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="/task/charts" className="nav-option option-2">
            Charts
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <hr></hr>
    </div>
  );
};
export default ProjectInfo;
