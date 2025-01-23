import { RootState } from "../../store";

export const gameModeSelector = (state: RootState) => state.room.gameMode;

export const gameDataSelector = (state: RootState) => state.room.gameData;
