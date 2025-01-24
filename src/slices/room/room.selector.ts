import { RootState } from "../../store";

export const gameModeSelector = (state: RootState) => state.room.gameMode;

export const gameDataSelector = (state: RootState) => state.room.gameData;

export const gameQuestionsSelector = (state: RootState) => state.room.questions;

export const gameQuestionDuration = (state: RootState) =>
  state.room.questionTimeOut;
