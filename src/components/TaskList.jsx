import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteTask } from '../store/actions';
import styled, { css } from 'styled-components';

const TaskList = ({ darkMode }) => {
  const tasks = useSelector((state) =>
    [...state.tasks].sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    })
  );
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(id));
    }
  };

  return (
    <Container darkMode={darkMode}>
      <h1>Task List</h1>
      <Link to="/add">
        <AddButton darkMode={darkMode}>Add Task</AddButton>
      </Link>
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} darkMode={darkMode}>
            <TaskInfo>
              <h3>{task.name}</h3>
              <p>{task.description}</p>
              {task.priority && (
                <TaskPriority priority={task.priority} darkMode={darkMode}>
                 Priority: {task.priority.charAt(0).toUpperCase() +
                    task.priority.slice(1)}
                </TaskPriority>
              )}
              {task.dueDate && <p>Due Date: {task.dueDate}</p>}
            </TaskInfo>
            <TaskActions>
              <Link to={`/edit/${task.id}`}>
                <Button darkMode={darkMode}>Edit</Button>
              </Link>
              <Button
                onClick={() => handleDelete(task.id)}
                darkMode={darkMode}
              >
                Delete
              </Button>
            </TaskActions>
          </TaskItem>
        ))}
      </ul>
    </Container>
  );
};

export default TaskList;

const Container = styled.div`
  padding: 20px;

  ${(props) =>
    props.darkMode &&
    css`
      background-color: #333;
      color: #fff;
    `}
`;
const AddButton = styled.button`
  padding: 20px;
  font-size: 20px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }`;

const TaskItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;

  ${(props) =>
    props.darkMode &&
    css`
      background-color: #444;
      border-color: #666;
    `}
`;

const TaskInfo = styled.div`
  flex: 1;
`;

const TaskActions = styled.div`
  display: flex;
  gap: 10px;
`;

const TaskPriority = styled.span`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
  color: #fff;
  background-color: ${(props) =>
    props.priority === 'high'
      ? '#dc3545'
      : props.priority === 'medium'
      ? '#ffc107'
      : '#28a745'};

  ${(props) =>
    props.darkMode &&
    css`
      background-color: ${(props) =>
        props.priority === 'high'
          ? '#ff5252'
          : props.priority === 'medium'
          ? '#ffd740'
          : '#66bb6a'};
    `}
`;

const Button = styled.button`
  padding: 5px 10px;
  font-size: 0.9em;
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