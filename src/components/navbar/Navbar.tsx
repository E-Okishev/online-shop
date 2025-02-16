// @ts-nocheck

import s from './Navbar.module.css'

export const Navbar = ({handleChangeCategory, selectedCategory}) => {
  return (
    <div className={s.navbar}>
      <ul>
        <li
          onClick={(e) => handleChangeCategory("phone")}
          className={
            selectedCategory === "phone" ? `${s.listItem} ${s.active}` : `${s.listItem}`
          }
        >
          Телефоны
        </li>
        <li
          onClick={(e) => handleChangeCategory("laptop")}
          className={
            selectedCategory === "laptop"
              ? `${s.listItem} ${s.active}`
              : `${s.listItem}`
          }
        >
          Ноутбуки
        </li>
        <li
          onClick={(e) => handleChangeCategory("pristavka")}
          className={
            selectedCategory === "pristavka"
              ? `${s.listItem} ${s.active}`
              : `${s.listItem}`
          }
        >
          Игровые приставки
        </li>
      </ul>
    </div>
  );
};
