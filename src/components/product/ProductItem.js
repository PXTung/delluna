import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { CartContext } from "../../context/Cart";
import { UserContext } from "../../context/User";

const ProductItem = ({ product, animation }) => {
  const history = useHistory();
  const [active, setActive] = useState(animation);

  useEffect(() => {
    window.addEventListener("scroll", scrollHanle);
  });

  const scrollHanle = () => {
    let scroll = window.pageYOffset;
    if (scroll > 300) {
      setActive(true);
    }
  };

  const doLogin = () => {
    history.push("/login");
    toast("PLEASE LOGIN FIRST");
  };

  const itemDetail = (id) => {
    history.push("/product/" + id);
  };

  return (
    <div className={active ? "item col-4 item-animation" : "item col-4 item-hidden"}>
      <div className="item-image" onClick={() => itemDetail(product.id)}>
        <div className="item-image-frame">
          <img src={product.profilePicture} alt="#" />
          {/* <img src="https://res.cloudinary.com/tungpx0809/image/upload/v1639649338/ab17a6fffc0e7e0f4a1e2d90067d2b1f_sxxeei.jpg" alt="#"/> */}
        </div>
      </div>
      <div className="item-content">
        <div className="item-name">{product.name}</div>
        <div className="item-price">{product.price}</div>
        <UserContext.Consumer>
          {({ authenticated }) => (
            <CartContext.Consumer>
              {({ addToCart }) => (
                <ul className="item-icon" onClick={() => (authenticated ? addToCart(product, 1, true) : doLogin())}>
                  <li className="item-icon-plus" />
                </ul>
              )}
            </CartContext.Consumer>
          )}
        </UserContext.Consumer>
      </div>
    </div>
  );
};

export const ProductItemFake = () => {
  return (
    <div className="item col-4 none-visible">
      <div className="item-content" />
    </div>
  );
};

export default ProductItem;
