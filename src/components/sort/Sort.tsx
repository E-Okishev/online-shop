// @ts-nocheck

import s from "./Sort.module.css";
import Select from "react-select";

export const Sort = ({ handleChangeFilters, searchParams }) => {
  const selectedSort = searchParams.get("_order");

  const options = [
    { value: "", label: "Популярные" },
    { value: "asc", label: "Дешевле" },
    { value: "desc", label: "Дороже" },
  ];

  const defaultValue = options.find(opt => opt.value === selectedSort) || options[0];

  return (
    <div className={s.sort}>
      <Select
        onChange={(selectedOption) => handleChangeFilters("_order", selectedOption.value)}
        options={options}
        defaultValue={defaultValue}
        placeholder="Сортировать"
      />
    </div>
  );
};
