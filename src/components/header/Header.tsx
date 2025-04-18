import logo from "../../img/logo.svg";
import icon from "../../img/buttonIcon.svg";
import s from "./Header.module.css";
import { FavoriteIconInHeader } from "../icons/FavoriteIconInHeader/FavoriteIconInHeader";
import { Link } from "react-router-dom";
import { CartIcon } from "../icons/cartIcon/CartIcon";
import { Input, Button, Modal } from "antd";
import { memo, useState } from "react";
import { debounce } from "lodash";
import { useAppSelector } from "../../hooks/reduxHooks";
import { FilterParams } from "../../utils";
import { LoginIcon } from "../icons/loginIcon/LoginIcon";
import { LoginForm } from "../loginForm";

type HeaderProps = FilterParams & {
  toggleNavbar: () => void;
};

export const Header = memo(
  ({ handleChangeFilters, toggleNavbar, searchParams }: HeaderProps) => {
    const debounced = debounce(
      (e: React.ChangeEvent<HTMLInputElement>) =>
        handleChangeFilters("q", e.target.value),
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

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
      <>
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
          <div className={s.headerIcons} onClick={() => setIsModalOpen(true)}>
            <LoginIcon />
            <span className={s.headerIconsText}>Войти</span>
          </div>
          <Link className={s.link} to="/favorites">
            <div className={s.headerIcons}>
              {!!productFavoriteQuantity && (
                <div className={s.favoriteCounter}>
                  {productFavoriteQuantity}
                </div>
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
        <Modal
          open={isModalOpen}
          onOk={() => setIsModalOpen(false)}
          destroyOnClose
        >
          <LoginForm />
        </Modal>
      </>
    );
  }
);
