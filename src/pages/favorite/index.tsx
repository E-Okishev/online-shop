// @ts-nocheck

import { useDispatch, useSelector } from "react-redux";
import { CardItem } from "../../components/cardItem/CardItem";
import s from "../main/mainPage.module.css";
import { favoritesSlice } from "../../slices/favoritesSlice";
import { Typography } from "antd";
import { CardItemSkeleton } from "../../components/cardItem/cardItemSkeleton";
const { Title } = Typography;

export const FavoritePage = () => {
  const { favorites } = useSelector((state: RootState) => state.favorite);
  const { favoritesLoading } = useSelector(
    (state: RootState) => state.favorite
  );
  const { favoritesError } = useSelector((state: RootState) => state.favorite);
  const dispatch = useDispatch();

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
