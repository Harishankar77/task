import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  deleteTodoAsync,
  getByIdTodoAsync,
  getTodoAsync,
  todoCreateAsync,
  updateTodoAsync,
  updateStatusTask,
} from "../services/todoService";

const initialState = {
  isSubmitting: false,
  isLoading: false,
  isDeleting: false,
  todo: [],
  todoById: {},
  active: 0,
  total: 0,
  completed: 0,
};

const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // Get all Todos
    builder.addMatcher(isAnyOf(getTodoAsync.pending), (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(
      isAnyOf(getTodoAsync.fulfilled),
      (state, { payload }) => {
        state.isLoading = false;
        state.todo = payload?.data;
        state.active = payload?.active;
        state.total = payload?.total;
        state.completed = payload?.completed;
      }
    );
    builder.addMatcher(isAnyOf(getTodoAsync.rejected), (state) => {
      state.isLoading = false;
      state.todo = [];
    });
    // Get By id
    builder.addMatcher(isAnyOf(getByIdTodoAsync.pending), (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(
      isAnyOf(getByIdTodoAsync.fulfilled),
      (state, { payload }) => {
        state.isLoading = false;
        state.todoById = payload?.data;
      }
    );
    builder.addMatcher(isAnyOf(getByIdTodoAsync.rejected), (state) => {
      state.isLoading = false;
    });

    // Create todos
    builder.addMatcher(isAnyOf(todoCreateAsync.pending), (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(isAnyOf(todoCreateAsync.fulfilled), (state) => {
      state.isLoading = false;
    });
    builder.addMatcher(isAnyOf(todoCreateAsync.rejected), (state) => {
      state.isLoading = false;
    });

    // Update Todo
    builder.addMatcher(isAnyOf(updateTodoAsync.pending), (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(isAnyOf(updateTodoAsync.fulfilled), (state) => {
      state.isLoading = false;
    });
    builder.addMatcher(isAnyOf(updateTodoAsync.rejected), (state) => {
      state.isLoading = false;
    });

    // Delete Todo
    builder.addMatcher(isAnyOf(deleteTodoAsync.pending), (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(isAnyOf(deleteTodoAsync.fulfilled), (state) => {
      state.isLoading = false;
    });
    builder.addMatcher(isAnyOf(deleteTodoAsync.rejected), (state) => {
      state.isLoading = false;
    });

    // update todostatus
    builder.addMatcher(isAnyOf(updateStatusTask.pending), (state) => {
      state.isSubmitting = true;
    });
    builder.addMatcher(isAnyOf(updateStatusTask.fulfilled), (state) => {
      state.isSubmitting = false;
    });
    builder.addMatcher(isAnyOf(updateStatusTask.rejected), (state) => {
      state.isSubmitting = false;
    });
  },
});

export default TodoSlice.reducer;
