import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteTask, reorderTasks, resetTimer } from '../store/actions';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { RiSearchLine } from "react-icons/ri";


const TaskList = () => {
  const [search, setSearch] = useState('');
  const tasks = useSelector((state) =>
    [...state.tasks].sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    })
  );
  const dispatch = useDispatch();

  const filteredTasks = tasks.filter(task => 
    task.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(id));
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(filteredTasks);
    const [reorderedItem] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, reorderedItem);

    dispatch(reorderTasks(reorderedTasks));
  };

  const handleResetTimer = (id) => {
    dispatch(resetTimer(id));
  };

  return (
    <Container>
      <h1>Task List</h1>
      <Link to="/add">
        <AddButton>Add Task</AddButton>
      </Link>
      <SearchContainer>
        <RiSearchLineStyled />
        <SearchBar 
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </SearchContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {filteredTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <TaskItem 
                      ref={provided.innerRef} 
                      {...provided.draggableProps} 
                      {...provided.dragHandleProps}
                    >
                      <TaskInfo>
                        <h3>{task.name}</h3>
                        <p>{task.description}</p>
                        {task.priority && (
                          <TaskPriority priority={task.priority}>
                            Priority:
                            {task.priority.charAt(0).toUpperCase() +
                              task.priority.slice(1)}
                          </TaskPriority>
                        )}
                        {task.dueDate && <p>Due Date: {task.dueDate}</p>}
                        <p>Time Spent: {Math.floor(task.timeSpent / 3600)}h {Math.floor((task.timeSpent % 3600) / 60)}m {task.timeSpent % 60}s</p>
                      </TaskInfo>
                      <TaskActions>
                        <Link to={`/edit/${task.id}`}>
                          <Button>Edit</Button>
                        </Link>
                        <Button onClick={() => handleDelete(task.id)}>Delete</Button>
                        <Button onClick={() => handleResetTimer(task.id)}>Reset Timer</Button>
                      </TaskActions>
                    </TaskItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
};

export default TaskList;

const Container = styled.div`
  padding: 20px;
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
  }
`;
const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 50%;
`;

const RiSearchLineStyled = styled(RiSearchLine)`
  position: absolute;
  left: 10px;
  font-size: 1.5em;
  color: #007bff;
`;

const SearchBar = styled.input`
  padding: 10px 10px 10px 40px;
  font-size: 1em;
  border: 3px solid #007bff;
  border-radius: 10px;
  width: 100%;
`;

const TaskItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 3px solid #007bff;
  margin: 30px;
  background-color: white;
  box-shadow: 10px 10px 10px 0px #004eff;
  -webkit-box-shadow: 10px 10px 10px 0px #0060b3;
  -moz-box-shadow: 10px 10px 10px 0px rgba(12, 9, 214, 0.87);
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
    props.priority === "high"
      ? "#dc3545"
      : props.priority === "medium"
      ? "#ffc107"
      : "#28a745"};
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
`;
