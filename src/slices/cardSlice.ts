import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../App";
import { CommentType, ProductType } from "../utils";

export const loadProduct = createAsyncThunk<ProductType, string>(
  "products/loadProduct",
  async (id) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    const result = await response.json();

    return result;
  }
);

export const loadComments = createAsyncThunk<CommentType[], number>(
  "products/loadComments",
  async (id) => {
    const response = await fetch(`${BASE_URL}/comments?productId=${id}`);
    const result = await response.json();

    return result;
  }
);

export const createComment = createAsyncThunk<void, Omit<CommentType, "id">>(
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

type InitialStateTypes = {
  product: ProductType | null;
  comments: CommentType[];
};

const initialState: InitialStateTypes = {
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
  reducers: {},
});

export default productSlice.reducer;
