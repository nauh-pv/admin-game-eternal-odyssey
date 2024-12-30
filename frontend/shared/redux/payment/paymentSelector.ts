import { RootState } from "../store";

export const selectTotalBalance = (state: RootState) =>
  state.payment.totalBalance;

export const selectTotalBalanceStatus = (state: RootState) =>
  state.payment.status;
