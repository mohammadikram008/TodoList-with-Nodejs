import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "../component/css/Navbar.css";

const Navbar = () => {
  return (
    <Fragment>
      <ul className="nav-item">
        <ul className="d-flex nav-list">
          <Link to="/home">
            <li>Home</li>
          </Link>
          <Link to="imageview">
            <li>ImageView</li>
          </Link>
          <li>List</li>
          <li>ContactUS</li>
        </ul>
        <li className="name">MI</li>
      </ul>
    </Fragment>
  );
};

export default Navbar;
