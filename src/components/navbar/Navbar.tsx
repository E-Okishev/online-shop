import s from "./Navbar.module.css";
import { Typography, Input, Flex, Select } from "antd";
const { Title } = Typography;
import { debounce } from "lodash";
import { FilterParams } from "../../utils";
import { useGetBrandsQuery } from "../../services/brandsApi";

export const Navbar = ({ handleChangeFilters, searchParams }: FilterParams) => {
  const selectedCategory = searchParams.get("category");
  const debouncedPrice = debounce(
    (key: string, value: string) => handleChangeFilters(key, value),
    500
  );

  const { data, error, isLoading } = useGetBrandsQuery();
  const options = data?.map((brand) => ({ label: brand, value: brand }));

  return (
    <>
      <Flex vertical gap="middle">
        <div>
          <Title level={5}>Категории</Title>
          <ul>
            <li
              onClick={() => handleChangeFilters("category", "phone")}
              className={
                selectedCategory === "phone"
                  ? `${s.listItem} ${s.active}`
                  : `${s.listItem}`
              }
            >
              Телефоны
            </li>
            <li
              onClick={() => handleChangeFilters("category", "laptop")}
              className={
                selectedCategory === "laptop"
                  ? `${s.listItem} ${s.active}`
                  : `${s.listItem}`
              }
            >
              Ноутбуки
            </li>
            <li
              onClick={() => handleChangeFilters("category", "pristavka")}
              className={
                selectedCategory === "pristavka"
                  ? `${s.listItem} ${s.active}`
                  : `${s.listItem}`
              }
            >
              Игровые консоли
            </li>
          </ul>
        </div>
        {error ? (
          <p style={{ color: "red" }}>Ошибка</p>
        ) : (
          <div>
            <Title level={5}>Бренд</Title>
            <Select
              onSelect={(value) => handleChangeFilters("q", value)}
              style={{ width: "100%" }}
              options={options}
              loading={isLoading}
              placeholder="Выберите бренд"
            />
          </div>
        )}
        <div>
          <Title level={5}>Фильтр по цене</Title>
          <Flex gap="small" align="center">
            <Input
              placeholder="От"
              onChange={(e) => debouncedPrice("price_gte", e.target.value)}
              defaultValue={searchParams.get("price_gte") || ""}
            ></Input>
            <span>—</span>
            <Input
              placeholder="До"
              onChange={(e) => debouncedPrice("price_lte", e.target.value)}
              defaultValue={searchParams.get("price_lte") || ""}
            ></Input>
          </Flex>
        </div>
      </Flex>
    </>
  );
};
