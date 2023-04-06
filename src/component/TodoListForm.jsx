import React, { Fragment, useState, useEffect } from "react";
import Tasks from "../Task";
import { Checkbox, Button } from "@mui/material";
import { Col, Input, Row, Table } from "reactstrap";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../services/TaskServices";
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
    [searchValue, setSearchValue] = useState(""),
    [searchAssignee, setSearchAssigne] = useState(""),
    [name, setName] = useState(""),
    [date, setDate] = useState(""),
    [time, setTime] = useState(""),
    [assigne, setAssigne] = useState("");

  async function getdata() {
    const data = await getTasks();
    setTasks(data.data);
  }
  useEffect(() => {
    const newName = tasks.filter((value) =>
      value.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setTasks(newName);
    console.log("after search", searchValue);
  }, [searchValue]);
  useEffect(() => {
    const newAssigne = tasks.filter((value) =>
      value.assignee.toLowerCase().includes(searchAssignee.toLowerCase())
    );
    setTasks(newAssigne);
    console.log("after search", searchAssignee);
  }, [searchAssignee]);
  useEffect(() => {
    try {
      const data = getdata();
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log("TASk", tasks);

  const handleSubmit = async (e) => {
      e.preventDefault();

      const originalTasks = tasks;
      try {
        if (id) {
          handleDelete(id);
          const { data } = await addTask({
            name: name,
            assignee: assigne,
            date: date,
            time: time,
          });
          const tasks = originalTasks;
          tasks.push(data);
          setName("");
          setTasks("");
          setAssigne("");
          setDate("");
          setTime("");
          setId("");
        } else {
          const { data } = await addTask({
            name: name,
            assignee: assigne,
            date: date,
            time: time,
          });
          const tasks = originalTasks;
          tasks.push(data);
          setName("");
          setTasks("");
          setAssigne("");
          setDate("");
          setTime("");
        }
      } catch (error) {
        console.log(error);
      }
    },
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
    };
  return (
    <Fragment>
      <Row>
        <Col md={12}>
          <div className="App ">
            <Paper elevation={3} className="container">
              <div className="heading">TO-DO LIST</div>
              <div className="d-flex ">
                <Input
                  type="search"
                  size="small"
                  style={{ width: "20%" }}
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                  placeholder="Search by name"
                />
                <Input
                  type="search"
                  size="small"
                  style={{ width: "20%" }}
                  onChange={(e) => setSearchAssigne(e.target.value)}
                  value={searchAssignee}
                  placeholder="Search by Assignee"
                />
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
              <div>
                <Table style={{ border: "1" }}>
                  <thead>
                    <tr style={{ padding: "0 1rem" }}>
                      <th>Name</th>
                      <th>Assignee</th>
                      <th>Date</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.length > 0 ? (
                      tasks.map((tasks) => (
                        <tr key={tasks._id}>
                          <td>{tasks.name}</td>
                          <td>{tasks.assignee}</td>
                          <td>{tasks.date}</td>
                          <td>{tasks.time}</td>

                          <td>
                            <span className="options">
                              <i
                                className="fas fa-edit"
                                onClick={() => handleUpdate(tasks._id)}
                              ></i>
                              <i
                                className=" fas fa-trash-alt"
                                onClick={() => handleDelete(tasks._id)}
                              ></i>
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3}>No Task is here</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Paper>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default TodoListForm;
