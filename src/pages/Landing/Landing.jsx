import Category from "../../components/Category/Category";
import Product from "../../components/Product/Product";
import LayOut from "../../components/LayOut/LayOut";
import Carousel from "../../components/Carousel/Carousel";

function Landing() {
  return (
    <LayOut>
      <Carousel />
      <Category />
      <Product />
    </LayOut>
  );
}

export default Landing;
