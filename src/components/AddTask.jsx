import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTask } from '../store/actions';
import styled, { css } from 'styled-components';

const AddTask = ({ darkMode }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low'); 
  const [dueDate, setDueDate] = useState(''); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '') return;
    dispatch(addTask({ name, description, priority, dueDate }));
    navigate('/');
  };

  return (
    <Container darkMode={darkMode}>
      <h1>Add Task</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Task Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          darkMode={darkMode}
        />
        <Textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          darkMode={darkMode}
        />
        <Select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          darkMode={darkMode}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Select>
        <Input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          darkMode={darkMode}
        />
        <Button type="submit" darkMode={darkMode}>Save</Button>
      </Form>
    </Container>
  );
};

export default AddTask;

const Container = styled.div`
  padding: 20px;
  background-color: #fff;
  color: #333;

  ${(props) =>
    props.darkMode &&
    css`
      background-color: #333;
      color: #fff;
    `}
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

  ${(props) =>
    props.darkMode &&
    css`
      background-color: #444;
      color: #fff;
      border-color: #666;
    `}
`;

const Textarea = styled.textarea`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;

  ${(props) =>
    props.darkMode &&
    css`
      background-color: #444;
      color: #fff;
      border-color: #666;
    `}
`;

const Select = styled.select`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;

  ${(props) =>
    props.darkMode &&
    css`
      background-color: #444;
      color: #fff;
      border-color: #666;
    `}
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

  ${(props) =>
    props.darkMode &&
    css`
      background: #2196f3;

      &:hover {
        background: #1e88e5;
      }
    `}
`;

