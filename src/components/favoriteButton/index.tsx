import { FavoriteIconWithCard } from "../FavoriteIconWithCard/FavoriteIconWithCard.tsx";
import s from "./favorite.module.css";

interface FavoriteButtonProps {
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

export function FavoriteButton({ isActive, onClick, className = "" }: FavoriteButtonProps) {
  return (
    <button className={`${s.favoriteBtn} ${className}`} onClick={onClick}>
      <FavoriteIconWithCard active={isActive} />
    </button>
  );
}
