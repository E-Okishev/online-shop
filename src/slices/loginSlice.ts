import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../App";
import { UserType } from "../utils";

export const registation = createAsyncThunk<UserType, UserType>(
  "user/registation",
  async (userForm) => {
    const result = await fetch(`${BASE_URL}/users`, {
      method: "Post",
      body: JSON.stringify(userForm),
      headers: {
        "Content-type": "application/json",
      },
    });
    const user = await result.json();
    return user;
  }
);

type InitialStateTypes = {
  user: UserType | null;
};

const initialState: InitialStateTypes = {
  user: null,
};

export const registrationSlice = createSlice({
  name: "registrationSlice ",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(registation.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
  reducers: {},
});

export default registrationSlice.reducer;
