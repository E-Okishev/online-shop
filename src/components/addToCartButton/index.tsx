// @ts-nocheck
import { CartIcon } from "../cartIcon/CartIcon";
import s from "./addToCartButton.module.css";

export function AddToCartButton({ isInCart, onClick }) {
  const buttonClass = isInCart ? `${s.cartButton} ${s.active}` : s.cartButton;
  return (
    <button className={buttonClass} type="button" onClick={onClick}>
      {isInCart ? (
        "В корзине"
      ) : (
        <>
          <CartIcon /> В корзину
        </>
      )}
    </button>
  );
}
