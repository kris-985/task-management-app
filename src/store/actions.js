export const addTask = (task) => ({
  type: "ADD_TASK",
  payload: task,
});

export const editTask = (task) => ({
  type: "EDIT_TASK",
  payload: task,
});

export const deleteTask = (id) => ({
  type: "DELETE_TASK",
  payload: id,
});

export const reorderTasks = (tasks) => ({
  type: 'REORDER_TASKS',
  payload: tasks,
});

export const resetTimer = (id) => ({
  type: 'RESET_TIMER',
  payload: id,
});
