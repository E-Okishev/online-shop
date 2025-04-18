import logo from "../../img/logo.svg";
import icon from "../../img/buttonIcon.svg";
import s from "./Header.module.css";
import { FavoriteIconInHeader } from "../FavoriteIconInHeader/FavoriteIconInHeader";
import { Link } from "react-router-dom";
import { CartIcon } from "../cartIcon/CartIcon";
import { Input, Button } from "antd";
import { memo } from "react";
import { debounce } from "lodash";
import { useAppSelector } from "../../hooks/reduxHooks";
import { FilterParams } from "../../utils";

type HeaderProps = FilterParams & {
  toggleNavbar: () => void;
};

export const Header = memo(
  ({ handleChangeFilters, toggleNavbar, searchParams }: HeaderProps) => {
    const debounced = debounce(
      (e) => handleChangeFilters("q", e.target.value),
      500
    );

    const { cart } = useAppSelector((state) => state.cart);
    const { favorites } = useAppSelector((state) => state.favorite);

    const productCartQuantity = cart.reduce(
      (acc, product) => acc + product.quantity,
      0
    );
    const productFavoriteQuantity = favorites.reduce(
      (acc, product) => acc + product.quantity,
      0
    );

    return (
      <header className={s.header}>
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <Button type="primary" onClick={toggleNavbar}>
          <img src={icon} alt="icon" />
          <p>Каталог</p>
        </Button>
        <Input
          placeholder="Поиск"
          onChange={debounced}
          defaultValue={searchParams.get("q") || ""}
        />
        <Link className={s.link} to="/favorites">
          <div className={s.headerIcons}>
            {!!productFavoriteQuantity && (
              <div className={s.favoriteCounter}>{productFavoriteQuantity}</div>
            )}
            <FavoriteIconInHeader />
            <span className={s.headerIconsText}>Избранное</span>
          </div>
        </Link>
        <Link className={s.link} to="/cart">
          <div className={s.headerIcons}>
            {!!productCartQuantity && (
              <div className={s.favoriteCounter}>{productCartQuantity}</div>
            )}
            <CartIcon />
            <span className={s.headerIconsText}>Корзина</span>
          </div>
        </Link>
      </header>
    );
  }
);
