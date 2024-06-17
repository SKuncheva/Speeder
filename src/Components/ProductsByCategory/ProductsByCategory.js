import woman from "./image/Nike_blue.png";
import men from "./image/nike_Fau9rkd.png";
import kids from "./image/nike-air-max-2.png";
import { Product } from "../Product/Product";
import { Link, useParams } from "react-router-dom";
import style from "./ProductsByCategory.module.css";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useFetch } from "../../Hooks/useFetch";
import { Slider } from "../Slider/Slider";
import { SortProducts } from "../Sort/SortProducts";

export const ProductsByCategory = () => {
  const { filterByGender } = useParams();
  let url = `http://127.0.0.1:8000/products/all=${filterByGender}?category=${filterByGender}`;
  const { data } = useFetch(url);
  const [params, setParams] = useState([]);

  const [dataProducts, setDataProducts] = useState([]);

  const [showFilter, setShowFilter] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  const brandData = dataProducts
    .map((i) => i.brand)
    .sort((a, b) => a.localeCompare(b));
  const uniqueBrand = [...new Set(brandData)];
  const sizeData = dataProducts
    .map((i) => i.size)
    .sort((a, b) => (a > b ? 1 : -1));
  const uniqueSize = [...new Set(sizeData)];
  const [newSorted, setNewSorted] = useState([]);
  // const getAllPrice = (data.results).map((x) => x.price);
  // const maxValuePrice =parseInt(getAllPrice.sort(
  //   (a, b) => parseFloat(b.price) - parseFloat(a.price)
  // )[0]);

  const [value, setValue] = useState({ min: 0, max: 500 });

  useEffect(() => {
    if (params.length > 0) {
      url = `${url}${params}`;
    }
   
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
  
        setDataProducts(data);
      });
  }, [filterByGender, params]);

  const bilboard = () => {
    if (filterByGender === "Men") {
      return (
        <>
          <div className={style.imgWrapper}>
            <p className={style.text}>
              Men <span className={style.span}>Collection</span>
            </p>
          </div>
          <div>
            <img src={men} alt="Men" className={style.img} />
          </div>
        </>
      );
    } else if (filterByGender === "Woman") {
      return (
        <>
          <div>
            <p className={style.text}>
              Woman <span className={style.span}>Collection</span>
            </p>
          </div>
          <div className={style.imgWrapper}>
            <img src={woman} alt="Woman" className={style.img} />
          </div>
        </>
      );
    } else {
      return (
        <>
          <div>
            <p className={style.text}>
              Kids <span className={style.span}>Collection</span>
            </p>
          </div>
          <div className={style.imgWrapper}>
            <img src={kids} alt="Kids" className={style.imgKids} />
          </div>
        </>
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const formNotEmpty = Object.entries(formData).filter(
      ([k, v]) => v !== "" && v !== "0"
    );
    const parameters = formNotEmpty.map((item) => `&${item[0]}=${item[1]}`);
    const urlParams = parameters.join("");
    const price = `&min_price=${value.min}&max_price=${value.max}`;
    setParams(urlParams + price);
  };

  const OpenFilter = () => {
    setOpenFilter(!openFilter);
    setShowFilter(!showFilter);
  };

  return (
    <section className={style.wrapper}>
      <div className={style.bilboard}>{bilboard()}</div>
      <div>
        <article className={style.wrapperElements}>
          <div>
            {/* ---------------------------------------Filter-------------------------------------------------- */}
            <section>
              <div className={style.titleFilter}>
                <h4>Filters</h4>
                <div onClick={OpenFilter}>
                  {!openFilter ? (
                    <span>
                      <AiOutlineCaretDown className={style.arrow} />
                    </span>
                  ) : (
                    <span>
                      <AiOutlineCaretUp className={style.arrow} />
                    </span>
                  )}
                </div>
              </div>
              <form
                className={
                  showFilter
                    ? style.wrapperFilterOpen
                    : style.wrapperFilterClose
                }
                onSubmit={handleSubmit}
              >
                <div className={style.elementBrand}>
                  <label>
                    <select name="brand" className={style.brandSelect}>
                      <option value=""> Brand </option>
                      {uniqueBrand.map((item, index) => {
                        return (
                          <option
                            key={index}
                            value={item}
                            className={style.options}
                          >
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </label>
                </div>
                <div>
                  <div className={style.elementSize}>
                    <p style={{ color: "#36e1ea", fontWeight: "bold" }}>
                      Size:
                    </p>
                    {uniqueSize.map((item, index) => {
                      return (
                        <div key={index} className={style.checkboxSize}>
                          <input
                            type="checkbox"
                            name="size"
                            value={item}
                            className={style.checkbox}
                          />
                          <label className={style.label}>
                            <span className={style.span}>{item}</span>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={style.elementPrice}>
                  <Slider
                    min={0}
                    max={500}
                    step={10}
                    value={value}
                    onChange={setValue}
                  />
                  <div className={style.priceText}>
                    <p>{value.min}</p>
                    <p>{value.max}</p>
                  </div>
                </div>
                <input type="submit" value="Filter" className={style.button} />
              </form>
            </section>
            {/* ------------------------------------------------------------------------------------------------- */}
          </div>
          {/* -------------------------------------Sort------------------------------- */}
          <section>
            <SortProducts data={dataProducts} onChangeData={setNewSorted} />
          </section>
          {/* ----------------------------------------------Product mapping---------------------------------------------------- */}

          <div className={style.productWrapper}>
            {dataProducts.length !== 0 ? (
              dataProducts.map((prod, index) => {
                return (
                  <Product
                    key={index}
                    id={prod.id}
                    image={prod.image}
                    brand={prod.brand}
                    model={prod.model}
                    category={prod.category}
                    description={prod.description}
                    price={prod.price}
                  />
                );
              })
            ) : (
              <h2 className={style.message}>There is no such product!</h2>
            )}
          </div>
        </article>
      </div>
      <div>
        <button>Previous</button>
        <button>Next</button>
      </div>
    </section>
  );
};
