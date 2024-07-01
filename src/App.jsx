import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";
import { GiMoon } from "react-icons/gi";
import "./index.css";
import styled from "styled-components";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <Router>
      <div className={darkMode ? "dark-mode" : ""}>
        <Moon onClick={toggleDarkMode}>
          <GiMoon />
          {darkMode ? "" : ""}
        </Moon>
        <Routes>
          <Route path="/" exact element={<TaskList darkMode={darkMode} />} />
          <Route path="/add" element={<AddTask darkMode={darkMode} />} />
          <Route path="/edit/:id" element={<EditTask darkMode={darkMode} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

const Moon = styled.span`
 font-size: 50px;
`;
