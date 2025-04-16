// @ts-nocheck

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../App";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params) => {
    const response = await fetch(`${BASE_URL}/products?${params}`);
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
