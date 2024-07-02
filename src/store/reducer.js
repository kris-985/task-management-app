const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
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
      localStorage.setItem('tasks', JSON.stringify(addedTasks));
      return { ...state, tasks: addedTasks };

    case 'EDIT_TASK':
      const updatedTasks = state.tasks.map(task =>
        task.id === action.payload.id ? { ...task, ...action.payload } : task
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { ...state, tasks: updatedTasks };

    case 'DELETE_TASK':
      const filteredTasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(filteredTasks));
      return { ...state, tasks: filteredTasks };

    case 'RESET_TIMER':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload ? { ...task, timeSpent: 0 } : task
        ),
      };

    case 'REORDER_TASKS':
      localStorage.setItem('tasks', JSON.stringify(action.payload));
      return { ...state, tasks: action.payload };

    default:
      return state;
  }
};

export default reducer;
