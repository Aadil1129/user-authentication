import { configureStore, getDefaultMiddleware, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slice/userdetail";

const rootReducer = combineReducers({
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: process.env.NEXT_PUBLIC_ENV === "dev",
});

export default store;
