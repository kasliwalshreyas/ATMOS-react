import React from "react"
import Nav from 'react-bootstrap/Nav';
import { Route, Router, Routes } from 'react-router-dom';
import SectionArena from './SectionArena';

const ProjectInfo = ({ isProfileClicked, setIsProfileClicked }) => {

    const handleProfileClickedInside = (event) => {
        event.stopPropagation();
        setIsProfileClicked(true);
    };

    return (
        <div className="project-info">
            <div className="project-name-and-logo">
                <div className="project-logo">
                    <img className="project-logo-img" src="https://img.icons8.com/dusk/64/000000/microsoft-project.png" />
                </div>
                <div className="project-name-plus-extra-info">
                    <div className="name-and-track-log">
                        <div className="project-name-div">
                            <h3 className="project-name-heading">ATMOS</h3>
                            <div className="info-favorite-logo">
                                <img className="info-logo-img" src="https://img.icons8.com/material-outlined/24/000000/info--v1.png" />
                                <img className="favorite-logo-img" src="https://img.icons8.com/ios-filled/50/000000/star--v1.png" />
                            </div>
                        </div>
                        <div className="track-log">
                            <p>🟩 On Track</p>
                        </div>
                    </div>
                </div>
                <div className="user-profiles" >
                    <img id='user-profile' className="user-profile" onClick={handleProfileClickedInside} src="https://img.icons8.com/color/48/000000/name--v1.png" />
                    <div id='dropdownMenu-user-profile' className={isProfileClicked ? 'show' : 'hide'}>
                        <a href='/user-profile' className='user-profile-dropdown-option'>Profile</a>
                        <a href='/admin-portal' className='user-profile-dropdown-option'>Admin Portal</a>
                    </div>
                </div>
            </div>
            {/* <Router> */}
            <Nav className="nav-bar" as="ul">
                <Nav.Item as="li">
                    <Nav.Link href="/task/overview" className="nav-option option-1" >Overview</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link href="/task" className="nav-option option-2">Board</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link href="/task/charts" className="nav-option option-2">Charts</Nav.Link>
                </Nav.Item>
            </Nav>
            <hr></hr>
            {/* <Routes>
                    <Route path="/task/overview" element={<SectionArena />} />
                    <Route path="/task" element={<SectionArena />} />
                    <Route path="/task/charts" element={<SectionArena />} />
                </Routes> */}
            {/* </Router> */}

        </div>
    )
}
export default ProjectInfo;