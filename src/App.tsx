import { useCallback, useEffect, useState } from "react";
import s from "./App.module.css";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Navbar } from "./components/navbar/Navbar";
import { fetchFavorites } from "./slices/favoritesSlice";
import { fetchProducts } from "./slices/productsSlice";
import { FavoritePage } from "./pages/favorite";
import { MainPage } from "./pages/main";
import { CartPage } from "./pages/cartPage";
import { CardPage } from "./pages/cardPage";
import { Drawer } from "antd";
import { loadCart } from "./slices/cartSlice";
import { useAppDispatch } from "./hooks/reduxHooks";

export const BASE_URL = "http://localhost:5000";

export const App = () => {
  const [showNawbar, setShowNawbar] = useState<boolean>(false);

  let [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const newParams = new URLSearchParams(searchParams);

  const handleChangeFilters = useCallback((key: string, value: string) => {
    if (newParams.get(key) === value || !value) {
      newParams.delete(key);
      key === "_order" && newParams.delete("_sort");
    } else if (key === "_order") {
      newParams.set("_sort", "price");
      newParams.set("_order", value);
    } else {
      newParams.set(key, value);
    }

    if (key !== "_page") {
      newParams.set("_page", "1");
    }

    setSearchParams(newParams);
  }, []);

  useEffect(() => {
    if (searchParams) {
      dispatch(fetchProducts(searchParams.toString()));
    }
  }, [searchParams]);

  useEffect(() => {
    newParams.set("_page", "1");
    setSearchParams(newParams);
    dispatch(fetchFavorites());
    dispatch(loadCart());
  }, []);

  const toggleNavbar = useCallback(() => {
    setShowNawbar(!showNawbar);
  }, []);

  return (
    <>
      <Header
        handleChangeFilters={handleChangeFilters}
        toggleNavbar={toggleNavbar}
        searchParams={searchParams}
      />
      <Drawer
        open={showNawbar}
        placement="left"
        onClose={() => setShowNawbar(false)}
      >
        <Navbar
          handleChangeFilters={handleChangeFilters}
          searchParams={searchParams}
        />
      </Drawer>
      <main className={s.main}>
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                handleChangeFilters={handleChangeFilters}
                searchParams={searchParams}
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
};
