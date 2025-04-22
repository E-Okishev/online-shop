import { useParams } from "react-router-dom";
import s from "./CardPage.module.css";
import { loadProduct } from "../../slices/cardSlice";
import { useEffect } from "react";
import star from "../../img/rateStar.svg";
import { formatedPrice, salePercent } from "../../utils.tsx";
import original from "../../img/original.svg";
import { FavoriteButton } from "../../components/buttons/favoriteButton/index.tsx";
import { AddToCartButton } from "../../components/buttons/addToCartButton/index.tsx";
import { Typography } from "antd";
import { CardCommentBlock } from "../../components/cardCommentBlock/index.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks.ts";
const { Title, Paragraph } = Typography;

export const CardPage = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { product } = useAppSelector((state) => state.card);

  useEffect(() => {
    if (id) {
      dispatch(loadProduct(id));
    }
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  const { brand, name, price, newPrice, currency, rating, photo, description } =
    product;

  return (
    <>
      <div className={s.cardInfo}>
        <div className={s.cardImg}>
          <img className={s.photo} src={photo} alt={name} />
        </div>
        <div className={s.cardDescription}>
          {!brand ? <Title>{name}</Title> : <Title>{`${brand} ${name}`}</Title>}
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
          <Paragraph>{description}</Paragraph>
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
              <AddToCartButton product={product} />
              <FavoriteButton product={product} />
            </div>
          </div>
        </div>
      </div>
      <CardCommentBlock productId={Number(id)} />
    </>
  );
};
