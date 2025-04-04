// @ts-nocheck

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../App";

export const loadProduct = createAsyncThunk(
  "products/loadProduct",
  async (id, thunkAPI) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    const result = await response.json();

    return result;
  }
);

const initialState = {
  product: null,
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loadProduct.fulfilled, (state, action) => {
      state.product = action.payload;
    });
  },
});

export default productSlice.reducer;
