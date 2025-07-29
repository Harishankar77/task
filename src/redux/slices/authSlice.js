import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { login, signup } from "../services/authService";

const initialState = {
  isSubmitting: false,
  token: "",
  userData: {},
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(login.pending), (state) => {
      state.isSubmitting = true;
    });
    builder.addMatcher(isAnyOf(login.fulfilled), (state, { payload }) => {
      state.isSubmitting = false;
      state.userData = payload.user;
      state.token = payload.token;

      console.log('payload', payload)
    });
    builder.addMatcher(isAnyOf(login.rejected), (state) => {
      state.isSubmitting = false;
    });

    builder.addMatcher(isAnyOf(signup.pending), (state) => {
      state.isSubmitting = true;
    });
    builder.addMatcher(isAnyOf(signup.fulfilled), (state) => {
      state.isSubmitting = false;
    });
    builder.addMatcher(isAnyOf(signup.rejected), (state) => {
      state.isSubmitting = false;
    });
  },
});

export default AuthSlice.reducer;
