// @ts-nocheck

import { useDispatch, useSelector } from "react-redux";
import star from "../../img/rateStar.svg";
import { FavoriteIconWithCard } from "../FavoriteIconWithCard/FavoriteIconWithCard.tsx";
import s from "./CardItem.module.css";
import { CartIcon } from "../cartIcon/CartIcon";

export function CardItem({
  product,
  onClickFavorites,
  onClickAddToCard,
  favoritsIds,
  cartIds,
}) {
  const salePercent = (price, newPrice) => {
    return Math.round((newPrice * 100) / price - 100);
  };

  const formatedPrice = (price) => {
    return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1\u2009");
  };

  const {
    id,
    brand,
    name,
    price,
    newPrice,
    currency,
    category,
    rating,
    photo,
  } = product;

  const styleButton = cartIds.includes(id)
    ? `${s.cartButton} ${s.active}`
    : `${s.cartButton}`;

  return (
    <div className={s.card}>
      <button
        className={s.favoriteBtn}
        onClick={() => onClickFavorites(product)}
      >
        <FavoriteIconWithCard active={favoritsIds.includes(id)} />
      </button>
      <div className={s.cardImg}>
        <img className={s.photo} src={photo} alt={name} />
      </div>
      <div className={s.description}>
        {!newPrice ? (
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
        {brand && <h3 className={s.brand}>{brand}</h3>}
        <p className={s.name}>{name}</p>
        {rating === 0 ? (
          <p className={s.noRate}>Нет отзывов</p>
        ) : (
          <p className={s.rate}>
            <img src={star} alt="star" />
            {rating}
          </p>
        )}
        <div className={s.buttonBlock}>
          <button
            className={styleButton}
            type="button"
            onClick={() => onClickAddToCard(product)}
          >
            {cartIds.includes(id) ? (
              `В корзине`
            ) : (
              <>
                <CartIcon /> В корзину
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
