// @ts-nocheck

import { Input } from "antd";
import s from "./Navbar.module.css";
import { Typography } from "antd";
import { Flex } from "antd";
const { Title } = Typography;

export const Navbar = ({
  handleChangeCategory,
  selectedCategory,
  setPrice,
  price,
}) => {
  return (
    <>
      <ul>
        <li
          onClick={(e) => handleChangeCategory("phone")}
          className={
            selectedCategory === "phone"
              ? `${s.listItem} ${s.active}`
              : `${s.listItem}`
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
      <div className={s.filterPrice}>
        <Title level={5}>Фильтр по цене</Title>
        <Flex gap="small" align="center">
          <Input
            placeholder="От"
            onChange={(e) => setPrice({ ...price, priceFrom: e.target.value })}
          ></Input>
          <span>—</span>
          <Input
            placeholder="До"
            onChange={(e) => setPrice({ ...price, priceTo: e.target.value })}
          ></Input>
        </Flex>
      </div>
    </>
  );
};
