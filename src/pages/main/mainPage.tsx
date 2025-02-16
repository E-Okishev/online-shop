// @ts-nocheck

import { CardItem } from "../../components/cardItem/CardItem";
import s from "./mainPage.module.css";

export const MainPage = ({
  handleInput,
  toggleNavbar,
  handleChangeCategory,
  selectedCategory,
  filteredProducts,
  addToFavorites,
  favoritsIds,
  showNawbar,
}) => {
  return (
    <>
      <ul className={s.cardList}>
        {filteredProducts.length === 0 ? (
          <p>Избранное пусто</p>
        ) : (
          <CardItem
            props={filteredProducts}
            addToFavorites={addToFavorites}
            favoritsIds={favoritsIds}
          />
        )}
      </ul>
    </>
  );
};
