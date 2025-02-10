// @ts-nocheck

import { useState } from "react";
import s from "./App.module.css";
import { CardItem } from "./components/cardItem/CardItem";
import { Header } from "./components/header/Header";
import { products } from "./data";
import { Navbar } from "./components/navbar/Navbar";

export function App() {
  const [inputName, setInputName] = useState<string>("");
  const [showNawbar, setShowNawbar] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [favoritsIds, setFavoritsIds] = useState<number[]>([]);

  const handleChangeCategory = (changedCategory) => {
    changedCategory === selectedCategory
      ? setSelectedCategory("")
      : setSelectedCategory(changedCategory);
    togleNawbar();
  };

  const handleInput = (text: string): string => {
    setInputName(text);
  };

  const filteredProducts = products.filter(
    (item) =>
      item.category.includes(selectedCategory) &&
      (item.name?.toLowerCase().includes(inputName.toLowerCase()) ||
        item.brand?.toLowerCase().includes(inputName.toLowerCase()))
  );

  const togleNawbar = () => {
    setShowNawbar(!showNawbar);
  };

  const addToFavorites = (id) => {
    favoritsIds.includes(id)
      ? setFavoritsIds(favoritsIds.filter((i) => i !== id))
      : setFavoritsIds([...favoritsIds, id]);
  };

  console.log(favoritsIds);

  return (
    <>
      <Header handleInput={handleInput} togleNawbar={togleNawbar} />
      {showNawbar && (
        <Navbar
          handleChangeCategory={handleChangeCategory}
          selectedCategory={selectedCategory}
        />
      )}
      <main>
        <ul className={s.cardList}>
          {filteredProducts.length === 0 ? (
            <p>Товаров нет</p>
          ) : (
            <CardItem
              props={filteredProducts}
              addToFavorites={addToFavorites}
              favoritsIds={favoritsIds}
            />
          )}
        </ul>
      </main>
    </>
  );
}
