// @ts-nocheck

import { CardItem } from "../../components/cardItem/CardItem";
import s from "./mainPage.module.css";

export const MainPage = ({
  handleInput,
  toggleNavbar,
  handleChangeCategory,
  selectedCategory,
  products,
  addToFavorites,
  favoritsIds,
  showNawbar,
  loading,
}) => {
  return (
    <>
      {loading && <p>Loading...</p>}
      <ul className={s.cardList}>
        {products.length === 0 ? (
          <p>Товаров нет</p>
        ) : (
          <CardItem
            props={products}
            addToFavorites={addToFavorites}
            favoritsIds={favoritsIds}
          />
        )}
      </ul>
    </>
  );
};
