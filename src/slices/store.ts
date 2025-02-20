import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import favoritesReducer from "./favoritesSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    favorite: favoritesReducer,
  },
});
