import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./slices/user.slice";

const store = configureStore({
  reducer: {
    AuthReducer,
  },
  preloadedState: {},
});
