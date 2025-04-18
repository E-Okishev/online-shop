import star from "../../img/rateStar.svg";
import s from "./CardItem.module.css";
import { formatedPrice, salePercent } from "../../utils.tsx";
import { FavoriteButton } from "../buttons/favoriteButton/index.tsx";
import { Link } from "react-router-dom";
import { AddToCartButton } from "../buttons/addToCartButton/index.tsx";
import { memo } from "react";
import { ProductType } from "../../utils.tsx";

type CardItemProps = {
  product: Omit<ProductType, 'category' | 'quantity'>;
};

export const CardItem = memo(({ product }: CardItemProps) => {
  const { id, brand, name, price, newPrice, currency, rating, photo } = product;

  return (
    <div className={s.card}>
      <FavoriteButton product={product} className={s.absolutePosition} />
      <Link to={`/product/${id}`}>
        <div className={s.cardImg}>
          <img className={s.photo} src={photo} alt={name} />
        </div>
      </Link>
      <div className={s.description}>
        {newPrice < 1 ? (
          <div className={s.priceBlock}>
            <p className={s.price}>
              {formatedPrice(price)}
              <span className={s.currency}>{currency}</span>
            </p>
          </div>
        ) : (
          <div className={s.priceBlock}>
            <p className={s.price}>
              {formatedPrice(newPrice)}
              <span className={s.currency}>{currency}</span>
            </p>
            <p className={`${s.price} ${s.oldPrice}`}>
              {formatedPrice(price)}
              <span className={s.currency}>{currency}</span>
            </p>
            <p className={s.percent}>{salePercent(price, newPrice)}</p>
          </div>
        )}
        <Link to={`/product/${id}`}>
          {brand && <h3 className={s.brand}>{brand}</h3>}
          <p className={s.name}>{name}</p>
        </Link>
        {rating === 0 ? (
          <p className={s.noRate}>Нет отзывов</p>
        ) : (
          <p className={s.rate}>
            <img src={star} alt="star" />
            {rating}
          </p>
        )}
        <div className={s.buttonBlock}>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
});
