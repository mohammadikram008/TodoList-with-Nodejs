import React, { Fragment } from "react";
import "../component/css/Navbar.css";
const Navbar = () => {
  return (
    <Fragment>
      <ul className="nav-item">
        <ul className="d-flex nav-list">
          <li>Home</li>
          <li>About</li>
          <li>List</li>
          <li>ContactUS</li>
        </ul>
        <li>MI</li>
      </ul>
    </Fragment>
  );
};

export default Navbar;
