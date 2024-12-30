import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoadingState {
  global: boolean; // Trạng thái loading toàn trang
  auth: boolean; // Trạng thái loading cho auth
  payment: boolean; // Trạng thái loading cho payment
  listPage: boolean;
}

const initialState: LoadingState = {
  global: false,
  auth: false,
  payment: false,
  listPage: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (
      state,
      action: PayloadAction<{ key: keyof LoadingState; value: boolean }>
    ) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.global = action.payload;
    },
  },
});

export const { setLoading, setGlobalLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
