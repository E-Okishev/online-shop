// @ts-nocheck

export const salePercent = (price, newPrice) => {
  return Math.round((newPrice * 100) / price - 100);
};

export const formatedPrice = (price) => {
  return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1\u2009");
};