// @ts-nocheck

import { useParams } from "react-router-dom";
import { Title } from "../../components/title/Title";
import s from "./CardPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loadProduct } from "../../slices/cardSlice";
import { useEffect } from "react";
import star from "../../img/rateStar.svg";
import { formatedPrice, salePercent } from "../../utils.tsx";
import original from "../../img/original.svg";
import { FavoriteButton } from "../../components/favoriteButton";
import { AddToCartButton } from "../../components/addToCartButton/index.tsx";

export const CardPage = ({
  onClickFavorites,
  onClickAddToCard,
  favoritsIds,
  cartIds,
}) => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cart);
  const { product } = useSelector((state) => state.card);

  useEffect(() => {
    dispatch(loadProduct(id));
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  const { brand, name, price, newPrice, currency, category, rating, photo } =
    product;

  const isInCart = cartItems.some((item) => item.id === product.id);

  return (
    <>
      <div className={s.cardInfo}>
        <div className={s.cardImg}>
          <img className={s.photo} src={photo} alt={name} />
        </div>
        <div className={s.cardDescription}>
          {!brand ? <Title text={name} /> : <Title text={`${brand} ${name}`} />}
          <div className={s.about}>
            {rating === 0 ? (
              <p className={s.noRate}>Нет отзывов</p>
            ) : (
              <p className={s.flex}>
                <img src={star} alt="star" />
                {rating}
              </p>
            )}
            {brand && (
              <p className={`${s.brand} ${s.flex}`}>
                Бренд:{" "}
                <span className={s.flex}>
                  {brand}
                  <img src={original} alt="original" />
                </span>
              </p>
            )}
          </div>
          <div className={s.sale}>
            {!newPrice ? (
              <div className={s.flex}>
                <p className={s.price}>
                  {formatedPrice(price)}
                  <span className={s.currency}>{currency}</span>
                </p>
              </div>
            ) : (
              <div className={s.flex}>
                <p className={s.price}>
                  {formatedPrice(newPrice)}
                  <span className={s.currency}>{currency}</span>
                </p>
                <p className={s.oldPrice}>
                  {formatedPrice(price)}
                  <span className={s.currency}>{currency}</span>
                </p>
                <p className={s.percent}>{salePercent(price, newPrice)}</p>
              </div>
            )}
            <div className={s.buttonBlock}>
              <AddToCartButton
                isInCart={isInCart}
                onClick={() => onClickAddToCard(product)}
              />
              <FavoriteButton
                isActive={favoritsIds.includes(String(id))}
                onClick={() => onClickFavorites(product)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
