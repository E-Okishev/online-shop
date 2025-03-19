// @ts-nocheck

export const salePercent = (price, newPrice) => {
  return Math.round((newPrice * 100) / price - 100);
};

export const formatedPrice = (price) => {
  return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1\u2009");
};

export const declension = (value) => {
  const words = ["товар", "товара", "товаров"];
  const absValue = Math.abs(value) % 100;
  const num = absValue % 10;

  let word;
  if (absValue > 10 && absValue < 20) {
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
