import s from "./Sort.module.css";
import Select, { SingleValue } from "react-select";
import { FilterParams } from "../../utils";

type OptionType = {
  value: string;
  label: string;
};

export const Sort = ({ handleChangeFilters, searchParams }: FilterParams) => {
  const selectedSort = searchParams.get("_order");

  const options: OptionType[] = [
    { value: "", label: "Популярные" },
    { value: "asc", label: "Дешевле" },
    { value: "desc", label: "Дороже" },
  ];

  const defaultValue =
    options.find((opt) => opt.value === selectedSort) || options[0];

  return (
    <div className={s.sort}>
      <Select
        onChange={(selectedOption: SingleValue<OptionType>) => {
          if (selectedOption) {
            handleChangeFilters("_order", selectedOption.value);
          }
        }}
        options={options}
        defaultValue={defaultValue}
        placeholder="Сортировать"
      />
    </div>
  );
};
