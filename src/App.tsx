import "@ant-design/v5-patch-for-react-19";
import { useCallback, useEffect } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { fetchProducts } from "./slices/productsSlice";
import { FavoritePage } from "./pages/favorite";
import { MainPage } from "./pages/main";
import { CartPage } from "./pages/cartPage";
import { CardPage } from "./pages/cardPage";
import { useAppDispatch } from "./hooks/reduxHooks";
import { AdminPage } from "./pages/adminPage";
import { HeaderBlock } from "./pages/headerBlock";
import { fetchFavorites } from "./slices/favoritesSlice";
import { loadCart } from "./slices/cartSlice";

export const BASE_URL = "http://localhost:5000";

export const App = () => {
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
    dispatch(fetchFavorites());
    dispatch(loadCart());
  }, []);

  return (
    <>
      <HeaderBlock
        handleChangeFilters={handleChangeFilters}
        searchParams={searchParams}
      />
      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                handleChangeFilters={handleChangeFilters}
                setSearchParams={setSearchParams}
                searchParams={searchParams}
              />
            }
          />
          <Route path="/favorites" element={<FavoritePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<CardPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </main>
    </>
  );
};
