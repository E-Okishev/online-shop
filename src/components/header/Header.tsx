// @ts-nocheck

import logo from "../../img/logo.svg";
import icon from "../../img/buttonIcon.svg";
import s from "./Header.module.css";
import { FavoriteIcon } from "../favoriteIcon/FavoriteIcon";
import { Link } from "react-router-dom";

export function Header({ handleInput, toggleNavbar }) {
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
        <div className={s.favoriteIcon}>
          <FavoriteIcon />
          <span className={s.favoriteText}>Избранное</span>
        </div>
      </Link>
    </header>
  );
}
