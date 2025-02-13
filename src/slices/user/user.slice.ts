import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

//@ts-ignore
const data = window.Bale.initData.user ?? {
  allows_write_to_pm: false,
  first_name: "",
  id: 0,
  username: "",
  photo:
    "https://play-lh.googleusercontent.com/KE0R9mIrxZ37mTGD6IWW0Rjplj0bQrrencXfW9-jTAP-1MvFa6qNal8I6ufwYb2MDNo=w240-h480-rw",
};

interface AuthSlice {
  allows_write_to_pm: boolean;
  first_name: string;
  id: number;
  username: string;
  photo?: string;
}

const initialState: AuthSlice = {
  allows_write_to_pm: data.allows_write_to_pm,
  first_name: data.first_name,
  id: data.id,
  username: data.username,
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setAvatarUrl: (state: AuthSlice, action: PayloadAction<string>) => {
      state.photo = action.payload;
    },
  },
});

export const authActions = {
  ...authSlice.actions,
};
export const AuthReducer = authSlice.reducer;
