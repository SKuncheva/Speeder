import style from "./Partners.module.css";

export const Partners = () => {
  return (
    <>
      <section className={style.wrapper}>
        <div>
        
          <div className={style.container}>
          <h3 className={style.title}> Top Brands</h3>
          <div className={style.brands}>
            <div className={style.elements}>
              <img
                className={style.logo}
                src="https://www.freepnglogos.com/uploads/adidas-logo-photo-png-3.png"
                alt="Adidas"
              />
            </div>
            <div className={style.elements}>
              <img
                className={style.logo}
                src="https://clipart-library.com/images_k/white-adidas-logo-transparent/white-adidas-logo-transparent-22.png"
                alt="Nike"
              />
            </div>
            <div className={style.elements}>
              <img
                className={style.logo}
                src="https://clipart-library.com/images_k/puma-transparent-logo/puma-transparent-logo-3.png"
                alt="Puma"
              />
            </div>
            <div className={style.elements}>
              <img
                className={style.logo}
                src="https://clipart-library.com/images_k/white-adidas-logo-transparent/white-adidas-logo-transparent-16.png"
                alt="Reebok"
              />
            </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
