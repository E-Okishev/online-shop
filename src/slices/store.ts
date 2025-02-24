import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";
import productReducer from "./productsSlice";

export const store = configureStore({
  reducer: {
    favorite: favoritesReducer,
    product: productReducer,
  },
});
