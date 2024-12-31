import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, UserState } from "../types/commonTypes";

const initialState: AuthState = {
  accessToken: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },
    setUser: (state, action: PayloadAction<UserState | null>) => {
      state.user = action.payload;
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAccessToken, setUser, clearAccessToken } = authSlice.actions;
export default authSlice.reducer;
