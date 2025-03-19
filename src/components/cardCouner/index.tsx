// @ts-nocheck

import { useState } from "react";
import s from "./cardCouner.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart } from "../../slices/cartSlice";

export function CardCounter({ productId }) {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    } else {
      dispatch(deleteCart(productId));
    }
  };

  const increment = () => setCount(count + 1);

  const onChanged = (e) => {
    const value = e.target.value.trim();
    if (!/^\d+$/.test(value) || Number(value) <= 0) {
      return;
    }
    setCount(Number(value));
  };

  return (
    <div className={s.counter}>
      <button onClick={decrement}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path
            fill="currentColor"
            d="M5 11a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2z"
          ></path>
        </svg>
      </button>
      <input type="number" value={count} onChange={onChanged} />
      <button onClick={increment}>
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
