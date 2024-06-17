// import { useState, useEffect } from "react";
import { Product } from "../Product/Product";
import style from "./AllProduct.module.css";
import { useFetch } from "../../Hooks/useFetch";
export const AllProducts = () => {

  const { data } = useFetch('http://127.0.0.1:8000/products/');


  return (
    <section>
      <div className={style.wrapper}>
        <div className={style.imageWrapper}></div>
        <div className={style.textwrapper}>
          <h1 className={style.title}>Break The Stereotypes</h1>
          <h3>Get Your Inspired</h3>
        </div>

        <div className={style.product}>
          <article>
            <div className={style.sectionProduct}>
              {data && data.map((prod, index) => {
                
                return (
                  <Product
                    key={index}
                    id={prod.id}
                    image={prod.image}
                    brand={prod.brand}
                    model={prod.model}
                    description={prod.description}
                    price={prod.price}
                    className={style.element}
                
                   />
                );
              })}
            </div>
          </article>
          
        </div>
      </div>
    </section>
  );
};
