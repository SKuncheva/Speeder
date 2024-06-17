import { Billboard } from "../Billboard/Billboard";
import { ProductsSection } from '../ProductsSection/ProductsSection';
import { NewProducts } from '../NewProducts/NewProducts';
import { InformationBox } from '../InformationBox/InformationBox';
import { Partners } from '../Partners/Partners';

export const HomePage = () => {
  return (
    <>
      <Billboard />
      <ProductsSection />
      <NewProducts />
      <InformationBox />
      <Partners />
    </>
  );
};
