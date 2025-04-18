import { CartIcon } from "../cartIcon/CartIcon";
import s from "./addToCartButton.module.css";
import { addToCart, deleteCart } from "../../slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { ProductType } from "../../utils";

export function AddToCartButton({ product }: { product: ProductType }) {
  const cartItems = useAppSelector((state) => state.cart.cart);
  const dispatch = useAppDispatch();

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
