import { useState, useRef, useContext } from "react";
import { Billboard } from "../Billboard/Billboard";
import style from "./Register.module.css";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/Context";

export const Register = () => {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    password2: "",
  });

 const {login}=useContext(UserContext)
  const [errorMsg, setErrorMsg] = useState([]);
  const formRef = useRef();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setRegisterData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (
      registerData.email.length === 0 ||
      registerData.password.length === 0 ||
      registerData.password2.length === 0
    ) {
      setErrorMsg("Fields must not be empty");
    } else if (registerData.password !== registerData.password2) {
      setErrorMsg("The passwords do not match");
    } else if (
      registerData.password.length < 6 ||
      registerData.password2.length < 6
    ) {
      setErrorMsg("The password must contain a minimum of 6 characters");
    } else {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      };
      fetch(`http://localhost:8000/users/register`, options)
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            alert(data.message);
          } else {
            alert("You have successfully registered");
            formRef.current.reset();
            setRegisterData("");
            navigate("/");
            login(data)
          }
        })
        .catch((error) => setErrorMsg(error));
    }
  };

  return (
    <section className={style.wrapper}>
      <div className={style.billboardWrapper}>
        <Billboard />
      </div>
      <div className={style.container}>
        {errorMsg && (
          <p
            style={{
              color: "rgb(123, 0, 0)",
              marginBottom: "-20px",
              fontWeight: "600",
            }}
          >
            {errorMsg}
          </p>
        )}
        <form onSubmit={handleSubmit} ref={formRef} className={style.form}>
          <div className={style.elements}>
            {/* --------------------Email --------------------- */}
            <div className={style.rowInput}>
              <div>
                <MdEmail className={style.icon} style={{ fontSize: "26px" }} />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email addres"
                onChange={handleInputChange}
                className={style.input}
                style={{ width: "82.5%", paddingLeft: "40px" }}
              />
            </div>

      
            <div>
              {/* -------------------Password-------------------- */}
              <div className={style.rowInput}>
                <div>
                  <FaLock className={style.icon} />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                  className={style.input}
                  style={{ width: "40%", paddingLeft: "40px" }}
                />

                <input
                  type="password"
                  name="password2"
                  placeholder="Confirm Password"
                  onChange={handleInputChange}
                  className={style.input}
                  style={{ width: "40%" }}
                />
              </div>
              {/* ----------------Button------------------------- */}
              <div>
                <input
                  type="submit"
                  value="Register"
                  className={style.button}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
