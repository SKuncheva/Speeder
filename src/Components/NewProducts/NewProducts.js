import style from "./NewProducts.module.css";
import { Product } from "../Product/Product";
import { useState, useEffect } from "react";

export const NewProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/products/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const getData = data;
        setProducts(getData.reverse());
      });
  }, []);

  return (
    <section>
      <div className={style.wrapper}>
        <h3 className={style.title}>New For You</h3>

        <hr />
        <div className={style.items}>
          <article>
            <div className={style.positionItems}>
              {products
                .map((prod, index) => {
                  return (
                    <Product
                      key={index}
                      id={prod.id}
                      image={prod.image}
                      brand={prod.brand}
                      model={prod.model}
                      description={prod.description}
                      price={prod.price}
                    />
                  );
                })
                .slice(0, 4)}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
