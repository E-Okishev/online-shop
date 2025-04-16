// @ts-nocheck

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../App";

export const loadProduct = createAsyncThunk(
  "products/loadProduct",
  async (id) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    const result = await response.json();

    return result;
  }
);

export const loadComments = createAsyncThunk(
  "products/loadComments",
  async (id) => {
    const response = await fetch(`${BASE_URL}/comments?productId=${id}`);
    const result = await response.json();

    return result;
  }
);

export const createComment = createAsyncThunk(
  "products/createComment",
  async (comment, { dispatch }) => {
    await fetch(`${BASE_URL}/comments`, {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-type": "application/json",
      },
    });
    dispatch(loadComments(comment.productId));
  }
);

const initialState = {
  product: null,
  comments: [],
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loadProduct.fulfilled, (state, action) => {
      state.product = action.payload;
    });

    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
  },
});

export default productSlice.reducer;
