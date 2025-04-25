import { SetURLSearchParams } from "react-router-dom";

export type FilterParams = {
  handleChangeFilters: (key: string, value: string) => void;
  searchParams: URLSearchParams;
  setSearchParams?: SetURLSearchParams;
};

export type ProductType = {
  id: number;
  brand: string;
  name: string;
  description?: string;
  price: number;
  newPrice: number;
  currency: string;
  category: string;
  rating: number;
  quantity: number;
  photo: string;
};

export type CommentType = {
  userName: string;
  text: string;
  productId: number;
  date: string;
  id?: number;
};

export type UserType = {
  name?: string;
  login: string;
  phone?: string;
  password: string;
  id?: number;
};

export const salePercent = (price: number, newPrice: number): number => {
  return Math.round((newPrice * 100) / price - 100);
};

export const formatedPrice = (price: number): string => {
  return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1\u2009");
};

export type RenderPriceBlockProps = {
  price: number;
  newPrice: number;
  quantity?: number;
  currency: string;
  formatedPrice: (price: number) => string;
};

export const renderPriceForOne = ({
  price,
  newPrice,
  currency,
  formatedPrice,
}: RenderPriceBlockProps) => {
  return newPrice < 1
    ? `${formatedPrice(price)} ${currency}`
    : `${formatedPrice(newPrice)} ${currency}`;
};

export const declension = (value: number): string => {
  const words: string[] = ["товар", "товара", "товаров"];
  const num = value % 10;

  let word: string;
  if (value > 10 && value < 20) {
    word = words[2];
  } else if (num > 1 && num < 5) {
    word = words[1];
  } else if (num === 1) {
    word = words[0];
  } else {
    word = words[2];
  }

  return `${value} ${word}`;
};
