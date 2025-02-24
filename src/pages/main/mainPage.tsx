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
  onClickFavorites,
  favoritsIds,
  handleChangeSort,
}) => {
  const products = useSelector((state: RootState) => state.product.products);
  const dispatch = useDispatch();

  const loading = useSelector(
    (state: RootState) => state.product.productsLoading
  );

  return (
    <>
      {selectedCategory ? (
        <Title text={selectedCategory} />
      ) : (
        <Title text={"Все товары"} />
      )}
      <Sort handleChangeSort={handleChangeSort} />
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>Товаров нет</p>
      ) : (
        <ul className={s.cardList}>
          {products.map((product) => (
            <li key={product.id}>
              <CardItem
                product={product}
                onClickFavorites={onClickFavorites}
                favoritsIds={favoritsIds}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
