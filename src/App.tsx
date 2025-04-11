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
import { Drawer } from "antd";

export const BASE_URL = "http://localhost:5000";

export function App() {
  const [inputName, setInputName] = useState<string>("");
  const [showNawbar, setShowNawbar] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [price, setPrice] = useState({ priceFrom: null, priceTo: null });
  const [page, setPage] = useState<number>(1);

  const dispatch = useDispatch();

  useEffect(() => {
    setPage(1);
  }, [inputName, selectedCategory, sort, price]);

  useEffect(() => {
    dispatch(fetchProducts({ inputName, selectedCategory, sort, price, page }));
  }, [inputName, selectedCategory, sort, price, page]);

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

  const handleChangeSort = (order) => {
    setSort(order);
  };

  return (
    <>
      <Header handleInput={handleInput} toggleNavbar={toggleNavbar} />
      <Drawer
        open={showNawbar}
        placement="left"
        onClose={() => setShowNawbar(false)}
      >
        <Navbar
          handleChangeCategory={handleChangeCategory}
          selectedCategory={selectedCategory}
          setPrice={setPrice}
          price={price}
        />
      </Drawer>
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
                page={page}
                setPage={setPage}
              />
            }
          />
          <Route path="/favorites" element={<FavoritePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<CardPage />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </main>
    </>
  );
}
