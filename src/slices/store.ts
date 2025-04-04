import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";
import productReducer from "./productsSlice";
import cartReducer from "./cartSlice";
import cardReducer from "./cardSlice";

export const store = configureStore({
  reducer: {
    favorite: favoritesReducer,
    product: productReducer,
    cart: cartReducer,
    card: cardReducer,
  },
});
