import { createSlice } from "@reduxjs/toolkit";

interface AuthSlice {
  userId?: number;
}

const initialState: AuthSlice = {};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {},
});

export const authActions = {
  ...authSlice.actions,
};
export const AuthReducer = authSlice.reducer;
