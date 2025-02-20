// @ts-nocheck

import { useEffect, useState } from "react";
import s from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/main/mainPage";
import { products } from "./data";
import { Header } from "./components/header/Header";
import { Navbar } from "./components/navbar/Navbar";
import { FavoritePage } from "./pages/favorite/favoritePage";
import { fetchFavorites } from "./slices/favoritesSlice";
import { useDispatch, useSelector } from "react-redux";

export const BASE_URL = "http://localhost:5000";

export function App() {
  const [inputName, setInputName] = useState<string>("");
  const [showNawbar, setShowNawbar] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const favorites = useSelector((state: RootState) => state.favorite.favorites);

  const loadProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/products?q=${inputName}&category_like=${selectedCategory}`
      );
      const result = await response.json();
      setLoading(false);
      setProducts(result);
    } catch (error) {
      setLoading(false);
      console.error("error", error);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [inputName, selectedCategory]);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchFavorites())
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

  const addToFavorites = (product) => {
    if (favorites.some((e) => e.id === product.id)) {
      fetch(`${BASE_URL}/favorites/${product.id}`, {
        method: "DELETE",
      }).then((result) => dispatch(fetchFavorites()));
    } else {
      fetch(`${BASE_URL}/favorites`, {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-type": "application/json",
        },
      }).then((result) => dispatch(fetchFavorites()));
    }
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
                handleInput={handleInput}
                toggleNavbar={toggleNavbar}
                handleChangeCategory={handleChangeCategory}
                selectedCategory={selectedCategory}
                products={products}
                addToFavorites={addToFavorites}
                favoritsIds={favorites.map((i) => i.id)}
                showNawbar={showNawbar}
                loading={loading}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <FavoritePage
                addToFavorites={addToFavorites}
                favoritsIds={favorites.map((i) => i.id)}
              />
            }
          />
          <Route
            path="*"
            element={
              <h1>404</h1>
            }
          />
        </Routes>
      </main>
    </>
  );
}
