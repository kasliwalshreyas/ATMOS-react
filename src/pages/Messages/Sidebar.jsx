import React from 'react';
// import style from './sidebar.module.css';

const Sidebar = ({projects, user}) => {
  console.log("Sidebar", projects)
  return (
    <nav className="sidenav">
     {projects && (projects.map((project) => {
                return(
                    <>
                    <button className="dropdown-btn">{project.name}
                    <i className="fa fa-caret-down"></i>
                    </button>
                    <h2>High Access</h2>
                    {project.high.map((user) => {
                        if(user.id !== undefined) {
                        return(
                            <div><h1>{user.name}</h1><p>{user.id}</p></div>
                        )
                        }
                    })}
                    <h2>Medium Access</h2>
                    {project.medium.map((user) => {
                        if(user.id !== undefined) {
                        return(
                            <div><h1>{user.name}</h1><p>{user.id}</p></div>
                        )
                        }
                    })}
                    <h2>Low Access</h2>
                    {project.low.map((user) => {
                        if(user.id !== undefined) {
                        return(
                            <div><h1>{user.name}</h1><p>{user.id}</p></div>
                        )
                        }
                    })}
                    </>
            )}))} 
    </nav>
  );
};

export default Sidebar;