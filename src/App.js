import "./App.css";
import Tasks from "./Task";

import { Checkbox, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MainPage from "./component/MainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoListForm from "./component/TodoListForm";
import ImageView from "./component/ImageView";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/imageview" element={<ImageView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
// class App extends Tasks {
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

// export default App;
