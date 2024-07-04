import React from "react";
import { Route, Routes } from "react-router-dom";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";
import "./index.css";

const App = () => {
  
  return (
      <Routes>
        <Route path="/" exact element={<TaskList />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/edit/:id" element={<EditTask />} />
      </Routes>
  );
};

export default App;
