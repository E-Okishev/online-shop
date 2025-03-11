// @ts-nocheck

import { useDispatch, useSelector } from "react-redux";
import { CardItem } from "../../components/cardItem/CardItem";
import { Title } from "../../components/title/Title";
import s from "../main/mainPage.module.css";
import { favoritesSlice } from "../../slices/favoritesSlice";

export const CartPage = ({
  onClickFavorites,
  onClickAddToCard,
  favoritsIds,
  cartIds, 
}) => {
  const cartItems = useSelector((state: RootState) => state.cart.cart);

  const cartLoading = useSelector((state: RootState) => state.cart.cartLoading);
  const cartError = useSelector((state: RootState) => state.cart.cartError);
  const dispatch = useDispatch();

  return (
    <>
      <Title text={"Корзина"} />
      {cartError && <p>Error... sory</p>}
      {cartLoading ? (
        <p>Loading...</p>
      ) : cartItems.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <div className={s.cardList}>
          {cartItems.map((product) => (
            <CardItem
              key={product.id}
              product={product}
              onClickFavorites={onClickFavorites}
              onClickAddToCard={onClickAddToCard}
              favoritsIds={favoritsIds}
              cartIds={cartIds}
            />
          ))}
        </div>
      )}
    </>
  );
};
