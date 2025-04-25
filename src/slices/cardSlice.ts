import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../App";
import { ProductType } from "../utils";

export const createProduct = createAsyncThunk<void, ProductType>(
  "products/createProduct",
  async (product) => {
    await fetch(`${BASE_URL}/products`, {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-type": "application/json",
      },
    });
  }
);

export const loadProduct = createAsyncThunk<ProductType, string>(
  "products/loadProduct",
  async (id) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    const result = await response.json();

    return result;
  }
);

type InitialStateTypes = {
  product: ProductType | null;
};

const initialState: InitialStateTypes = {
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
  reducers: {},
});

export default productSlice.reducer;
