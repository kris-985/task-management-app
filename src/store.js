import { combineReducers, configureStore } from "@reduxjs/toolkit";
import taskReducer from "./reducers/taskReducer";

const rootReducer = combineReducers({ taskReducer });

const store = configureStore({
  reducer: rootReducer,
});

export default store;
