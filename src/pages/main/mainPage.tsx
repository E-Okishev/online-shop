// @ts-nocheck

import { CardItem } from "../../components/cardItem/CardItem";
import { Title } from "../../components/title/Title";
import s from "./mainPage.module.css";

export const MainPage = ({
  handleInput,
  toggleNavbar,
  handleChangeCategory,
  selectedCategory,
  products,
  addToFavorites,
  favoritsIds,
  showNawbar,
  loading,
}) => {
  return (
    <>
      {selectedCategory ? (
        <Title text={selectedCategory} />
      ) : (
        <Title text={"Все товары"} />
      )}
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
                addToFavorites={addToFavorites}
                favoritsIds={favoritsIds}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
