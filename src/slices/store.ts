import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";
import productsReducer from "./productsSlice";
import cartReducer from "./cartSlice";
import cardReducer from "./cardSlice";
import userReducer from "./loginSlice";

export const store = configureStore({
  reducer: {
    favorite: favoritesReducer,
    products: productsReducer,
    cart: cartReducer,
    card: cardReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
