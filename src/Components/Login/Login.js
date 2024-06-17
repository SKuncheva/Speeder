import style from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUserLarge } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import { useContext, useState } from "react";
import { Billboard } from "../Billboard/Billboard";
import { UserContext } from "../../Context/Context";

export const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState([]);


  const onFormSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (values.email === "" || values.password === "") {
      setErrorMsg("Fields must not be empty");
    } else {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
      fetch(`http://localhost:8000/users/login`, options)
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            alert(data.message);
          } else {
            alert("You have successfully login");
            navigate("/");
            login(data);
          }
        })
        .catch((error) => setErrorMsg(error));
    }
  };

  const handleChange = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  return (
    <section className={style.loginSection}>
      <div className={style.billboardWrapper}>
        <Billboard />
      </div>
      <div className={style.container}>
        <form onSubmit={onFormSubmit} className={style.form}>
        {errorMsg && (
          <p
            style={{
              color: "rgb(123, 0, 0)",
              marginTop: "-30px",
              fontWeight: "600",
            }}
          >
            {errorMsg}
          </p>
        )}
          {/* ------------------------------------Email------------------------------------- */}
          <div className={style.rowWrapper}>
            <div className={style.row}>
              <div className={style.iconWrapper}>
                <FaUserLarge className={style.icon} />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className={style.inputElement}
                value={values.email}
                onChange={handleChange}
              />
            </div>
            {/* -------------------------------Password------------------------------------------ */}
            <div className={style.row}>
              <div className={style.iconWrapper}>
                <FaLock className={style.icon} />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={style.inputElement}
                value={values.password}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* -------------------------------Button Login--------------------------------------- */}
          <div>
            <input type="submit" value="Login" className={style.button} />
          </div>
        </form>
        {/* ---------------------------------Register----------------------------------------- */}
        <div className={style.register}>
          <p>You don`t have registration?</p>
          <Link to="/register" className={style.registerLink}>
            Register
          </Link>
        </div>
      </div>
    </section>
  );
};
