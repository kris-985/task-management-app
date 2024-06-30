import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../store/actions';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const [search, setSearch] = useState('');
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?"))
    dispatch(deleteTask(id));
  };

  const filteredTasks = tasks.filter(task => 
    task.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <h1>Task List</h1>
      <SearchBar 
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TaskLists>
        {filteredTasks.map(task => (
          <TaskItem key={task.id}>
            <TaskDetails>
              <h2>{task.name}</h2>
              <p>{task.description}</p>
            </TaskDetails>
            <TaskActions>
              <Link to={`/edit/${task.id}`}>
                <Button>Edit</Button>
              </Link>
              <DeleteButton onClick={() => handleDelete(task.id)}>Delete</DeleteButton>
            </TaskActions>
          </TaskItem>
        ))}
      </TaskLists>
      <Link to="/add">
        <Button>Add Task</Button>
      </Link>
    </Container>
  );
};

export default TaskList;

const Container = styled.div`
  padding: 20px;
`;

const SearchBar = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 50%;
`;

const TaskLists = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const TaskItem = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskDetails = styled.div`
  flex-grow: 1;
  margin-right: 20px;
`;

const TaskActions = styled.div`
  display: flex;
  gap: 10px;
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

const DeleteButton = styled(Button)`
  background: #dc3545;

  &:hover {
    background: #c82333;
  }
`;

