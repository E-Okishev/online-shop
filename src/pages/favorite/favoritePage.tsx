// @ts-nocheck

import { CardItem } from "../../components/cardItem/CardItem";
import { Title } from "../../components/title/Title";
import s from "./favoritePage.module.css";

export const FavoritePage = ({
  favoriteProducts,
  addToFavorites,
  favoritsIds,
}) => {
  return (
    <>
      <Title text={"Избранное"} />
      {favoriteProducts.length === 0 ? (
        <p>В избранном пусто</p>
      ) : (
        <ul className={s.cardList}>
          {favoriteProducts.map((product) => (
            <li className={s.card} key={product.id}>
              <CardItem
                product={product}
                addToFavorites={addToFavorites}
                favoritsIds={favoritsIds}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
