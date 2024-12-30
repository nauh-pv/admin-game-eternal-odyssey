import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import authReducer from "./authSlice";
import paymentReducer from "./payment/paymentSlice";
import loadingReducer from "./loading/loadingSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import listReducer from "./list/listSlice"; // Import listSlice

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["payment", "list"],
};
const rootReducer = combineReducers({
  main: reducer,
  auth: authReducer,
  payment: paymentReducer,
  loading: loadingReducer,
  list: listReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
