import { Link, Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import style from "./Navbar.module.css";
import logo from "./img/logo.png";
import { IoClose, IoMenu } from "react-icons/io5";
import { HiShoppingBag } from "react-icons/hi2";
import { BiLogoEdge } from "react-icons/bi";
import { BiLogInCircle } from "react-icons/bi";
import { UserContext} from "../../Context/Context";
import {CounterCartContext} from '../../Context/Context'
import { BiLogOutCircle } from "react-icons/bi";
import { BiSolidUserCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [showNav, setShowNav] = useState(true);
  const [changeNav, setChangeNav] = useState(false);
  const { loggedInUser, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const {state}=useContext(CounterCartContext)



  const changeNavbar = () => {
    if (window.scrollY <= 60) {
      setChangeNav(false);
    } else {
      setChangeNav(true);
    }
  };
  window.addEventListener("scroll", changeNavbar);

  const toggleNavItems = () => {
    setShowNav(!showNav);
  };

  const logoutButton = () => {
    const tokenUser = JSON.parse(localStorage.getItem("token"));
    
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${tokenUser}`,
      },
    };
 
    fetch(`http://localhost:8000/users/logout`, options)
      .then((response) => {
        response.json();
        logout();
        localStorage.removeItem("token");
        navigate("/login");
      })

      .catch((error) => console.log(error));
  };
 
  return (
    <>
      <article className={changeNav ? style.container : style.changeContainer}>
        <div className={style.wrapper}>
          {/* ============================= logo ======================================= */}

          <div className={style.brand}>
            <div>
              <img className={style.imgLogo} src={logo} alt="Logo" />
            </div>
            <a href="/" className={style.linkLogo}>
              <span>
                Spe
                <BiLogoEdge className={style.eStyle} />
                ders
              </span>
            </a>
          </div>

          {/* =================================== menu ================================= */}
          <div className={style.navigationBars}>
            {/* ============================== open/close =============================== */}
            <div className={style.showMenu} onClick={toggleNavItems}>
              {showNav ? (
                <span>
                  <IoMenu className={style.iconOpen} />
                </span>
              ) : (
                <span>
                  <IoClose className={style.iconClose} />
                </span>
              )}
            </div>
            {/* ------------------------------------------------ elements --------------------------- */}
            <nav className={showNav ? style.menu : style.navigationBars}>
              <ul className={style.listNavigate}>
                <li>
                  <Link to="/all/Men" className={style.link}>
                    Men
                  </Link>
                </li>
                <li>
                  <Link to="/all/Woman" className={style.link}>
                    Woman
                  </Link>
                </li>
                <li>
                  <Link to="/all/Kids" className={style.link}>
                    Kids
                  </Link>
                </li>
              </ul>
            </nav>
            <div className={style.loginContainer}>
              {!loggedInUser ? (
                <Link to="/login">
                  <BiLogInCircle name="Login" className={style.login} />
                </Link>
              ) : (
                <>
                  <div className={style.user}>
                    <Link to="/profile">
                      <BiSolidUserCircle className={style.login} />
                    </Link>
                  </div>
                  <Link to='/shoppingBag'><HiShoppingBag className={style.login} /><span className={style.counter}>{state.count}</span></Link>
                  <Link to="/logout">
                    <BiLogOutCircle
                      name="Logout"
                      className={style.login}
                      onClick={logoutButton}
                    />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </article>

      <Outlet />
    </>
  );
};
