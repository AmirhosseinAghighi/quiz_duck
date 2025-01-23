import { RootState } from "../../store";

export const gameModeSelector = (state: RootState) => state.room.gameMode;
