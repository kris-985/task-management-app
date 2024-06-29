import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../store/actions';
import styled from 'styled-components';



const TaskList = () => {
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(id));
    }
  };

  return (
    <Container>
      <h1>Task List</h1>
      <AddButton to="/add">Add Task</AddButton>
      <TaskListWrapper>
        {tasks.map(task => (
          <TaskItem key={task.id}>
            <TaskDetails>
              <TaskName>{task.name}</TaskName>
              <TaskDescription>{task.description}</TaskDescription>
            </TaskDetails>
            <Link to={`/edit/${task.id}`}>
              <ActionButton>Edit</ActionButton>
            </Link>
            <ActionButton onClick={() => handleDelete(task.id)}>Delete</ActionButton>
          </TaskItem>
        ))}
      </TaskListWrapper>
    </Container>
  );
};

export default TaskList;

const Container = styled.div`
  padding: 20px;
`;

const TaskListWrapper = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const TaskItem = styled.li`
  background: #f9f9f9;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskDetails = styled.div`
  flex-grow: 1;
  margin-right: 20px;
`;

const TaskName = styled.h3`
  margin: 0;
  font-size: 1.2em;
`;

const TaskDescription = styled.p`
  margin: 5px 0;
`;

const ActionButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const AddButton = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  padding: 10px 20px;
  background: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;

  &:hover {
    background: #218838;
  }
`;