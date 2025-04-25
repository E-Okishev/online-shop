import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";
import productsReducer from "./productsSlice";
import cartReducer from "./cartSlice";
import cardReducer from "./cardSlice";
import userReducer from "./loginSlice";
import { brandsApi } from "../services/brandsApi";
import { commentsApi } from "../services/commentsApi";
import { productsApi } from "../services/productsApi";

export const store = configureStore({
  reducer: {
    favorite: favoritesReducer,
    products: productsReducer,
    cart: cartReducer,
    card: cardReducer,
    user: userReducer,
    [brandsApi.reducerPath]: brandsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      brandsApi.middleware,
      commentsApi.middleware,
      productsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
