// @ts-nocheck

import { useDispatch, useSelector } from "react-redux";
import { Title } from "../../components/title/Title";
import s from "./CartPage.module.css";
import { favoritesSlice } from "../../slices/favoritesSlice";
import { CardItemForCart } from "../../components/cardItem/cardItemForCart";

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

  const declension = (num) => {
    if (num === 1) {
      return <p>{num} товар</p>;
    }
    if (num > 1 && num < 5) {
      return <p>{num} товара</p>;
    }
    if (num >= 5) {
      return `${num} товаров`;
    }
  };

  const currencyInCart = () => {
    let a = 0;
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].currency === "₽") {
        a++;
      }
    }
    if (a === cartItems.length) {
      return "₽";
    }
  };

  return (
    <>
      <Title text={"Корзина"} />
      {cartError && <p>Error... sory</p>}
      {cartLoading ? (
        <p>Loading...</p>
      ) : cartItems.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <div className={s.card}>
          <div className={s.cardList}>
            {cartItems.map((product) => (
              <CardItemForCart
                key={product.id}
                product={product}
                onClickFavorites={onClickFavorites}
                onClickAddToCard={onClickAddToCard}
                favoritsIds={favoritsIds}
                cartIds={cartIds}
              />
            ))}
          </div>
          <div className={s.sum}>
            <div className={s.titleBlock}>
              <h3>Ваша корзина</h3>
              <p>{declension(cartItems.length)}</p>
            </div>
            <div className={s.cost}>
              <p>Товары ({cartItems.length})</p>
              <p className={s.costSum}>234234 {currencyInCart()}</p>
            </div>
            <div className={s.cost}>
              <p>Скидка</p>
              <p className={`${s.costSum} ${s.sale}`}>5454 {currencyInCart()}</p>
            </div>
            <div className={s.totalBlock}>
              <h3>Итого</h3>
              <p className={s.total}>ц4343 {currencyInCart()}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
