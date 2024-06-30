import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { editTask } from '../store/actions';
import styled from 'styled-components';

const EditTask = () => {
  const { id } = useParams();
  const tasks = useSelector(state => state.tasks);
  const task = tasks.find(task => task.id === id);
  const [name, setName] = useState(task ? task.name : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!task) {
      navigate('/');
    }
  }, [task, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '') return;
    dispatch(editTask({ id, name, description }));
    navigate('/');
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
        <Button type="submit">Save</Button>
      </Form>
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

const Button = styled.button`
  padding: 10px;
  font-size: 1em;
  background: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #218838;
  }
`;