// @ts-nocheck

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../App";
import favoritesSlice from "./favoritesSlice";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params, thunkAPI) => {
    const { inputName, selectedCategory, sort } = params;

    const sortQuery = sort ? `&_sort=price&_order=${sort}` : '';
    const response = await fetch(
      `${BASE_URL}/products?q=${inputName}&category_like=${selectedCategory}${sortQuery}`
    );
    const result = await response.json();
    return result;
  }
);

const initialState = {
  productsLoading: false,
  products: [],
};

export const productsSlice = createSlice({
  name: "productsSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.productsLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.productsLoading = false;
      state.products = action.payload;
    });
  },
});

export default productsSlice.reducer;
