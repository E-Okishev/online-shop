// @ts-nocheck

import logo from "../../img/logo.svg";
import icon from "../../img/buttonIcon.svg";
import s from "./Header.module.css";

export function Header({ handleInput, togleNawbar }) {
  return (
    <header className={s.header}>
      <a href="/">
        <img src={logo} alt="Logo" />
      </a>
      <button className={s.catalogButton} onClick={togleNawbar}>
        <img src={icon} alt="icon" />
        <p>Каталог</p>
      </button>
      <input
        className={s.input}
        type="text"
        placeholder="Поиск"
        onChange={(e) => handleInput(e.target.value)}
      />
      <div>header</div>
    </header>
  );
}
