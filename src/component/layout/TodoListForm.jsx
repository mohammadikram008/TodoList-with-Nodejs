import React, { Fragment, useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Col, Input, Label, Row, Table } from "reactstrap";
import Paper from "@mui/material/Paper";
import Snackbar from "../snackbar";
import TextField from "@mui/material/TextField";
import ReactPaginate from "react-paginate";
//calling api
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../../services/TaskServices";
import "../css/Todos.css";
import SkeletonComponent from "./SkeletonComponent";
// class TodoListForm extends Tasks {
//   state = { tasks: [], currentTask: "" };
//   render() {
//     const { tasks } = this.state;
//     return (
//       <div className="App flex">
//         <Paper elevation={3} className="container">
//           <div className="heading">TO-DO</div>
//           <form
//             onSubmit={this.handleSubmit}
//             className="flex"
//             style={{ margin: "15px 0" }}
//           >
//             <TextField
//               variant="outlined"
//               size="small"
//               style={{ width: "80%" }}
//               value={this.state.currentTask}
//               required={true}
//               onChange={this.handleChange}
//               placeholder="Add New TO-DO"
//             />
//             <Button
//               style={{ height: "40px" }}
//               color="primary"
//               variant="outlined"
//               type="submit"
//             >
//               Add task
//             </Button>
//           </form>
//           <div>
//             {tasks.map((task) => (
//               <Paper key={task._id} className="flex task_container">
//                 <Checkbox
//                   checked={task.completed}
//                   onClick={() => this.handleUpdate(task._id)}
//                   color="primary"
//                 />
//                 <div className={task.completed ? "task line_through" : "task"}>
//                   {task.task}
//                 </div>
//                 <Button
//                   onClick={() => this.handleDelete(task._id)}
//                   color="secondary"
//                 >
//                   delete
//                 </Button>
//               </Paper>
//             ))}
//           </div>
//         </Paper>
//       </div>
//     );
//   }
// }

// export default TodoListForm;

