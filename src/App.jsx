import React from "react";
import { Route, Routes } from "react-router-dom";
import { AddTask, EditTask, TaskList } from "./components";
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
