// @ts-nocheck

import star from "../../img/rateStar.svg";
import { FavoriteIcon } from "../favoriteIcon/FavoriteIcon";
import s from "./CardItem.module.css";

export function CardItem({ product, addToFavorites, favoritsIds }) {
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
  return (
    <div className={s.card}>
      <button className={s.favoriteBtn} onClick={() => addToFavorites(product)}>
        <FavoriteIcon active={favoritsIds.includes(id)} />
      </button>
      <div className={s.cardImg}>
        <img className={s.photo} src={photo} alt={name} />
      </div>
      <div>
        {!newPrice ? (
          <p className={s.price}>
            {formatedPrice(price)}
            <span className={s.currency}>{currency}</span>
          </p>
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
      </div>
    </div>
  );
}
