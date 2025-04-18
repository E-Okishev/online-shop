import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../App";
import { ProductType } from "../utils";
import { AppDispatch } from "./store";

export const loadCart = createAsyncThunk<ProductType[]>(
  "products/loadCart",
  async () => {
    const response = await fetch(`${BASE_URL}/cart`);
    const result = await response.json();

    return result;
  }
);

export const addToCart = createAsyncThunk<
  void,
  ProductType,
  { dispatch: AppDispatch }
>("products/addToCart", async (product, { dispatch }) => {
  await fetch(`${BASE_URL}/cart`, {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-type": "application/json",
    },
  });
  dispatch(loadCart());
});

export const deleteCart = createAsyncThunk<
  void,
  number,
  { dispatch: AppDispatch }
>("products/deleteCart", async (id, { dispatch }) => {
  await fetch(`${BASE_URL}/cart/${id}`, {
    method: "DELETE",
  });
  dispatch(loadCart());
});

export const updateProductInCart = createAsyncThunk<ProductType, ProductType>(
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

type InitialStateTypes = {
  cartLoading: boolean;
  cartError: boolean;
  cart: ProductType[];
};

const initialState: InitialStateTypes = {
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
      const updatedIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (updatedIndex !== -1) {
        state.cart[updatedIndex] = action.payload;
      }
    });
  },
  reducers: {},
});

export default cartSlice.reducer;
