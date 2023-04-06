import React, { Fragment, useState, useEffect } from "react";
import { Button, Card, CardBody, CardTitle, Input } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import "../component/css/Todos.css";
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../services/TaskServices";
const Todolist = () => {
  const [data, setData] = useState(""),
    [searchValue, setSearchValue] = useState(""),
    [searchAssignee, setSearchAssigne] = useState(""),
    [id, setId] = useState(""),
    [name, setName] = useState(""),
    [date, setDate] = useState(""),
    [time, setTime] = useState(""),
    [assigne, setAssigne] = useState(""),
    [file, setFile] = useState(),
    [values, Setvalues] = useState([]);
  useEffect(() => {
    const newName = values.filter((value) =>
      value.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    Setvalues(newName);
    console.log("after search", searchValue);
  }, [searchValue]);
  useEffect(() => {
    const newAssigne = values.filter((value) =>
      value.assigne.toLowerCase().includes(searchAssignee.toLowerCase())
    );
    Setvalues(newAssigne);
    console.log("after search", searchAssignee);
  }, [searchAssignee]);
  const handleSubmit = (e) => {
      e.preventDefault();
      if (id) {
        handleDelete(id);
        let oldData = JSON.parse(localStorage.getItem("postvalue")) || [];
        const oldDataArray = Array.from(oldData);
        const newData = [
          ...oldDataArray,
          {
            id: Date.now(),
            name: name,
            assigne: assigne,
            date: date,
            time: time,
          },
        ];
        localStorage.setItem("postvalue", JSON.stringify(newData));
        setDate("");
        setAssigne("");
        setData("");
        setTime("");
        setName("");
        setId("");
        console.log("id is here");
      } else {
        let oldData = JSON.parse(localStorage.getItem("postvalue")) || [];
        const oldDataArray = Array.from(oldData);
        const newData = [
          ...oldDataArray,
          {
            id: Date.now(),
            name: name,
            assigne: assigne,
            date: date,
            time: time,
          },
        ];
        localStorage.setItem("postvalue", JSON.stringify(newData));
        setData("");
        console.log("Not id is here");
      }
    },
    handleChangeDate = (e) => {
      setDate(e.target.value);
    },
    handleChangeTime = (e) => {
      setTime(e.target.value);
    },
    handleChangeName = (e) => {
      setName(e.target.value);
    },
    handleChangeAssignee = (e) => {
      setAssigne(e.target.value);
    },
    handleDelete = (id) => {
      let localData = localStorage.getItem("postvalue");
      let newList = JSON.parse(localData);
      let dataAll = newList.filter((e) => e.id !== id);
      localStorage.setItem("postvalue", JSON.stringify(dataAll));
    },
    handleEdit = (id) => {
      let localData = localStorage.getItem("postvalue");
      let newList = JSON.parse(localData);
      let index = newList.findIndex((item) => item.id === id);
      console.log("SpecificData", newList[index].name);
      setAssigne(newList[index].assigne);
      setDate(newList[index].date);
      setTime(newList[index].time);
      setName(newList[index].name);
      setId(newList[index].id);
    };
  useEffect(() => {
    const localStorageItems = JSON.parse(localStorage.getItem("postvalue"));
    if (localStorageItems) {
      Setvalues(localStorageItems);
    }
  }, []);
  console.log("values", values);
  function handleChangeimage(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <Fragment>
      <Card className="todo-card">
        <div className="container">
          <div className="left">
            <form onSubmit={(e) => handleSubmit(e)} className="input-form">
              <h3> Write your post here</h3>
              <br />
              <Input
                type="text"
                className="mt-3"
                placeholder="Name"
                value={name}
                onChange={handleChangeName}
              />
              <Input
                type="date"
                className="mt-3"
                value={date}
                onChange={handleChangeDate}
              />
              <Input
                type="time"
                className="mt-3"
                value={time}
                onChange={handleChangeTime}
              />
              <Input
                className="mt-3"
                placeholder="enter Assignee"
                onChange={handleChangeAssignee}
                value={assigne}
              />{" "}
              <br /> <br />
              <div id="msg">
                <Button className="btn" type="submit">
                  Post
                </Button>
                <input type="file" onChange={handleChangeimage} />
              </div>
              {/* <Button className="btn" type="submit">
                Choose Image
              </Button> */}
            </form>
          </div>
          <div className="right">
            <h3>Your posts here</h3>
            <input
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              placeholder="Search by name"
            />
            <input
              type="text"
              onChange={(e) => setSearchAssigne(e.target.value)}
              value={searchAssignee}
              placeholder="Search by Assignee"
            />
            <PerfectScrollbar>
              {values.map((post) => (
                <div key={post.id}>
                  <Card style={{ width: "18rem" }}>
                    <CardBody>
                      <CardTitle>Name:{post.name}</CardTitle>
                      <CardTitle>Assignee:{post.assigne}</CardTitle>
                      <CardTitle>CreateDate:{post.date}</CardTitle>
                      <CardTitle>CreateTime:{post.time}</CardTitle>
                      <span className="options">
                        <i
                          className="fas fa-edit"
                          onClick={() => handleEdit(post.id)}
                        ></i>
                        <i
                          className="fas fa-trash-alt"
                          onClick={() => handleDelete(post.id)}
                        ></i>
                      </span>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </PerfectScrollbar>
          </div>
          <div>
            <img className="image" src={file} />
          </div>
        </div>
      </Card>
    </Fragment>
  );
};

export default Todolist;
