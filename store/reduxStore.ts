import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

export const reduxStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;