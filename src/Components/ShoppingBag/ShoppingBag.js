import { useContext, useEffect, useState } from "react";
import { MdClear } from "react-icons/md";
import style from "./ShoppingBag.module.css";
import { CounterCartContext } from "../../Context/Context";
import { IoInformationCircle } from "react-icons/io5";

export const ShoppingBag = () => {
  const [cartItems, setCartItems] = useState();
  const [show, setShow] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [dataInfo, setDataInfo] = useState({ product: "", quantity: "" });
  const [del, setDel] = useState(false);
  const { dispatch } = useContext(CounterCartContext);
  const [price, setPrice] = useState();

  const increase = (e) => {
    e.preventDefault();
    const quantity = parseInt(e.currentTarget.value);
    const idProduct = e.currentTarget.id;
    setDataInfo({ product: idProduct, quantity: quantity + 1 });
    setRefresh(true);
  };

  const decrease = (e) => {
    e.preventDefault();
    const quantity = parseInt(e.currentTarget.value);
    const idProduct = e.currentTarget.id;
    const newQuantity = quantity - 1;

    setDataInfo((oldData) => ({ ...oldData, product: idProduct, quantity: newQuantity }));
    setRefresh(true);
  };

  const removeProduct = (e) => {
    const id = e.currentTarget.id;
    setDataInfo({ product: id });
    setDel(true);
    dispatch({ type: "Decrement" });
  };

  useEffect(() => {
    const tokenUser = JSON.parse(localStorage.getItem("token"));
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${tokenUser}`,
      },
    };
    fetch(`http://localhost:8000/users/cart/products`, options)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.lenght === 0) {
          setShow(true);
        } else {
          setShow(false);
        }
        setCartItems(data);
        const getAllPrice = data.map((x) => x.total_price_product);
        const sumAllPrice = getAllPrice.reduce((a, b) => a + b, 0);
        setPrice(sumAllPrice);
      });

    if (refresh) {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${tokenUser}`,
        },
        body: JSON.stringify(dataInfo),
      };

      fetch("http://localhost:8000/users/cart/products/update", options).then(
        (response) => {
          return response.json();
        }
      );

      setRefresh(false);
    }
    if (del) {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${tokenUser}`,
        },
        body: JSON.stringify(dataInfo),
      };

      fetch("http://localhost:8000/users/cart/products/remove", options, {
        mode: "no-cors",
      }).then((response) => {
        if (response.status === 204) {
          setDel(false);
        }
      });
    }
  }, [refresh, dataInfo, del]);

  return (
    <>
      <h2 className={style.header}>Your Basket</h2>
      <div className={style.section}>
        <div className={style.wrapper}>
          {show && (
            <>
              <p className={style.texIstEmpty}>Your cart is empty!</p>
            </>
          )}
          {cartItems &&
            cartItems.map((item, index) => {
              return (
                <ul key={index} className={style.text}>
                  <li className={style.li}>
                    <div>
                      <img
                        src={item.product.image}
                        alt={item.product.brand}
                        className={style.img}
                      />
                    </div>
                    <div className={style.model}>
                      <span className={style.brand}>{item.product.brand}</span>
                      <span>{item.product.model}</span>
                    </div>

                    <div className={style.quantity}>
                      <button
                        id={item.product.id}
                        value={item.quantity}
                        onClick={(e) => decrease(e)}
                        disabled={item.quantity < 2}
                        className={style.buttonElement}
                      >
                        <span>-</span>
                      </button>
                      <div>{item.quantity}</div>
                      <button
                        id={item.product.id}
                        value={item.quantity}
                        onClick={(e) => increase(e)}
                        className={style.buttonElement}
                      >
                        <span>+</span>
                      </button>
                    </div>

                    <div className={style.price}>
                      {item.total_price_product.toFixed(2)} $
                    </div>
                    <button
                      id={item.product.id}
                      onClick={(e) => removeProduct(e)}
                      className={style.removeButton}
                    >
                      <MdClear />
                    </button>
                  </li>
                </ul>
              );
            })}
        </div>
        <aside className={style.rightSide}>
          <h3 className={style.titleInfo}>Order Summary</h3>
          <p className={style.price}>
            Total: <span>{price} $</span>
          </p>
          <button className={style.button}>Continued to checkout</button>
          <div className={style.information}>
            <IoInformationCircle className={style.iconInformation} />
            <p>
              Hurry up with the order - it is not enough to add products to the
              basket to save them.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
};
