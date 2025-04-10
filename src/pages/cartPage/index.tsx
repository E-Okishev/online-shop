// @ts-nocheck

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./CartPage.module.css";
import { CardItemForCart } from "../../components/cardItem/cardItemForCart";
import { declension, formatedPrice } from "../../utils";
import { updateProductInCart } from "../../slices/cartSlice";
import { Typography } from "antd";
const { Title } = Typography;

export const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const cartLoading = useSelector((state: RootState) => state.cart.cartLoading);
  const cartError = useSelector((state: RootState) => state.cart.cartError);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce((acc, product) => {
    const priceToUse = product.newPrice || product.price;
    return acc + product.quantity * priceToUse;
  }, 0);

  const totalDiscount = cartItems.reduce((acc, product) => {
    if (product.newPrice && product.newPrice !== 0) {
      const discountPerItem = product.price - product.newPrice;
      return acc + discountPerItem * product.quantity;
    }
    return acc;
  }, 0);

  const total = totalPrice - totalDiscount;

  const productCount = cartItems.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  return (
    <>
      <Title>Корзина</Title>
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
              />
            ))}
          </div>
          <div className={s.sum}>
            <div className={s.titleBlock}>
              <h3>Ваша корзина</h3>
              <p>{declension(productCount)}</p>
            </div>
            <div className={s.cost}>
              <p>Товары ({productCount})</p>
              <p className={s.costSum}>{formatedPrice(totalPrice)}₽</p>
            </div>
            {totalDiscount > 0 && (
              <div className={s.cost}>
                <p>Скидка</p>
                <p className={s.sale}>{formatedPrice(totalDiscount)}₽</p>
              </div>
            )}
            <div className={s.totalBlock}>
              <h3>Итого</h3>
              <p className={s.total}>{formatedPrice(total)} ₽</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
