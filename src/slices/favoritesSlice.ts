import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../App";
import { ProductType } from "../utils";
import { AppDispatch } from "./store";

export const fetchFavorites = createAsyncThunk<ProductType[]>(
  "products/fetchFavorites",
  async () => {
    const response = await fetch(`${BASE_URL}/favorites`);
    const result = await response.json();

    return result;
  }
);

export const addToFavorites = createAsyncThunk<
  void,
  ProductType,
  { dispatch: AppDispatch }
>("products/addToFavorites", async (product, { dispatch }) => {
  await fetch(`${BASE_URL}/favorites`, {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-type": "application/json",
    },
  });
  dispatch(fetchFavorites());
});

export const deleteFavorites = createAsyncThunk<
  void,
  number,
  { dispatch: AppDispatch }
>("products/deleteFavorites",  async (id, thunkAPI) => {
  await fetch(`${BASE_URL}/favorites/${id}`, {
    method: "DELETE",
  });
  thunkAPI.dispatch(fetchFavorites());
});

type initialStateType = {
  favoritesLoading: boolean;
  favoritesError: boolean;
  favorites: ProductType[];
};

const initialState: initialStateType = {
  favoritesLoading: false,
  favoritesError: false,
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: "favoritesSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchFavorites.pending, (state) => {
      state.favoritesLoading = true;
    });
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state.favoritesLoading = false;
      state.favorites = action.payload;
    });
    builder.addCase(fetchFavorites.rejected, (state) => {
      state.favoritesLoading = false;
      state.favoritesError = true;
    });
  },
  reducers: {},
});

export default favoritesSlice.reducer;
