import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type gameMode = "2v2" | "group";

export interface gameData {
  id: string;
  current_players: number;
  host_id: number;
  max_players: number;
  status: "waiting" | "ready" | "active";
}

interface RoomSlice {
  gameMode?: gameMode;
  gameData?: gameData;
  gameStartTime?: number;
}

const initialState: RoomSlice = {};

const roomSlice = createSlice({
  name: "Room",
  initialState,
  reducers: {
    setGameMode(state, action: PayloadAction<gameMode>) {
      state.gameMode = action.payload;
    },
    setGameData(state, action: PayloadAction<RoomSlice["gameData"]>) {
      const data = action.payload;
      if (data) {
        state.gameData = {
          id: data.id,
          current_players: data.current_players,
          host_id: data.host_id,
          max_players: data.max_players,
          status: data.status,
        };
      }
    },
    setGameStatus(state, action: PayloadAction<gameData["status"]>) {
      if (!state.gameData) return;
      state.gameData.status = action.payload;
    },
    setGameStartTime(state, action: PayloadAction<number>) {
      state.gameStartTime = action.payload;
    },
    setGameID(state, action: PayloadAction<gameData["id"]>) {
      if (!state.gameData) {
        state.gameData = {} as gameData;
      }
      state.gameData.id = action.payload;
    },
  },
});

export const roomActions = {
  ...roomSlice.actions,
};
export const RoomReducer = roomSlice.reducer;
