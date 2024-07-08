import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
};

export const taskReducer = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now().toString(),
        name: action.payload.name,
        description: action.payload.description,
        priority: action.payload.priority,
        dueDate: action.payload.dueDate,
        timeSpent: 0,
        isTimerRunning: false,
      };
      const addedTasks = [...state.tasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(addedTasks));
      state.tasks = addedTasks;
    },
    editTask: (state, action) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.id ? { ...task, ...action.payload } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      state.tasks = updatedTasks;
    },
    deleteTasks: (state, action) => {
      const filteredTasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      localStorage.setItem("tasks", JSON.stringify(filteredTasks));
      state.tasks = filteredTasks;
    },

    resetTimer: (state, action) => {
      const updatedTask = state.tasks.map((task) =>
        task.id === action.payload ? { ...task, timeSpent: 0 } : task
      );
      state.tasks = updatedTask;
    },

    reorderTasks: (state, action) => {
      localStorage.setItem("tasks", JSON.stringify(action.payload));
      state.tasks = action.payload;
    },
  },
});

export const { addTask, editTask, deleteTasks, resetTimer, reorderTasks } =
  taskReducer.actions;

export default taskReducer.reducer;
