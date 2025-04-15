// @ts-nocheck

import { useDispatch, useSelector } from "react-redux";
import { CardItem } from "../../components/cardItem/CardItem";
import s from "./mainPage.module.css";
import { Sort } from "../../components/sort/Sort";
import { Typography, Pagination } from "antd";
const { Title } = Typography;

export const MainPage = ({ searchParams, handleChangeFilters }) => {
  const { products } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();

  const loading = useSelector(
    (state: RootState) => state.products.productsLoading
  );

  const categoryNamе = {
    pristavka: "Игровые консоли",
    phone: "Смартфоны",
    laptop: "Ноутбуки",
  };

  return (
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
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>Товаров нет</p>
      ) : (
        <div className={s.cardList}>
          {products.map((product) => (
            <CardItem key={product.id} product={product} />
          ))}
        </div>
      )}
      <Pagination
        style={{ marginTop: "1rem" }}
        align="center"
        current={searchParams.get("_page")}
        total={25}
        onChange={(page) => handleChangeFilters("_page", page)}
      />
    </>
  );
};
