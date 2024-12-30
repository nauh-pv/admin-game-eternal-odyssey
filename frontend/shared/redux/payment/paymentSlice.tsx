import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getTotalBalance } from "@/services/apiServices";
import { setLoading } from "../loading/loadingSlice";

// Thunk để fetch total balance từ API
export const fetchTotalBalance = createAsyncThunk<number, { user_id: number }>(
  "payment/fetchTotalBalance",
  async ({ user_id }, thunkAPI) => {
    const { dispatch } = thunkAPI;

    dispatch(setLoading({ key: "payment", value: true }));

    try {
      const response = await getTotalBalance(user_id);
      return response.data.total_balance;
    } catch (error) {
      dispatch(setLoading({ key: "payment", value: false }));
      return thunkAPI.rejectWithValue("Unable to fetch total balance");
    } finally {
      dispatch(setLoading({ key: "payment", value: false }));
    }
  }
);

// Khởi tạo state ban đầu
interface PaymentState {
  totalBalance: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PaymentState = {
  totalBalance: 0,
  status: "idle",
  error: null,
};

// Tạo slice cho payment
const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setTotalBalance: (state, action: PayloadAction<number>) => {
      state.totalBalance = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalBalance.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchTotalBalance.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.status = "succeeded";
          state.totalBalance = action.payload;
        }
      )
      .addCase(fetchTotalBalance.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default paymentSlice.reducer;
export const { setTotalBalance } = paymentSlice.actions;
