import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "../css/Sidebar.css";
const Sidebar = () => {
  return (
    <Fragment>
      <div className="sidebar-mian pl-0 h-100vh" id="sidebar" role="navigation">
        <ul className="nav flex-column sticky-top pl-0  p-3 ">
          <li className="nav-item-sidebar mb-2 mt-3">
            <a className="nav-link" href="/">
              <h5>Mohammad ikram</h5>
            </a>
            <hr />
          </li>

          <li className="nav-item-sidebar mb-2 ">
            <Link className="nav-link" to="/">
              <i className="fas fa-user font-weight-bold"></i>{" "}
              <span className="ml-3">OverView</span>
            </Link>
          </li>
          <li className="nav-item-sidebar ">
            <a
              className="nav-link"
              href="/imageview"
              data-toggle="collapse"
              data-target="#submenu1"
            >
              <i
                className="far fa-file-word 
                    font-weight-bold"
              ></i>{" "}
              <span className="ml-3"> ImageView</span>
            </a>
            <a
              className="nav-link"
              href="/imageview"
              data-toggle="collapse"
              data-target="#submenu1"
            >
              <i
                className="far fa-file
                    font-weight-bold"
              ></i>{" "}
              <span className="ml-3"> List</span>
            </a>
            <a
              className="nav-link"
              href="/imageview"
              data-toggle="collapse"
              data-target="#submenu1"
            >
              <i
                className="fas fa-book-reader
                    font-weight-bold"
              ></i>{" "}
              <span className="ml-3">ContactUs</span>
            </a>
            {/* <ul
              className="list-unstyled flex-column pl-3 collapse"
              id="submenu1"
              aria-expanded="false"
            >
              <li className="nav-item-sidebar ">
                <a className="nav-link" href="">
                  <i className="fas fa-book-reader"></i> List{" "}
                </a>
              </li>
              <li className="nav-item-sidebar  ">
                <a className="nav-link" href="">
                  <i className="fas fa-book-medical"></i> ContactUs{" "}
                </a>
              </li>
            </ul> */}
            <hr />
          </li>
          <li className="nav-item-sidebar ">
            <a className="nav-link " href="#analytic">
              <i className="far fa-chart-bar font-weight-bold"></i>{" "}
              <span className="ml-3">Analytics</span>
            </a>
          </li>
          <li className="nav-item-sidebar ">
            <a className="nav-link" href="#export">
              <i className="fas fa-file-export font-weight-bold"></i>
              <span className="ml-3">Export</span>
            </a>
          </li>
          <li className="nav-item-sidebar ">
            <a className="nav-link" href="#">
              <i className="fas fa-tablet-alt font-weight-bold"></i>
              <span className="ml-3">Snippets</span>
            </a>
          </li>
          <li className="nav-item-sidebar ">
            <a className="nav-link" href="#flex">
              <i className="fas fa-atom font-weight-bold"></i>{" "}
              <span className="ml-3">Flex</span>
            </a>
          </li>
          <li className="nav-item-sidebar ">
            <a className="nav-link" href="#">
              <i className="far fa-folder font-weight-bold"></i>{" "}
              <span className="ml-3">Layouts</span>
            </a>
            <hr />
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default Sidebar;
