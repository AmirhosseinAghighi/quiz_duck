import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./slices/user/user.slice";
import { RoomReducer } from "./slices/room/room.slice";

const store = configureStore({
  reducer: {
    user: AuthReducer,
    room: RoomReducer,
  },
  preloadedState: {},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
