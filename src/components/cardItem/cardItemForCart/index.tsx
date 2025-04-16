// @ts-nocheck

import { useDispatch } from "react-redux";
import s from "./CardItemForCart.module.css";
import { formatedPrice } from "../../../utils.tsx";
import { FavoriteButton } from "../../favoriteButton/index.tsx";
import { CardCounter } from "../../cardCouner/index.tsx";
import { memo, useEffect, useState } from "react";
import { deleteCart, updateProductInCart } from "../../../slices/cartSlice.ts";
import { DeleteButton } from "../../deleteButton/index.tsx";
import { Link } from "react-router-dom";

export const CardItemForCart = memo(({
  product,
}) => {
  const {
    id,
    brand,
    name,
    price,
    newPrice,
    currency,
    category,
    photo,
    quantity,
  } = product;

  const dispatch = useDispatch();

  const [localQuantity, setLocalQuantity] = useState(quantity);

  useEffect(() => {
    setLocalQuantity(quantity);
  }, [quantity]);

  const handleChangePlusQuantity = () => {
    setLocalQuantity(localQuantity + 1);
    dispatch(updateProductInCart({ ...product, quantity: localQuantity + 1 }));
  };
  const handleChangeMinusQuantity = () => {
    if (localQuantity > 1) {
      setLocalQuantity(localQuantity - 1);
      dispatch(
        updateProductInCart({ ...product, quantity: localQuantity - 1 })
      );
    } else {
      dispatch(deleteCart(product.id));
    }
  };

  const renderPriceBlock = (
    price,
    newPrice,
    quantity = 1,
    currency,
    formatedPrice
  ) => {
    return !newPrice ? (
      <div className={s.priceBlock}>
        <p className={s.price}>
          {formatedPrice(price * quantity)}
          <span className={s.currency}>{currency}</span>
        </p>
      </div>
    ) : (
      <div>
        <p className={s.price}>
          {formatedPrice(newPrice * quantity)}
          <span className={s.currency}>{currency}</span>
        </p>
        <p className={`${s.price} ${s.oldPrice}`}>
          {formatedPrice(price * quantity)}
          <span className={s.currency}>{currency}</span>
        </p>
      </div>
    );
  };

  const renderPriceForOne = (price, newPrice, currency, formatedPrice) => {
    return !newPrice
      ? `${formatedPrice(price)} ${currency}`
      : `${formatedPrice(newPrice)} ${currency}`;
  };

  const renderPriceForOneBlock = (quantity) => {
    if (quantity > 1) {
      return (
        <p className={s.priceOneItem}>
          Цена за 1шт:{" "}
          {renderPriceForOne(price, newPrice, currency, formatedPrice)}
        </p>
      );
    }
  };

  return (
    <div className={s.cardItem}>
      <Link to={`/product/${id}`} className={s.cardImg}>
          <img className={s.photo} src={photo} alt={name} />
      </Link>
      <div className={s.description}>
        <Link to={`/product/${id}`}>
          {brand ? (
            <p className={s.name}>
              {brand} {name}
            </p>
          ) : (
            <p className={s.name}>{name}</p>
          )}
        </Link>
        <div className={s.buttonBlock}>
          <FavoriteButton product={product} />
          <DeleteButton onClick={() => dispatch(deleteCart(product.id))} />
        </div>
      </div>
      {renderPriceBlock(
        price,
        newPrice,
        localQuantity,
        currency,
        formatedPrice
      )}
      <div className={s.counter}>
        <CardCounter
          productId={product.id}
          quantity={localQuantity}
          handleChangePlusQuantity={handleChangePlusQuantity}
          handleChangeMinusQuantity={handleChangeMinusQuantity}
        />
        {renderPriceForOneBlock(localQuantity)}
      </div>
    </div>
  );
});
