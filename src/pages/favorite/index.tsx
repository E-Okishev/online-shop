// @ts-nocheck

import { CardItem } from "../../components/cardItem/CardItem";
import s from "../main/mainPage.module.css";
import { Typography } from "antd";
import { CardItemSkeleton } from "../../components/cardItem/cardItemSkeleton";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
const { Title } = Typography;

export const FavoritePage = () => {
  const { favorites } = useAppSelector((state: RootState) => state.favorite);
  const { favoritesLoading } = useAppSelector(
    (state: RootState) => state.favorite
  );
  const { favoritesError } = useAppSelector((state: RootState) => state.favorite);
  const dispatch = useAppDispatch();

  return (
    <>
      <Title>Избранное</Title>
      {favoritesError && <p>Error... sory</p>}
      {favoritesLoading ? (
        <div className={s.cardList}>
          {[...Array(10).keys()].map((i) => (
            <CardItemSkeleton key={i} />
          ))}
        </div>
      ) : favorites.length === 0 ? (
        <p>В избранном пусто</p>
      ) : (
        <div className={s.cardList}>
          {favorites.map((product) => (
            <CardItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
};
