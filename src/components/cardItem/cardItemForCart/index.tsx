// @ts-nocheck

import { useDispatch } from "react-redux";
import star from "../../img/rateStar.svg";
import { FavoriteIconWithCard } from "../../FavoriteIconWithCard/FavoriteIconWithCard.tsx";
import s from "./CardItemForCart.module.css";
import { CartIcon } from "../../cartIcon/CartIcon.tsx";
import { formatedPrice } from "../../../utils.tsx";
import { FavoriteButton } from "../../favoriteButton/index.tsx";
import { CardCounter } from "../../cardCouner/index.tsx";
import { useEffect, useState } from "react";
import { deleteCart, updateProductInCart } from "../../../slices/cartSlice.ts";
import { DeleteButton } from "../../deleteButton/index.tsx";

export const CardItemForCart = ({
  product,
  onClickFavorites,
  favoritsIds,
  cartIds,
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
      <div className={s.cardImg}>
        <img className={s.photo} src={photo} alt={name} />
      </div>
      <div className={s.description}>
        {brand ? (
          <p className={s.name}>
            {brand} {name}
          </p>
        ) : (
          <p className={s.name}>{name}</p>
        )}
        <div className={s.buttonBlock}>
          <FavoriteButton
            isActive={favoritsIds.includes(id)}
            onClick={() => onClickFavorites(product)}
          />
          <DeleteButton onClick={() => dispatch(deleteCart(product.id))}/>
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
};
