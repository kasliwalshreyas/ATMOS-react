import React from "react"
import { Link } from "react-router-dom"
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="head-atmos">
        <h1>ATMOS</h1>
      </div>
      <div className="links">
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/projects">
          Projects
        </Link>
        <Link
          className="link"
          style={{ padding: "0px 40px 0px 30px" }}
          to="/messages"
        >
          Messages
        </Link>
        {/* <Link className="link" to="/notes">
          Notes
        </Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
