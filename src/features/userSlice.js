
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { value: { name: "", email: "" } },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
