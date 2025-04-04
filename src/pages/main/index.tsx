// @ts-nocheck

import { useDispatch, useSelector } from "react-redux";
import { CardItem } from "../../components/cardItem/CardItem";
import { Title } from "../../components/title/Title";
import s from "./mainPage.module.css";
import { Sort } from "../../components/sort/Sort";

export const MainPage = ({
  handleInput,
  handleChangeCategory,
  selectedCategory,
  handleChangeSort,
}) => {
  const products = useSelector((state: RootState) => state.product.products);  
  const dispatch = useDispatch();

  const loading = useSelector(
    (state: RootState) => state.product.productsLoading
  );

  const categoryNamе = {
    'pristavka': 'Игровые консоли',
    'phone': 'Смартфоны',
    'laptop': 'Ноутбуки',
  }

  return (
    <>
      {selectedCategory ? (
        <Title text={categoryNamе[selectedCategory]} />
      ) : (
        <Title text={"Все товары"} />
      )}
      <Sort handleChangeSort={handleChangeSort} />
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>Товаров нет</p>
      ) : (
        <div className={s.cardList}>
          {products.map((product) => (
            <CardItem
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </>
  );
};