const TodoListForm = () => {
  const [tasks, setTasks] = useState([]),
    [id, setId] = useState(""),
    [message, setMessage] = useState({}),
    [open, setOpen] = useState(false),
    [searchValue, setSearchValue] = useState(""),
    [searchAssignee, setSearchAssigne] = useState(""),
    [name, setName] = useState(""),
    [date, setDate] = useState(""),
    [time, setTime] = useState(""),
    [Duedate, setDueDate] = useState(""),
    [Duetime, setDueTime] = useState(""),
    [assigne, setAssigne] = useState("");
  ///pagination
  const [pageCount, setPageCount] = useState(0);
  const [imagesOffset, setImagesOffset] = useState(0);
  const [currentImages, setCurrentImages] = useState(null);
  useEffect(() => {
    const endOffset = imagesOffset + 2;
    setCurrentImages(tasks.slice(imagesOffset, endOffset));
    setPageCount(Math.ceil(tasks.length / 2));
  }, [tasks, imagesOffset]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 2) % tasks.length;
    setImagesOffset(newOffset);
  };
  //getAlldata
  async function getdata() {
    const data = await getTasks();
    console.log("data", data);
    // let sortedCars1 = data.data.sort(
    //   (a, b) =>
    //     new Date(...a.duedate.split("/").reverse()) -
    //     new Date(...b.duedate.split("/").reverse())
    // );
    const res = data.data
      .slice(0)
      .sort(
        (a, b) =>
          a.duedate.localeCompare(b.duedate) ||
          a.duetime.localeCompare(b.duetime)
      );
    console.log("DueDate", res);
    setTasks(res);
  }
  useEffect(() => {
    try {
      getdata();
      // console.log("data", data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  // console.log("TASk", tasks);

  //submit Data to database
  const handleSubmit = async (e) => {
      e.preventDefault();
      const originalTasks = tasks;
      try {
        if (id) {
          handleDelete(id);
          const { data } = await addTask({
            _id: id,
            name: name,
            assignee: assigne,
            date: date,
            time: time,
            duedate: Duedate,
            duetime: Duetime,
          });

          if (data) {
            const tasks = originalTasks;
            tasks.push(data);
            setName("");
            setTasks("");
            setAssigne("");
            setDate("");
            setTime("");
            setDueDate("");
            setDueTime("");
            setId("");
            setOpen(true);
            setMessage({ text: "Updated successfully ", type: "success" });
          } else {
            setOpen(true);
            setMessage({ text: "Error", type: "danger" });
          }
        } else {
          const { data } = await addTask({
            name: name,
            assignee: assigne,
            date: date,
            time: time,
            duedate: Duedate,
            duetime: Duetime,
          });
          if (data) {
            const tasks = originalTasks;
            tasks.push(data);
            setName("");
            setTasks("");
            setAssigne("");
            setDate("");
            setTime("");
            setDueDate("");
            setDueTime("");
            setOpen(true);
            setOpen(true);
            setMessage({ text: "Save successfully ", type: "success" });
          } else {
            setOpen(true);
            setMessage({ text: "Error", type: "danger" });
          }
        }
      } catch (error) {
        console.log(error);
        setOpen(true);
        setMessage({ text: "Error", error });
      }
    },
    ///update data in database
    handleUpdate = async (currentTask) => {
      const originalTasks = tasks;
      try {
        const tasks = [...originalTasks];
        const index = tasks.findIndex((task) => task._id === currentTask);
        tasks[index] = { ...tasks[index] };
        console.log("editIndex", tasks[index]);
        setName(tasks[index].name);
        setAssigne(tasks[index].assignee);
        setDate(tasks[index].date);
        setTime(tasks[index].time);
        setDueDate(tasks[index].duedate);
        setDueTime(tasks[index].duetime);
        setId(tasks[index]._id);
        // tasks[index].completed = !tasks[index].completed;
        setTasks(tasks);
        await updateTask(currentTask, {
          completed: tasks[index].completed,
        });
      } catch (error) {
        setTasks(originalTasks);
        console.log(error);
      }
    },
    ///delete data from database
    handleDelete = async (currentTask) => {
      const originalTasks = tasks;
      try {
        const tasks = originalTasks.filter((task) => task._id !== currentTask);
        setTasks(tasks);
        await deleteTask(currentTask);
      } catch (error) {
        setTasks(originalTasks);
        console.log(error);
      }
    },
    //set State
    handleChangeDate = (e) => {
      setDate(e.target.value);
    },
    handleChangeTime = (e) => {
      setTime(e.target.value);
    },
    handleChangeDueDate = (e) => {
      setDueDate(e.target.value);
    },
    handleChangeDueTime = (e) => {
      setDueTime(e.target.value);
    },
    handleChangeName = (e) => {
      setName(e.target.value);
    },
    handleChangeAssignee = (e) => {
      setAssigne(e.target.value);
    },
    ///searchByName
    handleSearchByName = async (e) => {
      let key = searchValue;
      setSearchAssigne("");

      if (key) {
        let result = await fetch(
          `http://localhost:8080/api/tasks/search/${key}`
        );
        result = await result.json();
        console.log("result:", result);
        if (result) {
          setTasks(result);
        }
      } else {
        setSearchValue("");
        getdata();
      }
    },
    ///SearchByAssinge
    handleSearchByAssignee = async (e) => {
      let key = searchAssignee;
      setSearchValue("");
      if (key) {
        let result = await fetch(
          `http://localhost:8080/api/tasks/search/${key}`
        );
        result = await result.json();
        console.log("result:", result);
        if (result) {
          setTasks(result);
        }
      } else {
        setSearchAssigne("");
        getdata();
      }
    },
    handleSortbyduedate = () => {};

  return (
    <Fragment>
      <Row className="m-0">
        <Col md={12}>
          <div className="App ">
            <Paper elevation={3} className="container">
              <div className="heading">TO-DO LIST</div>
              <div className="d-flex ">
                <Input
                  type="search"
                  size="small"
                  style={{ width: "20%" }}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search by name"
                />
                <Button
                  variant="outlined"
                  className="searchbtn"
                  onClick={handleSearchByName}
                >
                  searchbyName
                </Button>
                <Input
                  type="search"
                  size="small"
                  style={{ width: "20%" }}
                  onChange={(e) => setSearchAssigne(e.target.value)}
                  value={searchAssignee}
                  placeholder="Search by Assignee"
                />
                <Button
                  variant="outlined"
                  className="searchbtn"
                  onClick={handleSearchByAssignee}
                >
                  searchbyAssignee
                </Button>
              </div>
              <form
                onSubmit={handleSubmit}
                className=""
                style={{ margin: "15px 0" }}
              >
                <TextField
                  variant="outlined"
                  size="small"
                  style={{ width: "100%" }}
                  value={name}
                  required={true}
                  className="mt-3"
                  onChange={handleChangeName}
                  placeholder="Enter Name"
                />
                <TextField
                  variant="outlined"
                  size="small"
                  value={assigne}
                  style={{ width: "100%" }}
                  className="mt-3"
                  required={true}
                  onChange={handleChangeAssignee}
                  placeholder="Enter Assignee"
                />
                <Label>StartDate</Label>
                <Input
                  type="date"
                  className=""
                  value={date}
                  onChange={handleChangeDate}
                />
                <Label>StartTime</Label>
                <Input
                  type="time"
                  className=""
                  value={time}
                  onChange={handleChangeTime}
                />
                <Label>DueDate</Label>
                <Input
                  type="date"
                  className=""
                  value={Duedate}
                  onChange={handleChangeDueDate}
                />
                <Label>DueTime</Label>
                <Input
                  type="time"
                  className=""
                  value={Duetime}
                  onChange={handleChangeDueTime}
                />
                <Button
                  style={{ height: "40px" }}
                  color="primary"
                  className="mt-3"
                  variant="outlined"
                  type="submit"
                >
                  Add task
                </Button>
              </form>
              {tasks ? (
                <div>
                  <Table style={{ border: "1" }}>
                    <thead>
                      <tr style={{ padding: "0 1rem" }}>
                        <th>Name</th>
                        <th>Assignee</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>DueDate</th>
                        <th>DueTime</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.length > 0 ? (
                        currentImages.map((tasks) => (
                          <tr key={tasks._id}>
                            <td>{tasks.name}</td>
                            <td>{tasks.assignee}</td>
                            <td>{tasks.date}</td>
                            <td>{tasks.time}</td>
                            <td>{tasks.duedate}</td>
                            <td>{tasks.duetime}</td>

                            <td>
                              <span className="options ">
                                <i
                                  className="fas fa-edit"
                                  onClick={() => handleUpdate(tasks._id)}
                                ></i>
                                <i
                                  className=" fas fa-trash-alt del"
                                  onClick={() => handleDelete(tasks._id)}
                                ></i>
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <SkeletonComponent />
                          {/* <td colSpan={3}>No Task is here</td> */}
                        </tr>
                      )}
                      {tasks.length > 1 && (
                        <ReactPaginate
                          breakLabel="..."
                          nextLabel="next >"
                          onPageChange={handlePageClick}
                          pageRangeDisplayed={2}
                          pageCount={pageCount}
                          previousLabel="< previous"
                          renderOnZeroPageCount={null}
                          breakClassName={"page-item"}
                          breakLinkClassName={"page-link"}
                          containerClassName={"pagination"}
                          pageClassName={"page-item"}
                          pageLinkClassName={"page-link"}
                          previousClassName={"page-item"}
                          previousLinkClassName={"page-link"}
                          nextClassName={"page-item"}
                          nextLinkClassName={"page-link"}
                          activeClassName={"active"}
                        />
                      )}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <SkeletonComponent />
              )}
            </Paper>
          </div>
        </Col>
      </Row>
      <Snackbar open={open} message={message} setOpen={setOpen} />
    </Fragment>
  );
};

export default TodoListForm;
