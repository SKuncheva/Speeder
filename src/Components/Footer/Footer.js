import style from "./Footer.module.css";
import { SiYoutubemusic } from "react-icons/si";
import { SiFacebook } from "react-icons/si";
import { SiPinterest } from "react-icons/si";

export const Footer = () => {
  return (
    <>
      <section className={style.wrapper}>
        <div className={style.wrapperElements}>
        <div className={style.media}>
          <hr className={style.line} />
          <div>
            <a href="https://www.youtube.com" className={style.link}>
              <SiYoutubemusic />
            </a>
          </div>
          <div>
            <a href="https://www.facebook.com" className={style.link}>
              <SiFacebook />
            </a>
          </div>
          <div>
            <a href="https://www.pinterest.com" className={style.link}>
              <SiPinterest />
            </a>
          </div>
          <hr className={style.line} />
        </div>

        
        <div >
          <ul className={style.listWrapper}>
            <li className={style.list}>
              <a href="/" className={style.links}>
                Home
              </a>
            </li>
            <li className={style.list}>
              <a href="/" className={style.links}>
                Privacy Policy
              </a>
            </li>
            <li className={style.list}>
              <a href="/" className={style.links}>
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        </div>
      </section>
    </>
  );
};
