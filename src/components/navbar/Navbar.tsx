// @ts-nocheck

import { Input } from "antd";
import s from "./Navbar.module.css";
import { Typography } from "antd";
import { Flex } from "antd";
const { Title } = Typography;

export const Navbar = ({ handleChangeFilters, searchParams }) => {
  const selectedCategory = searchParams.get("category");
  return (
    <>
      <ul>
        <li
          onClick={(e) => handleChangeFilters("category", "phone")}
          className={
            selectedCategory === "phone"
              ? `${s.listItem} ${s.active}`
              : `${s.listItem}`
          }
        >
          Телефоны
        </li>
        <li
          onClick={(e) => handleChangeFilters("category", "laptop")}
          className={
            selectedCategory === "laptop"
              ? `${s.listItem} ${s.active}`
              : `${s.listItem}`
          }
        >
          Ноутбуки
        </li>
        <li
          onClick={(e) => handleChangeFilters("category", "pristavka")}
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
            onChange={(e) => handleChangeFilters("price_gte", e.target.value)}
            value={searchParams.get("price_gte")}
          ></Input>
          <span>—</span>
          <Input
            placeholder="До"
            onChange={(e) => handleChangeFilters("price_lte", e.target.value)}
            value={searchParams.get("price_lte")}
          ></Input>
        </Flex>
      </div>
    </>
  );
};
