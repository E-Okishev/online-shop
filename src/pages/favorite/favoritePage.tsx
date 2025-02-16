// @ts-nocheck

import { CardItem } from "../../components/cardItem/CardItem";
import { Title } from "../../components/title/Title";
import s from "./favoritePage.module.css";

export const FavoritePage = ({ favoriteProducts, addToFavorites, favoritsIds}) => {
  return (
    <>
      <Title text={"Избранное"} />
      <ul className={s.cardList}>
        {favoriteProducts.length === 0 ? (
          <p>В избранном пусто</p>
        ) : (
          <CardItem props={favoriteProducts} addToFavorites={addToFavorites} favoritsIds={favoritsIds} />
        )}
      </ul>
    </>
  );
};
