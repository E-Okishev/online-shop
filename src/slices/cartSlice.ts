// @ts-nocheck

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../App";

export const loadCart = createAsyncThunk(
  "products/loadCart",
  async () => {
    const response = await fetch(`${BASE_URL}/cart`);
    const result = await response.json();
    
    return result;
  }
);

export const addToCart = createAsyncThunk(
  "products/addToCart",
  async (product, thunkAPI) => {
    await fetch(`${BASE_URL}/cart`, {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-type": "application/json",
      },
    });
    thunkAPI.dispatch(loadCart());
  }
);

export const deleteCart = createAsyncThunk(
  "products/deleteCart",
  async (id, thunkAPI) => {
    await fetch(`${BASE_URL}/cart/${id}`, {
      method: "DELETE",
    });
    thunkAPI.dispatch(loadCart());
  }
);

export const updateProductInCart = createAsyncThunk(
  "products/updateProductInCart",
  async (updatedProduct) => {
    await fetch(`${BASE_URL}/cart/${updatedProduct.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedProduct),
      headers: {
        "Content-type": "application/json",
      },
    });
    return updatedProduct;
  }
);

const initialState = {
  cartLoading: false,
  cartError: false,
  cart: [],
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loadCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(loadCart.fulfilled, (state, action) => {
      state.cartLoading = false;
      state.cart = action.payload;
    });
    builder.addCase(loadCart.rejected, (state) => {
      state.cartLoading = false;
      state.cartError = true;
    });
    builder.addCase(updateProductInCart.fulfilled, (state, action) => {
      const updatedIndex = state.cart.findIndex((item) => item.id === action.payload.id);
      if (updatedIndex !== -1) {
        state.cart[updatedIndex] = action.payload;
      }
    });
  },
});

export default cartSlice.reducer;
