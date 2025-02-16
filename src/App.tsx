// @ts-nocheck

import { useEffect, useState } from "react";
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(" http://localhost:5000/products")
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        setProducts(result);
      })
      .catch((error) => console.log(error));
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
                products={products}
                addToFavorites={addToFavorites}
                favoritsIds={favoritsIds}
                showNawbar={showNawbar}
                loading={loading}
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
