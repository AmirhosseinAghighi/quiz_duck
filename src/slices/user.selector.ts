import { RootState } from "../store";

export const userSelector = (state: RootState) => state.user;

export const avatarSelector = (state: RootState) => state.user.photo;
