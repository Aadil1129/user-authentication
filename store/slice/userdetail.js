/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setuser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setuser } = slice.actions;

export default slice.reducer;
