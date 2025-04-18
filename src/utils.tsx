export type FilterParams = {
  handleChangeFilters: (key: string, value: string) => void;
  searchParams: URLSearchParams;
};

export type ProductType = {
  id: number;
  brand: string;
  name: string;
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
  id: number;
};

export const salePercent = (price: number, newPrice: number): number => {
  return Math.round((newPrice * 100) / price - 100);
};

export const formatedPrice = (price: number): string => {
  return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1\u2009");
};

export const declension = (value: number): string => {
  const words = ["товар", "товара", "товаров"];
  const num = value % 10;

  let word;
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
