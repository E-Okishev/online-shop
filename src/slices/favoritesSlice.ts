// @ts-nocheck

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../App";

export const fetchFavorites = createAsyncThunk(
  "products/fetchFavorites",
  async () => {
    const response = await fetch(`${BASE_URL}/favorites`);
    const result = await response.json();

    return result;
  }
);

export const addToFavorites = createAsyncThunk(
  "products/addToFavorites",
  async (product, thunkAPI) => {
    await fetch(`${BASE_URL}/favorites`, {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-type": "application/json",
      },
    });
    thunkAPI.dispatch(fetchFavorites());
  }
);

export const deleteFavorites = createAsyncThunk(
  "products/deleteFavorites",
  async (id, thunkAPI) => {
    await fetch(`${BASE_URL}/favorites/${id}`, {
      method: "DELETE",
    });
    thunkAPI.dispatch(fetchFavorites());
  }
);

const initialState = {
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
      state.favorites = action.payload;
    });
    builder.addCase(fetchFavorites.rejected, (state, action) => {
      state.favoritesLoading = false;
      state.favoritesError = true;
    });
  },
});

export default favoritesSlice.reducer;
