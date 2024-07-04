import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { addTask } from "../reducers/taskReducer";

const AddTask = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") return;
    dispatch(addTask({ name, description, priority, dueDate }));
    navigate("/");
  };

  return (
    <Container>
      <Title>Add Task</Title>
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
    </Container>
  );
};

export default AddTask;

const Container = styled.div`
  padding: 20px;
`;
const Title = styled.h1`
  text-align: center;
  color: #398ab9;
  font-size: 40px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 1.5em;
  border: 3px solid #398ab9;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  margin-bottom: 10px;
  width: 100%;
  height: 300px;
  padding: 12px 20px;
  box-sizing: border-box;
  font-size: 1.5em;
  border: 3px solid #398ab9;
  border-radius: 5px;
  resize: none;
`;

const Select = styled.select`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 1em;
  border: 3px solid #398ab9;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 10rem;
  padding: 10px;
  font-size: 1.5em;
  background: #398ab9;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: center;
  margin-top: 8px;

  &:hover {
    background: #0056b3;
  }
`;
