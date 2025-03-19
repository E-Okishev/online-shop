// @ts-nocheck

import s from "./cardCouner.module.css";

export function CardCounter({
  productId,
  quantity,
  handleChangePlusQuantity,
  handleChangeMinusQuantity,
}) {
  return (
    <div className={s.counter}>
      <button onClick={handleChangeMinusQuantity}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path
            fill="currentColor"
            d="M5 11a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2z"
          ></path>
        </svg>
      </button>
      <span>{quantity} </span>
      <button onClick={handleChangePlusQuantity}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path
            fill="currentColor"
            d="M12 4a1 1 0 0 0-1 1v6H5a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2h-6V5a1 1 0 0 0-1-1"
          ></path>
        </svg>
      </button>
    </div>
  );
}
