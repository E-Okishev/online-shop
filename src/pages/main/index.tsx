// @ts-nocheck

import { CardItem } from "../../components/cardItem/CardItem";
import s from "./mainPage.module.css";
import { Sort } from "../../components/sort/Sort";
import { Typography, Pagination } from "antd";
import { MainSkeleton } from "./mainSkeleton";
import { useAppSelector } from "../../hooks/reduxHooks";
const { Title } = Typography;

export const MainPage = ({ searchParams, handleChangeFilters }) => {
  const { products } = useAppSelector((state: RootState) => state.products);

  const loading = useAppSelector(
    (state: RootState) => state.products.productsLoading
  );

  const categoryNamе = {
    pristavka: "Игровые консоли",
    phone: "Смартфоны",
    laptop: "Ноутбуки",
  };

  return (
    <>
      {loading ? (
        <MainSkeleton />
      ) : products.length === 0 ? (
        <p>Товаров нет</p>
      ) : (
        <>
          {searchParams.get("category") ? (
            <Title>{categoryNamе[searchParams.get("category")]}</Title>
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
            current={searchParams.get("_page")}
            total={25}
            onChange={(page) => handleChangeFilters("_page", page)}
          />
        </>
      )}
    </>
  );
};
