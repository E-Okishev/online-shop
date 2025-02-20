// @ts-nocheck

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from "../App";

export const fetchFavorites = createAsyncThunk(
  "products/fetchFavorites",
  async (userId: number, thunkAPI) => {
    const response = await fetch(`${BASE_URL}/favorites`);
    const result = await response.json();

    return result;
  }
);

const initialState: CounterState = {
  favoritesLoading: false,
  favoritesError: false,
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: "favoritesSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchFavorites.pending, (state, action) => {
      state.favoritesLoading = true;
    });
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state.favoritesLoading = false;
      const dataFromServer = action.payload;
      state.favorites = dataFromServer;
    });
    builder.addCase(fetchFavorites.rejected, (state, action) => {
      state.favoritesLoading = false;
      state.favoritesError = true;
    });
  },
});

export const { loadFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
