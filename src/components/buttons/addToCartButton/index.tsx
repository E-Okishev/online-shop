import { CartIcon } from "../../icons/cartIcon/CartIcon";
import { addToCart, deleteCart } from "../../../slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { ProductType } from "../../../utils";
import { Button } from "antd";

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

  const buttonText = isInCart ? "В корзине" : "В корзину";
  const buttonType = isInCart ? "default" : "primary";

  return (
    <Button
      type={buttonType}
      onClick={onClickAddToCard}
      icon={isInCart ? null : <CartIcon />}
      size="large"
      style={{ width: "100%" }}
    >
      {buttonText}
    </Button>
  );
}
