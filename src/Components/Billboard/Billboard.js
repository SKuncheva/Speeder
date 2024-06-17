import style from "./Billboad.module.css";
import run from "./ImageBillboard/run.png";

export const Billboard = () => {
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <p className={style.textFast}>Fast</p>
      </div>
      <div className={style.runImg}>
        <img className={style.img} src={run} alt="Run" />
      </div>
      <p className={style.textRunning}>Running</p>

      <div className={style.textWrapper}>
        <div>
          <div>Everywhere, At Any Time,<br/> In Any Conditions <br/><i><span className={style.titleDecoration}> be the best</span></i></div>
    
        </div>
      </div>
    </div>
  );
};
