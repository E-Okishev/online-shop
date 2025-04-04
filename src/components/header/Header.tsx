// @ts-nocheck

import logo from "../../img/logo.svg";
import icon from "../../img/buttonIcon.svg";
import s from "./Header.module.css";
import { FavoriteIconInHeader } from "../FavoriteIconInHeader/FavoriteIconInHeader";
import { Link } from "react-router-dom";
import { CartIcon } from "../cartIcon/CartIcon";
import { useDispatch, useSelector } from "react-redux";

export function Header({ handleInput, toggleNavbar }) {
  const favorites = useSelector((state: RootState) => state.favorite.favorites);
  const cartItems = useSelector((state: RootState) => state.cart.cart);

  const dispatch = useDispatch();

  return (
    <header className={s.header}>
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
      <button className={s.catalogButton} onClick={toggleNavbar}>
        <img src={icon} alt="icon" />
        <p>Каталог</p>
      </button>
      <input
        className={s.input}
        type="text"
        placeholder="Поиск"
        onChange={(e) => handleInput(e.target.value)}
      />
      <Link className={s.link} to="/favorites">
        <div className={s.headerIcons}>
          {favorites.length > 0 && (
            <div className={s.favoriteCounter}>{favorites.length}</div>
          )}
          <FavoriteIconInHeader />
          <span className={s.headerIconsText}>Избранное</span>
        </div>
      </Link>
      <Link className={s.link} to="/cart">
        <div className={s.headerIcons}>
          {cartItems.length > 0 && (
            <div className={s.favoriteCounter}>{cartItems.length}</div>
          )}
          <CartIcon />
          <span className={s.headerIconsText}>Корзина</span>
        </div>
      </Link>
    </header>
  );
}
