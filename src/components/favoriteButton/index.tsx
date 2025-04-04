// @ts-nocheck

import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  deleteFavorites,
} from "../../slices/favoritesSlice.ts";
import { FavoriteIconWithCard } from "../FavoriteIconWithCard/FavoriteIconWithCard.tsx";
import s from "./favorite.module.css";

export function FavoriteButton({ product, className = "" }) {
  const favorites = useSelector((state) => state.favorite.favorites);

  const dispatch = useDispatch();

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
