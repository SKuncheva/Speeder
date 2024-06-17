import style from "./InformationBox.module.css";
import { FaShieldAlt } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { GiRunningShoe } from "react-icons/gi";

export const InformationBox = () => {
  return (
    <section>
      <div className={style.wrapper}>
        <div className={style.section}>
          <div className={style.element}>
            <h4>Fast delivery</h4>
            <div>
              <FaTruck className={style.icon} />
            </div>
          </div>
        </div>

        <div className={style.section}>
          <div className={style.element}>
            <h4>Payment 100% Secure</h4>
            <div>
              {""}
              <FaShieldAlt className={style.icon} />
            </div>
          </div>
        </div>

        <div className={style.section}>
          <div className={style.element}>
            <h4>14 Day Return</h4>
            <div>
              {" "}
              <GiReturnArrow className={style.icon} />
            </div>
          </div>
        </div>

        <div className={style.section}>
          <div className={style.element}>
            <h4>Huge Variety of Products</h4>
            <div>
              {" "}
              <GiRunningShoe className={style.icon} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
