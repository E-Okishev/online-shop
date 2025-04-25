import { CardItem } from "../../components/cardItem/CardItem";
import s from "./mainPage.module.css";
import { Sort } from "../../components/sort/Sort";
import { Typography, Pagination } from "antd";
import { MainSkeleton } from "./mainSkeleton";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
const { Title } = Typography;
import { FilterParams } from "../../utils";
import { useEffect } from "react";
import { fetchFavorites } from "../../slices/favoritesSlice";
import { loadCart } from "../../slices/cartSlice";

export const MainPage = ({
  searchParams,
  setSearchParams,
  handleChangeFilters,
}: FilterParams) => {
  const { products, productsLoading } = useAppSelector(
    (state) => state.products
  );

  const categoryNamе = {
    pristavka: "Игровые консоли",
    phone: "Смартфоны",
    laptop: "Ноутбуки",
  };

  const categoryKey = searchParams.get("category");
  const newParams = new URLSearchParams(searchParams);
  const dispatch = useAppDispatch();

  useEffect(() => {
    newParams.set("_page", "1");
    setSearchParams?.(newParams);
    dispatch(fetchFavorites());
    dispatch(loadCart());
  }, []);

  return (
    <>
      {productsLoading ? (
        <MainSkeleton />
      ) : products.length === 0 ? (
        <p>Товаров нет</p>
      ) : (
        <>
          {categoryKey && categoryKey in categoryNamе ? (
            <Title>
              {categoryNamе[categoryKey as keyof typeof categoryNamе]}
            </Title>
          ) : (
            <Title>Все товары</Title>
          )}
          <Sort
            searchParams={searchParams}
            handleChangeFilters={handleChangeFilters}
          />
          <div className={s.cardList}>
            {products.map((product) => (
              <CardItem key={product.id} product={product} />
            ))}
          </div>

          <Pagination
            style={{ marginTop: "1rem" }}
            align="center"
            current={
              searchParams.get("_page") ? Number(searchParams.get("_page")) : 1
            }
            total={25}
            onChange={(page) => handleChangeFilters("_page", String(page))}
          />
        </>
      )}
    </>
  );
};
