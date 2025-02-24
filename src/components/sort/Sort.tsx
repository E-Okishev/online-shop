// @ts-nocheck

import s from "./Sort.module.css";
import Select from "react-select";

export const Sort = ({ handleChangeSort }) => {
  const options = [
    { value: "", label: "Популярные" },
    { value: "asc", label: "Дешевле" },
    { value: "desc", label: "Дороже" },
  ];

  return (
    <div className={s.sort}>
      <Select
        onChange={(selectedOption) => handleChangeSort(selectedOption.value)}
        options={options}
        defaultValue={options[0]}
        placeholder={"Сортировать"}
      />
    </div>
  );
};
