// @ts-nocheck
import star from "../../img/rateStar.svg";
import { FavoriteIcon } from "../favoriteIcon/FavoriteIcon";
import s from "./CardItem.module.css";

export function CardItem({ props, addToFavorites, favoritsIds }) {
  const salePercent = (price, newPrice) => {
    return Math.round((newPrice * 100) / price - 100);
  };

  const formatedPrice = (price) => {
    return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1\u2009");
  };

  return (
    <>
      {props.map((item) => (
        <li className={s.card} key={item.id}>
          <button className={s.favoriteBtn} onClick={() => addToFavorites(item.id)}>
            <FavoriteIcon active={favoritsIds.includes(item.id)} />
          </button>
          <div className={s.cardImg}>
            <img className={s.photo} src={item.photo} alt={item.name} />
          </div>
          <div>
            {!item.newPrice ? (
              <p className={s.price}>
                {formatedPrice(item.price)}
                <span className={s.currency}>{item.currency}</span>
              </p>
            ) : (
              <div className={s.priceBlock}>
                <p className={s.price}>
                  {formatedPrice(item.newPrice)}
                  <span className={s.currency}>{item.currency}</span>
                </p>
                <p className={`${s.price} ${s.oldPrice}`}>
                  {formatedPrice(item.price)}
                  <span className={s.currency}>{item.currency}</span>
                </p>
                <p className={s.percent}>
                  {salePercent(item.price, item.newPrice)}
                </p>
              </div>
            )}
            {item.brand && <h3 className={s.brand}>{item.brand}</h3>}
            <p className={s.name}>{item.name}</p>
            {item.rating === 0 ? (
              <p className={s.noRate}>Нет отзывов</p>
            ) : (
              <p className={s.rate}>
                <img src={star} alt="star" />
                {item.rating}
              </p>
            )}
          </div>
        </li>
      ))}
    </>
  );
}
