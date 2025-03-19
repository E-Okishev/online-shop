// @ts-nocheck

import { useDispatch, useSelector } from "react-redux";
import star from "../../img/rateStar.svg";
import { FavoriteIconWithCard } from "../../FavoriteIconWithCard/FavoriteIconWithCard.tsx";
import s from "./CardItemForCart.module.css";
import { CartIcon } from "../../cartIcon/CartIcon.tsx";
import { formatedPrice } from "../../../utils.tsx";
import { FavoriteButton } from "../../favoriteButton/index.tsx";
import { CardCounter } from "../../cardCouner/index.tsx";
import { useState } from "react";

export function CardItemForCart({
  product,
  onClickFavorites,
  favoritsIds,
  cartIds,
}) {
  const { id, brand, name, price, newPrice, currency, category, photo, quantity } =
    product;

  return (
    <div className={s.cardItem}>
      <div className={s.cardImg}>
        <img className={s.photo} src={photo} alt={name} />
      </div>
      <div className={s.description}>
        {brand ? (
          <p className={s.name}>
            {brand} {name}`
          </p>
        ) : (
          <p className={s.name}>{name}</p>
        )}
        <div className={s.buttonBlock}>
          <FavoriteButton
            isActive={favoritsIds.includes(id)}
            onClick={() => onClickFavorites(product)}
          />
        </div>
      </div>
      {!newPrice ? (
        <div className={s.priceBlock}>
          <p className={s.price}>
            {formatedPrice(price)}
            <span className={s.currency}>{currency}</span>
          </p>
        </div>
      ) : (
        <div>
          <p className={s.price}>
            {formatedPrice(newPrice)}
            <span className={s.currency}>{currency}</span>
          </p>
          <p className={`${s.price} ${s.oldPrice}`}>
            {formatedPrice(price)}
            <span className={s.currency}>{currency}</span>
          </p>
        </div>
      )}
      <div className={s.counter}>
        <CardCounter productId={product.id} />
      </div>
    </div>
  );
}
