import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editTask } from "../store/actions";
import styled from "styled-components";

const EditTask = () => {
  const { id } = useParams();
  const tasks = useSelector((state) => state.tasks);
  const task = tasks.find((task) => task.id === id);
  const [name, setName] = useState(task ? task.name : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [priority, setPriority] = useState(task ? task.priority : "low");
  const [dueDate, setDueDate] = useState(task ? task.dueDate : "");
  const [timeSpent, setTimeSpent] = useState(task ? task.timeSpent || 0 : 0);
  const [isTimerRunning, setIsTimerRunning] = useState(task ? task.isTimerRunning || false : false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timerRef = useRef(null);

  useEffect(() => {
    if (!task) {
      navigate("/");
    }
  }, [task, navigate]);

  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isTimerRunning]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") return;
    dispatch(editTask({ id, name, description, priority, dueDate, timeSpent, isTimerRunning }));
    navigate("/");
  };

  const handleStartStopTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  return (
    <Container>
      <h1>Edit Task</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Task Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Select>
        <Input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <Button type="submit">Save</Button>
      </Form>
      <Timer>
        <p>Time Spent: {Math.floor(timeSpent / 3600)}h {Math.floor((timeSpent % 3600) / 60)}m {timeSpent % 60}s</p>
        <Button onClick={handleStartStopTimer}>
          {isTimerRunning ? "Pause" : "Start"}
        </Button>
      </Timer>
    </Container>
  );
};

export default EditTask;

const Container = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
`;

const Button = styled.button`
  width: 10rem;
  padding: 10px;
  font-size: 1em;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const Timer = styled.div`
  margin-top: 20px;
`;
