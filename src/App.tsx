// @ts-nocheck

import { useEffect, useState } from "react";
import s from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Navbar } from "./components/navbar/Navbar";
import {
  addToFavorites,
  deleteFavorites,
  fetchFavorites,
} from "./slices/favoritesSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./slices/productsSlice";

import { FavoritePage } from "./pages/favorite";
import { MainPage } from "./pages/main";
import { CartPage } from "./pages/cartPage";
import { loadCart, addToCart, deleteCart } from "./slices/cartSlice";
import { CardPage } from "./pages/cardPage";

export const BASE_URL = "http://localhost:5000";

export function App() {
  const [inputName, setInputName] = useState<string>("");
  const [showNawbar, setShowNawbar] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sort, setSort] = useState<string>("");

  const favorites = useSelector((state: RootState) => state.favorite.favorites);
  const cartItems = useSelector((state: RootState) => state.cart.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts({ inputName, selectedCategory, sort }));
  }, [inputName, selectedCategory, sort]);

  useEffect(() => {
    dispatch(fetchFavorites());
    dispatch(loadCart());
  }, []);

  const handleChangeCategory = (changedCategory) => {
    changedCategory === selectedCategory
      ? setSelectedCategory("")
      : setSelectedCategory(changedCategory);
    setShowNawbar(false);
  };

  const handleInput = (text: string) => {
    setInputName(text);
  };

  const toggleNavbar = () => {
    setShowNawbar((prev) => {
      return !prev;
    });
  };

  const onClickFavorites = (product) => {
    if (favorites.some((e) => e.id === product.id)) {
      dispatch(deleteFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  const onClickAddToCard = (product) => {
    if (cartItems.some((e) => e.id === product.id)) {
      dispatch(deleteCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  };

  const handleChangeSort = (order) => {
    setSort(order);
  };

  return (
    <>
      <Header handleInput={handleInput} toggleNavbar={toggleNavbar} />
      {showNawbar && (
        <Navbar
          handleChangeCategory={handleChangeCategory}
          selectedCategory={selectedCategory}
        />
      )}
      <main className={s.main}>
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                handleChangeSort={handleChangeSort}
                handleInput={handleInput}
                handleChangeCategory={handleChangeCategory}
                selectedCategory={selectedCategory}
                onClickFavorites={onClickFavorites}
                onClickAddToCard={onClickAddToCard}
                favoritsIds={favorites.map((i) => i.id)}
                cartIds={cartItems.map((i) => i.id)}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <FavoritePage
                onClickFavorites={onClickFavorites}
                onClickAddToCard={onClickAddToCard}
                favoritsIds={favorites.map((i) => i.id)}
                cartIds={cartItems.map((i) => i.id)}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <CartPage
                onClickFavorites={onClickFavorites}
                favoritsIds={favorites.map((i) => i.id)}
                cartIds={cartItems.map((i) => i.id)}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <CardPage
                onClickFavorites={onClickFavorites}
                onClickAddToCard={onClickAddToCard}
                favoritsIds={favorites.map((i) => String(i.id))}
                cartIds={cartItems.map((i) => String(i.id))}
              />
            }
          />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </main>
    </>
  );
}
