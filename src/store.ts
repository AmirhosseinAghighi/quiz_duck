import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./slices/user.slice";

const store = configureStore({
  reducer: {
    user: AuthReducer,
  },
  preloadedState: {},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
