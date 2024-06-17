import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { IoFootsteps } from "react-icons/io5";
import style from "./DetailProduct.module.css";
import {CounterCartContext} from "../../Context/Context";

export const DetailProduct = () => {
  const {dispatch}=useContext(CounterCartContext)
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [productQuantity, setProductQuantity] = useState(1);
  const tokenUser = JSON.parse(localStorage.getItem("token"));

  const addProductToCart = () => {
    const data = { product: id, quantity: productQuantity };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${tokenUser}`,
      },
      body: JSON.stringify(data),
    };

    fetch("http://localhost:8000/users/cart/products/add", options)
      .then((response) => {
        if(response.status===400){
          alert('The product is already in cart!')
        }else{
         dispatch({ type: 'Increase'})
        return response.json();}
      })

  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/products/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      });
  }, [id]);

  return (
    <section className={style.detailWrapper}>
      <div className={style.productWrapper}>
        {products.map((prod, index) => {
          return (
            <section key={index} className={style.detailElement}>
              <div className={style.imgWrapper}>
                <img src={prod.image} alt={prod.brand} className={style.img} />
              </div>
              <div className={style.textWrapper}>
                <h2 className={style.title}>{prod.model}</h2>
                <div className={style.textModel}>
                  <hr className={style.line} />{" "}
                  <p className={style.description}>{prod.brand}</p>{" "}
                  <hr className={style.line} />
                </div>
                <p>{prod.description}</p>
                <div className={style.sizeWrapper}>
                  <p>
                    <IoFootsteps className={style.size} /> {prod.size}
                  </p>
                </div>
                <div className={style.buyProduct}>
                  <p key={index} className={style.price}>
                    <span>{prod.price}</span>$
                  </p>
                  <div className={style.buttonQuantity}>
                    <div className={style.quantity}>
                      <button
                        className={style.buttonElement}
                        onClick={() => setProductQuantity(productQuantity - 1)}
                        disabled={productQuantity < 2}
                      >
                        <span>-</span>
                      </button>
                      <span>{productQuantity < 1 ? 1 : productQuantity}</span>
                      <button
                        value={prod.price}
                        className={style.buttonElement}
                        onClick={() => setProductQuantity(productQuantity + 1)}
                      >
                        <span>+</span>
                      </button>
                    </div>
                    <button
                      className={style.button}
                      id={prod.id}
                      value={prod.price}
                      onClick={() => addProductToCart()}
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
};
