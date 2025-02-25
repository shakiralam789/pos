// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice"; // Example reducer

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
