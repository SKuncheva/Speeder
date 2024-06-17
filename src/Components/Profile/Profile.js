import style from "./Profile.module.css";
import avatar from "./image/profile.png";
import { IoMdHeart } from "react-icons/io";
import { FaBoxOpen } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { useEffect, useState } from "react";
import { MdClear } from "react-icons/md";
import { Link } from "react-router-dom";

export const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const tokenUser = JSON.parse(localStorage.getItem("token"));
  const [liked, setLiked] = useState([]);
  const [show, setShow] = useState(false);
  const [del, setDel] = useState(false);

  const allLikes = () => {
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
        if (data.length === 0) {
          setShow(true);
        } else {
          setShow(false);
        }
        const getLikedProducts = new Set(data.map(x => x.product_likes));
        setLiked([...getLikedProducts]);
      });
  };

  const deleteLikedProduct = (e) => {
    e.preventDefault();
    const currentIdProduct = e.currentTarget.id;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${tokenUser}`,
      },
    };
    fetch(
      `http://localhost:8000/users/profile/like/${currentIdProduct}`,
      options,
      {
        mode: "no-cors",
      }
    ).then((response) => {
      if (response.status === 204) {
        setDel(true);
      }
    });
  };

  useEffect(() => {
    if (del === true) {
      allLikes();
      setDel(false);
    }
  }, [del]);

  return (
    <div className={style.wrapper}>
      <div className={style.leftSide}>
        <div className={style.blurSide}>
          <h2 className={style.title}>
            Welcome, <span>{user ? user.user : ""}</span>
          </h2>
          {show && (
            <>
              <p className={style.textNoLikes}>You have no liked products!</p>
            </>
          )}
          <div className={style.information}>
            {liked &&
              liked.map((prod) => {
                return (
                  <ul key={prod.id} className={style.likeElements}>
                    <Link to={`/products/${prod.id}`} className={style.link}>
                      <li className={style.likeList}>
                        <img src={`http://127.0.0.1:8000${prod.image}`} alt={prod.brand} className={style.image} />
                      </li>
                      <li className={style.likeList}>
                        {prod.brand} - {prod.model}
                      </li>
                      <li className={style.likeList}>{prod.price} $</li>
                      <button
                        className={style.removeButton}
                        id={prod.id}
                        onClick={(e) => deleteLikedProduct(e)}
                      >
                        <MdClear />
                      </button>
                    </Link>
                  </ul>
                );
              })}
          </div>
        </div>{" "}
      </div>
      <div className={style.rightSide}>
        <img src={avatar} alt="profilePicture" className={style.avatar} />
        <div className={style.iconBox}>
          <MdEditSquare className={style.iconPen} />
          <IoMdHeart className={style.iconHeart} onClick={allLikes} />
          <FaBoxOpen className={style.iconOrder} />
        </div>
      </div>
    </div>
  );
};
