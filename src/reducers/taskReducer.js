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
      console.log(action.payload);
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
      state.tasks = {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, timeSpent: 0 } : task
        ),
      };
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

// switch (action.type) {
//   case 'ADD_TASK':
//     const newTask = {
//       id: Date.now().toString(),
//       name: action.payload.name,
//       description: action.payload.description,
//       priority: action.payload.priority,
//       dueDate: action.payload.dueDate,
//       timeSpent: 0,
//       isTimerRunning: false,
//     };
//     const addedTasks = [...state.tasks, newTask];
//     localStorage.setItem('tasks', JSON.stringify(addedTasks));
//     return { ...state, tasks: addedTasks };

//   case 'EDIT_TASK':
//     const updatedTasks = state.tasks.map(task =>
//       task.id === action.payload.id ? { ...task, ...action.payload } : task
//     );
//     localStorage.setItem('tasks', JSON.stringify(updatedTasks));
//     return { ...state, tasks: updatedTasks };

//   case 'DELETE_TASK':
//     const filteredTasks = state.tasks.filter(task => task.id !== action.payload);
//     localStorage.setItem('tasks', JSON.stringify(filteredTasks));
//     return { ...state, tasks: filteredTasks };

//   case 'RESET_TIMER':
//     return {
//       ...state,
//       tasks: state.tasks.map(task =>
//         task.id === action.payload ? { ...task, timeSpent: 0 } : task
//       ),
//     };

//   case 'REORDER_TASKS':
//     localStorage.setItem('tasks', JSON.stringify(action.payload));
//     return { ...state, tasks: action.payload };

//   default:
//     return state;
// }
