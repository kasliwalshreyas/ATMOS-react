import React from "react"
import { Link } from "react-router-dom"
import Dropdown from 'react-bootstrap/Dropdown';

const UserDropdown = () => {
    return (
        <Dropdown>
        <Dropdown.Toggle variant="white" id="dropdown-basic">
            <img className="user-img" alt="user" src="./images/User/user-48.png" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item href="/profile">Profile</Dropdown.Item>
            <Dropdown.Item href="/admin-portal">Admin Portal</Dropdown.Item> 
        </Dropdown.Menu>
        </Dropdown>
    );
};

export default UserDropdown;