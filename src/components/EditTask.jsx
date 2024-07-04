import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { FaUserClock } from "react-icons/fa";
import styled from "styled-components";
import { editTask } from "../reducers/taskReducer";

const EditTask = () => {
  const { id } = useParams();
  const { tasks } = useSelector((state) => state.taskReducer);
  const task = tasks.find((task) => task.id === id);
  const [name, setName] = useState(task ? task.name : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [priority, setPriority] = useState(task ? task.priority : "low");
  const [dueDate, setDueDate] = useState(task ? task.dueDate : "");
  const [timeSpent, setTimeSpent] = useState(task ? task.timeSpent || 0 : 0);
  const [isTimerRunning, setIsTimerRunning] = useState(
    task ? task.isTimerRunning || false : false
  );
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
        setTimeSpent((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isTimerRunning]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") return;
    dispatch(
      editTask({
        id,
        name,
        description,
        priority,
        dueDate,
        timeSpent,
        isTimerRunning,
      })
      );
    navigate("/");
  };

  const handleStartStopTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  return (
    <Container>
      <TitleTask>Edit Task</TitleTask>
      <Form>
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
      </Form>
      <ButtonContainer>
        <Button onClick={handleSubmit}>Save</Button>
        <RightButtonContainer>
          <TimerStyled>
            <IconAndText>
              <FaUserClockStyled />
              <Paragraph>
                {Math.floor(timeSpent / 3600)}h{" "}
                {Math.floor((timeSpent % 3600) / 60)}m {timeSpent % 60}s
              </Paragraph>
            </IconAndText>
          </TimerStyled>
          <Button onClick={handleStartStopTimer}>
            {isTimerRunning ? "Pause" : "Start"}
          </Button>
        </RightButtonContainer>
      </ButtonContainer>
    </Container>
  );
};

export default EditTask;

const Container = styled.div`
  padding: 20px;
`;

const TitleTask = styled.h1`
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
  font-size: 1.5em;
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

  &:hover {
    background: #0056b3;
  }
`;

const Timer = styled.div`
  display: flex;
  align-items: center;
`;

const IconAndText = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const FaUserClockStyled = styled(FaUserClock)`
  font-size: 20px;
  margin-right: 5px;
`;

const Paragraph = styled.p`
  font-size: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 20px;
`;

const RightButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const TimerStyled = styled(Timer)`
  margin-bottom: 10px;
`;
