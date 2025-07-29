import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../utils/axios";
import { Axios } from "axios";

// get all Todos
export const getTodoAsync = createAsyncThunk(
  "getTodoAsync",
  async (_, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/task/todos",
      method: "get",
    })
);

// Get BY Id Todos
export const getByIdTodoAsync = createAsyncThunk(
  "getByIdTodoAsync",
  async (id, toolkit) =>
    AxiosClient({
      toolkit,
      url: `/task/todo/${id}`,
      method: "get",
    })
);

// Create Todos
export const todoCreateAsync = createAsyncThunk(
  "todoCreateAsync",
  async (data, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/task/todo/create",
      method: "post",
      data,
    })
);

// Update Todos
export const updateTodoAsync = createAsyncThunk(
  "updateTodoAsync",
  async ({ id, title }, toolkit) =>
    AxiosClient({
      toolkit,
      url: `/task/todo/update/${id}`,
      method: "patch",
      data: { title },
    })
);

// Delete Todos
export const deleteTodoAsync = createAsyncThunk(
  "deleteTodoAsync",
  async (id, toolkit) =>
    AxiosClient({
      toolkit,
      url: `/task/todo/delete/${id}`,
      method: "delete",
    })
);

// update status for tasks
export const updateStatusTask = createAsyncThunk(
  "todo/updateStatustaskAsync",
  async ({ id, data }, toolkit) =>
    AxiosClient({
      toolkit,
      url: `/task/todo/update-status/${id}`,
      method: "patch",
      data,
    })
);
