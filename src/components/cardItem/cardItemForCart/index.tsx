import s from "./CardItemForCart.module.css";
import {
  formatedPrice,
  ProductType,
  RenderPriceBlockProps,
  renderPriceForOne,
} from "../../../utils.tsx";
import { FavoriteButton } from "../../buttons/favoriteButton/index.tsx";
import { CardCounter } from "../../cardCouner/index.tsx";
import { memo, useEffect, useState } from "react";
import { deleteCart, updateProductInCart } from "../../../slices/cartSlice.ts";
import { DeleteButton } from "../../buttons/deleteButton/index.tsx";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/reduxHooks.ts";

export const CardItemForCart = memo(({ product }: { product: ProductType }) => {
  const { id, brand, name, price, newPrice, currency, photo, quantity } =
    product;

  const dispatch = useAppDispatch();

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

  const renderPriceBlock = ({
    price,
    newPrice,
    quantity = 1,
    currency,
    formatedPrice,
  }: RenderPriceBlockProps) => {
    return newPrice < 1 ? (
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

  const renderPriceForOneBlock = (quantity: number) => {
    if (quantity > 1) {
      return (
        <p className={s.priceOneItem}>
          Цена за 1шт:{" "}
          {renderPriceForOne({ price, newPrice, currency, formatedPrice })}
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
      {renderPriceBlock({
        price,
        newPrice,
        quantity: localQuantity,
        currency,
        formatedPrice,
      })}
      <div className={s.counter}>
        <CardCounter
          quantity={localQuantity}
          handleChangePlusQuantity={handleChangePlusQuantity}
          handleChangeMinusQuantity={handleChangeMinusQuantity}
        />
        {renderPriceForOneBlock(localQuantity)}
      </div>
    </div>
  );
});
