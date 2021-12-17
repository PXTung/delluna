import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Suggestions from "../product/Suggestions";
import Loading from "../loading/Loading";
import Hot from "../product/Hot";
import New from "../product/New";
import { ConstantContext } from "../../context/Constant";

const Home = () => {
  const constant = useContext(ConstantContext);
  const host = constant.host_api;

  const [product, setProduct] = useState({
    suggestions: [],
    hot: [],
    new: [],
  });

  useEffect(() => {
    (async () => {
      const homeProduct = await axios.get(host + "/product/home");

      setProduct({
        suggestions: homeProduct.data.suggestion,
        hot: homeProduct.data.top,
        new: homeProduct.data.newest,
      });
      window.scrollTo(0, 0);
    })();
  }, [host]);

  if (product.suggestions.length > 0) {
    return (
      <section className="home grid-full">
        <div className="home-hero"></div>
        <Suggestions product={product.suggestions} />
        <Hot product={product.hot} />
        <New product={product.new} />
      </section>
    );
  } else {
    return <Loading />;
  }
};

export default Home;
