// @ts-nocheck
import { useDispatch, useSelector } from "react-redux";
import { CartIcon } from "../cartIcon/CartIcon";
import s from "./addToCartButton.module.css";
import { addToCart, deleteCart } from "../../slices/cartSlice";
import { Button } from "antd";

export function AddToCartButton({ product }) {
  const cartItems = useSelector((state: RootState) => state.cart.cart);

  const dispatch = useDispatch();

  const isInCart = cartItems.some((item) => item.id === product.id);

  const onClickAddToCard = () => {
    if (isInCart) {
      dispatch(deleteCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  };

  const buttonClass = isInCart ? `${s.cartButton} ${s.active}` : s.cartButton;
  const buttonText = isInCart ? "В корзине" : "В корзину";

  return (
    <button className={buttonClass} type="button" onClick={onClickAddToCard}>
      {isInCart ? (
        buttonText
      ) : (
        <>
          <CartIcon /> {buttonText}
        </>
      )}
    </button>
  );
}
