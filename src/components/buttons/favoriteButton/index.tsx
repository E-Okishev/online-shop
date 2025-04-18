import {
  addToFavorites,
  deleteFavorites,
} from "../../../slices/favoritesSlice.ts";
import { FavoriteIconWithCard } from "../../icons/FavoriteIconWithCard/FavoriteIconWithCard.tsx";
import s from "./favorite.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks.ts";
import { ProductType } from "../../../utils.tsx";

type FavoriteButtonProps = {
  product: ProductType;
  className?: string;
};

export function FavoriteButton({
  product,
  className = "",
}: FavoriteButtonProps) {
  const favorites = useAppSelector((state) => state.favorite.favorites);

  const dispatch = useAppDispatch();

  const onClickFavorites = () => {
    if (favorites.some((e) => e.id === product.id)) {
      dispatch(deleteFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };
  const isFavorites = favorites.some((item) => item.id === product.id);

  return (
    <button
      className={`${s.favoriteBtn} ${className}`}
      onClick={onClickFavorites}
    >
      <FavoriteIconWithCard active={isFavorites} />
    </button>
  );
}
