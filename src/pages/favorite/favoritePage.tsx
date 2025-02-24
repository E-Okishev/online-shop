// @ts-nocheck

import { useDispatch, useSelector } from "react-redux";
import { CardItem } from "../../components/cardItem/CardItem";
import { Title } from "../../components/title/Title";
import s from "./favoritePage.module.css";
import { favoritesSlice } from "../../slices/favoritesSlice";

export const FavoritePage = ({ onClickFavorites, favoritsIds }) => {
  const favorites = useSelector((state: RootState) => state.favorite.favorites);
  const favoritesLoading = useSelector(
    (state: RootState) => state.favorite.favoritesLoading
  );
  const favoritesError = useSelector(
    (state: RootState) => state.favorite.favoritesError
  );
  const dispatch = useDispatch();

  return (
    <>
      <Title text={"Избранное"} />
      {favoritesError && <p>Error... sory</p>}
      {favoritesLoading ? (
        <p>Loading...</p>
      ) : favorites.length === 0 ? (
        <p>В избранном пусто</p>
      ) : (
        <ul className={s.cardList}>
          {favorites.map((product) => (
            <li className={s.card} key={product.id}>
              <CardItem
                product={product}
                onClickFavorites={onClickFavorites}
                favoritsIds={favorites.map((i) => i.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
