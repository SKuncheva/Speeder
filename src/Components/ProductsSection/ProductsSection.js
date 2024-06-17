import { Link } from "react-router-dom";
import doIt from "./img/JustDoIt.jpg";
import style from "./ProductsSection.module.css";

export const ProductsSection = () => {
  return (
    <section>
      <div className={style.wrapperSection}>

        <div className={style.text}>
          <h2 className={style.title}>NEVER STOP</h2>
          <div className={style.p}>Push The Limits Of The Impossible</div>
          <div className={style.buttonWrapper}>
            <Link to="/products" className={style.button}>See More</Link>
          </div>
        </div>

        <div>
          <div>
            <img src={doIt} alt="Do It" />
          </div>
        </div>
      </div>
    </section>
  );
};
