import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Todolist from "./Todolist";
import TodoListForm from "./TodoListForm";

const MainPage = () => {
  const value = useParams();
  console.log("useParam", value);
  return (
    <Fragment>
      <div className="d-flex ">
        <Sidebar />
        <div className="mainpage">
          <Navbar />

          <TodoListForm />
          {/* <Todolist /> */}
        </div>
      </div>
    </Fragment>
  );
};

export default MainPage;
