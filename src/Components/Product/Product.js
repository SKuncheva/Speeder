import style from "./Product.module.css";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/Context";

export const Product = (props) => {
  const { loggedInUser } = useContext(UserContext);
  const [buttondisabled, setButtonDisabled] = useState(false);
  const [changeButton, setChangeButton]=useState(false)
  const user = JSON.parse(localStorage.getItem("user"));
  const img = props.image;

  const urlImage = () => {
    const startUrl = img.startsWith("http");
    if (startUrl === true) {
      return img;
    } else {
      return "http://127.0.0.1:8000" + img;
    }
  };

  const like = () => {
    const data = { user: user.id, product: props.id };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:8000/users/like", options)
    .then((response) => {
      if (response.status === 400) {
        alert("The product is already liked!");
      }
      response.json();
      setChangeButton(true)
  
    });
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
    fetch(`http://localhost:8000/users/profile/${user.id}/like`, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.length !== 0) {
          const getAll = data.map((x) => x.product);
          if (getAll.includes(props.id)) {
            setButtonDisabled(true);
          }
        }
      });
  }, []);

  return (
    <div className={style.productWrapper}>
      <Link to={`/products/${props.id}`}>
        <div className={style.imgWrapper}>
          <div className={style.seeWrapper}>
            <FaEye className={style.seeProduct} />
          </div>
          <img src={urlImage()} alt={props.title} className={style.img} />
        </div>
      </Link>

      <hr />
      <div className={style.description}>
        <h3>{props.brand}</h3>
        <p>{props.model}</p>
        <p>{props.category}</p>
        <p className={style.price}>{props.price} $</p>
        {loggedInUser && !buttondisabled && (
          <div className={style.icon}>
            <AiFillHeart
              className={!changeButton? style.like: style.removeLikeButton}
              // className={style.like}
              onClick={like}
            />
          </div>
        )}
        <div></div>
      </div>
    </div>
  );
};
