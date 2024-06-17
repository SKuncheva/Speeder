import { useState, useEffect } from "react";
import style from "./SortProducts.module.css";

export const SortProducts = ({ data, onChangeData }) => {
  const optionsSort = [
    "Sort",
    "Low price",
    "High price",
    "Ascending by name",
    "Descending by name",
  ];
  const [selected, setSelected] = useState("");

  const getSelect = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSelected(value);
  };

  const sortProduct = (data) => {
    if (selected === "Sort") {
      const sort = data;
      onChangeData((oldData) => [...oldData, sort]);
      setSelected("");
    } else if (selected === "Low price") {
      const lowPrice = data.sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
      onChangeData((oldData) => [...oldData, lowPrice]);
      setSelected("");
    } else if (selected === "High price") {
      const highPrice = data.sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      );
      onChangeData((oldData) => [...oldData, highPrice]);
      setSelected("");
    } else if (selected === "Ascending by name") {
      const ascendingName = data.sort((a, b) => a.brand.localeCompare(b.brand));
      onChangeData((oldData) => [...oldData, ascendingName]);
      setSelected("");
    } else if (selected === "Descending by name") {
      const descendingName = data.sort((a, b) =>
        b.brand.localeCompare(a.brand)
      );
      onChangeData((oldData) => [...oldData, descendingName]);
      setSelected("");
    }
  };

  useEffect(() => {
    sortProduct(data);
  }, [selected, data]);

  return (
    <div className={style.sortWrapper}>
      <label>
        <select name="sort" onChange={getSelect} className={style.select}>
          {optionsSort.map((item, index) => {
            return (
              <option key={index} value={item} className={style.options}>
                {item}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
};
