import React, { Fragment } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Todolist from "./Todolist";

const MainPage = () => {
  return (
    <Fragment>
      <div className="d-flex ">
        <Sidebar />
        <div className="mainpage">
          <Navbar />
          <Todolist />
        </div>
      </div>
    </Fragment>
  );
};

export default MainPage;
