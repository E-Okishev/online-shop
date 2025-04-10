import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";
import productsReducer from "./productsSlice";
import cartReducer from "./cartSlice";
import cardReducer from "./cardSlice";

export const store = configureStore({
  reducer: {
    favorite: favoritesReducer,
    products: productsReducer,
    cart: cartReducer,
    card: cardReducer,
  },
});
