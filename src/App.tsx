// @ts-nocheck

import { useState } from "react";
import s from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/main/mainPage";
import { products } from "./data";
import { Header } from "./components/header/Header";
import { Navbar } from "./components/navbar/Navbar";
import { FavoritePage } from "./pages/favorite/favoritePage";

export function App() {
  const [inputName, setInputName] = useState<string>("");
  const [showNawbar, setShowNawbar] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [favoritsIds, setFavoritsIds] = useState<number[]>([]);

  const handleChangeCategory = (changedCategory) => {
    changedCategory === selectedCategory
      ? setSelectedCategory("")
      : setSelectedCategory(changedCategory);
    setShowNawbar(false);
  };

  const handleInput = (text: string) => {
    setInputName(text);
  };

  const filteredProducts = products.filter(
    (item) =>
      item.category.includes(selectedCategory) &&
      (item.name?.toLowerCase().includes(inputName.toLowerCase()) ||
        item.brand?.toLowerCase().includes(inputName.toLowerCase()))
  );

  const toggleNavbar = () => {
    setShowNawbar((prev) => {
      return !prev;
    });
  };

  const addToFavorites = (id) => {
    favoritsIds.includes(id)
      ? setFavoritsIds(favoritsIds.filter((i) => i !== id))
      : setFavoritsIds([...favoritsIds, id]);
  };

  const favoriteProducts = products.filter((product) =>
    favoritsIds.includes(product.id)
  );

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
                filteredProducts={filteredProducts}
                addToFavorites={addToFavorites}
                favoritsIds={favoritsIds}
                showNawbar={showNawbar}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <FavoritePage
                favoriteProducts={favoriteProducts}
                addToFavorites={addToFavorites}
                favoritsIds={favoritsIds}
              />
            }
          />
        </Routes>
      </main>
    </>
  );
}
