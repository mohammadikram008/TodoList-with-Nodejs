import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "../component/css/Navbar.css";

const Navbar = () => {
  return (
    <Fragment>
      <ul className="nav-item">
        <ul className="d-flex nav-list">
          <Link to="/" className="link-item">
            <li>Home</li>
          </Link>
          <Link to="/imageview" className="link-item">
            <li>ImageView</li>
          </Link>
          <Link to="/" className="link-item">
            <li>List</li>
          </Link>
          <Link to="/" className="link-item">
            <li>ContactUS</li>
          </Link>
        </ul>
        <li className="name">MI</li>
      </ul>
    </Fragment>
  );
};

export default Navbar;
