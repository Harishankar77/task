import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../utils/axios";

export const login = createAsyncThunk(
  "auth/loginAsync",
  async (data, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/user/login",
      method: "post",
      data,
    })
);

export const signup = createAsyncThunk(
  "auth/signupAsync",
  async (data, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/user/register",
      method: "post",
      data,
    })
);
