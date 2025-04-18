import { CardItem } from "../../components/cardItem/CardItem";
import s from "../main/mainPage.module.css";
import { Typography } from "antd";
import { CardItemSkeleton } from "../../components/cardItem/cardItemSkeleton";
import { useAppSelector } from "../../hooks/reduxHooks";
const { Title } = Typography;

export const FavoritePage = () => {
  const { favorites, favoritesLoading, favoritesError } = useAppSelector(
    (state) => state.favorite
  );

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
