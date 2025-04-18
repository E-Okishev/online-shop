import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../App";
import { ProductType } from "../utils";

export const fetchProducts = createAsyncThunk<ProductType[], string>(
  "products/fetchProducts",
  async (params) => {
    const response = await fetch(`${BASE_URL}/products?${params}`);
    const result = await response.json();
    return result;
  }
);

type InitialStateTypes = {
  productsLoading: boolean;
  products: ProductType[];
};

const initialState: InitialStateTypes = {
  productsLoading: false,
  products: [],
};

export const productsSlice = createSlice({
  name: "productsSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.productsLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.productsLoading = false;
      state.products = action.payload;
    });
  },
  reducers: {},
});

export default productsSlice.reducer;
