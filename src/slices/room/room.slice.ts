import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type gameMode = "2v2" | "group";

interface RoomSlice {
  roomID?: string;
  gameMode?: gameMode;
}

const initialState: RoomSlice = {};

const roomSlice = createSlice({
  name: "Room",
  initialState,
  reducers: {
    setGameMode(state, action: PayloadAction<gameMode>) {
      state.gameMode = action.payload;
    },
    setRoomID(state, action: PayloadAction<string>) {
      state.roomID = action.payload;
    },
  },
});

export const rooomActions = {
  ...roomSlice.actions,
};
export const RoomReducer = roomSlice.reducer;
