import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import OwlCarousel from "react-owl-carousel";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Loading from "../loading/Loading";
import { CartContext } from "../../context/Cart";
import { useHistory } from "react-router";
import Header from "./Header";

const ProductDetail = (props) => {
  const id = props.match.params.id;
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState();
  const [isActive, setActive] = useState({
    content: true,
    policy: false,
    related: false,
  });

  useEffect(() => {
    axios
      .get("https://dellunashop.herokuapp.com/product/" + id)
      .then((res) => {
        setProduct({
          product: res.data,
          quantity: 1,
          status: true,
          total: res.data.price,
        });
        setImage(res.data.profilePicture);
      })
      .catch((error) => {
        toast("CANNOT GET PRODUCT DETAIL");
        console.log(error);
      });
    window.scrollTo(0, 0);
  }, [id, props]);

  const ThumbnailCarousel = () => {
    const item = product.product;
    if (item.images != null) {
      return (
        <OwlCarousel className="owl-theme" items={4} margin={15}>
          <ThumbnailImages item={item} />
        </OwlCarousel>
      );
    } else {
      return "";
    }
  };

  const ThumbnailImages = (props) => {
    const product = props.item;

    return product.images.map((product, index) => {
      if (product.type !== "content") {
        return (
          <div className="detail-images-item" key={index}>
            <img src={product.link} alt="#" onClick={() => setImage(product.link)} />
          </div>
        );
      } else {
        return "";
      }
    });
  };

  const Information = () => {
    if (isActive.content) {
      return (
        <div className="detail-information">
          <img src={product.product.content} alt="#" />
        </div>
      );
    } else if (isActive.policy) {
      return (
        <div className="detail-information">
          <h1>SUPPORT POLICY</h1>
        </div>
      );
    } else {
      return (
        <div className="detail-information">
          <h1>RELATED PRODUCT</h1>
        </div>
      );
    }
  };

  const quantityHandler = (e) => {
    const quantity = e.target.value;
    console.log(product);
    if (e.target.validity.valid && quantity !== "") {
      setProduct({
        product: product.product,
        quantity: quantity,
        total: quantity * product.product.price,
      });
    } else {
      setProduct({
        product: product.product,
        quantity: 1,
        total: product.product.price,
      });
    }
  };

  const history = useHistory();
  const cartContext = useContext(CartContext);
  const buyNow = (product, quantity, status) => {
    cartContext.addToCart(product, quantity, status);
    history.push("/cart");
  };

  if (product === null) {
    return <Loading />;
  } else {
    return (
      <>
        <section className="detail">
          <div className="visual" />
          <Header title={"Product Detail"} />
          <div className="detail-main grid">
            <div className="detail-images">
              <div className="detail-images-show">
                <img src={image} alt="#" />
              </div>
              <div className="detail-images-thumbnail">
                <ThumbnailCarousel />
              </div>
            </div>
            <div className="detail-content">
              <div className="detail-content-name">{product.product.name}</div>
              <div className="detail-content-field">
                <div className="detail-content-label">PRICE</div>
                <div className="detail-content-price">{product.product.price}</div>
              </div>
              <div className="detail-content-field">
                <div className="detail-content-label">QUANTITY</div>
                <input
                  className="detail-content-quantity"
                  type="number"
                  min="1"
                  pattern="^[0-9]"
                  onChange={(e) => quantityHandler(e)}
                  value={product.quantity}
                />
              </div>
              <div className="detail-content-field">
                <div className="detail-content-label">TOTAL</div>
                <div className="detail-content-total">{product.total}</div>
              </div>
              <div className="detail-content-button">
                <button className="detail-content-buy" onClick={() => buyNow(product.product, product.quantity, true)}>
                  BUY NOW
                </button>
                <CartContext.Consumer>
                  {({ addToCart }) => (
                    <button
                      className="detail-content-add"
                      onClick={() => addToCart(product.product, product.quantity, true)}
                    >
                      ADD TO CART
                    </button>
                  )}
                </CartContext.Consumer>
                <button className="detail-content-like">LIKE</button>
              </div>
            </div>
          </div>
          <div className="detail-info">
            <ul className="detail-list">
              <li
                className={isActive.content ? "detail-item selected" : "detail-item"}
                onClick={() => setActive({ content: true, policy: false, related: false })}
              >
                DETAIL PRODUCT
              </li>
              <li
                className={isActive.policy ? "detail-item selected" : "detail-item"}
                onClick={() => setActive({ content: false, policy: true, related: false })}
              >
                SUPPORT POLICY
              </li>
              <li
                className={isActive.related ? "detail-item selected" : "detail-item"}
                onClick={() => setActive({ content: false, policy: false, related: true })}
              >
                PRODUCT RELATED
              </li>
            </ul>
          </div>
          <Information />
        </section>
      </>
    );
  }
};

export default ProductDetail;
