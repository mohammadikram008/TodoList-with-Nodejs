import React, { Fragment, useState, useEffect } from "react";
import { Button, Card, CardBody, CardTitle, Input } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import "../component/css/Todos.css";
const Todolist = () => {
  const [data, setData] = useState(""),
    [id, setId] = useState(""),
    [name, setName] = useState(""),
    [assigne, setAssigne] = useState(""),
    [values, Setvalues] = useState([]);
  const handleSubmit = (e) => {
      e.preventDefault();
      if (id) {
        handleDelete(id);
        let oldData = JSON.parse(localStorage.getItem("postvalue")) || [];
        const oldDataArray = Array.from(oldData);
        const newData = [...oldDataArray, { id: id, value: data }];
        localStorage.setItem("postvalue", JSON.stringify(newData));
        setData("");
        setId("");
        console.log("id is here");
      } else {
        let oldData = JSON.parse(localStorage.getItem("postvalue")) || [];
        const oldDataArray = Array.from(oldData);
        const newData = [...oldDataArray, { id: Date.now(), value: data }];
        localStorage.setItem("postvalue", JSON.stringify(newData));
        setData("");
        console.log("Not id is here");
      }
    },
    handleChange = (e) => {
      setData(e.target.value);
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
      console.log("SpecificData", newList[index].value);
      setData(newList[index].value);
      setId(newList[index].id);
    };
  useEffect(() => {
    const localStorageItems = JSON.parse(localStorage.getItem("postvalue"));
    if (localStorageItems) {
      Setvalues(localStorageItems);
    }
  }, []);
  console.log("values", values);
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
              />
              <Input type="date" className="mt-3" value={name} />
              <Input type="time" className="mt-3" value={name} />
              <textarea
                className="mt-3"
                placeholder="enter Assignee"
                onChange={handleChange}
                value={data}
                id="input"
                cols="30"
                rows="3"
              />{" "}
              <br /> <br />
              <div id="msg"></div>
              <Button type="submit">Post</Button>
            </form>
          </div>
          <div className="right">
            <h3>Your posts here</h3>
            <PerfectScrollbar>
              {values.map((post) => (
                <div key={post.id}>
                  <Card style={{ width: "18rem" }}>
                    <CardBody>
                      <CardTitle>{post.value}</CardTitle>
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
        </div>
      </Card>
    </Fragment>
  );
};

export default Todolist;
