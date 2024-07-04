import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTasks, reorderTasks, resetTimer } from "../reducers/taskReducer";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { RiSearchLine } from "react-icons/ri";
import { TbCalendarDue } from "react-icons/tb";
import { FaUserClock } from "react-icons/fa";

const TaskList = () => {
  const [search, setSearch] = useState("");
  const { tasks = [] } = useSelector((state) => state.taskReducer);
  const dispatch = useDispatch();

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTasks(id));
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
      <Header>Task List</Header>
      <ButtonLink to="/add">
        <AddButton>Add Task</AddButton>
      </ButtonLink>
      <ParentContainer>
        <SearchContainer>
          <RiSearchLineStyled />
          <SearchBar
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchContainer>
      </ParentContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <TaskListContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
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
                            Priority:{" "}
                            {task.priority.charAt(0).toUpperCase() +
                              task.priority.slice(1)}
                          </TaskPriority>
                        )}
                        {task.dueDate && (
                          <Paragraph>
                            <TbCalendarDue /> {task.dueDate}
                          </Paragraph>
                        )}
                        <Paragraph>
                          <FaUserClock /> {Math.floor(task.timeSpent / 3600)}h
                          {Math.floor((task.timeSpent % 3600) / 60)}m
                          {task.timeSpent % 60}s
                        </Paragraph>
                      </TaskInfo>
                      <TaskActions>
                        <Link to={`/edit/${task.id}`}>
                          <Button>Edit</Button>
                        </Link>
                        <Button onClick={() => handleDelete(task.id)}>
                          Delete
                        </Button>
                        <Button onClick={() => handleResetTimer(task.id)}>
                          Reset Timer
                        </Button>
                      </TaskActions>
                    </TaskItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </TaskListContainer>
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
const Header = styled.h1`
  text-align: center;
  color: #398ab9;
  font-size: 40px;
`;

const ButtonLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;

const AddButton = styled.button`
  padding: 20px;
  font-size: 20px;
  background-color: #398ab9;
  color: #fff;
  margin-bottom: 25px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;
const ParentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 600px;
  margin: 0 auto;
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
  border: 3px solid #398ab9;
  border-radius: 10px;
  width: 100%;
`;

const TaskListContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: 1200px) {
    justify-content: space-around;
  }
`;

const TaskItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px;
  border: 3px solid #398ab9;
  margin: 10px;
  background-color: white;
  box-shadow: 3px 3px 10px 0px #1c658c;
  width: calc(33.33% - 20px);
  box-sizing: border-box;
  box-shadow: 10px 10px 10px 0px #1c658c;
  -webkit-box-shadow: 10px 10px 10px 3px #398ab9;
  -moz-box-shadow: 10px 10px 10px 5px rgba(12, 9, 214, 0.87);

  @media (max-width: 1200px) {
    width: calc(50% - 20px);
  }
  @media (max-width: 768px) {
    width: calc(100% - 20px);
  }
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

const Paragraph = styled.p`
  font-size: 14px;
`;

const Button = styled.button`
  padding: 5px 10px;
  font-size: 0.8em;
  background: #398ab9;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;
