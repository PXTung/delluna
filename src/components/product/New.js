import { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Header from "./Header";
import Item from "../product/ProductItem";

const New = (props) => {
  const newest = props.product;
  const [carousel, setCarousel] = useState({ item: 4, margin: 15 });

  useEffect(() => {
    window.addEventListener("resize", resizeHanle);
    resizeHanle();
  }, []);

  const resizeHanle = () => {
    const size = window.innerWidth;

    if (size <= 1023 && size > 767) {
      setCarousel({ item: 2, margin: 30 });
    } else if (size <= 767) {
      setCarousel({ item: 1, margin: 0 });
    } else {
      setCarousel({ item: 4, margin: 15 });
    }
  };

  const MyCarousel = () => {
    return (
      <OwlCarousel
        className="owl-theme"
        items={carousel.item}
        loop="false"
        rewind="true"
        margin={carousel.margin}
        autoplay="true"
        autoplayTimeout={2500}
        autoplayHoverPause="true"
      >
        {newest.map((product) => (
          <Item key={product.id} product={product} animation={false} />
        ))}
      </OwlCarousel>
    );
  };

  return (
    <section className="new">
      <Header title="New Product" />
      <div className="new-list grid">
        <MyCarousel />
      </div>
    </section>
  );
};

export default New;
