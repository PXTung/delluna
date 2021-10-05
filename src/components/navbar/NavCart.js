import { useContext } from "react";
import { CartContext } from "../../context/Cart";
import { UserContext } from "../../context/User";

const NavCart = (props) => {
  const userContext = useContext(UserContext);

  if (userContext.authenticated) {
    if (props.type === "PC") {
      return (
        <CartContext.Consumer>
          {({ cart }) => (
            <a href="/cart" className="navbar-link">
              Cart ({cart.length})
            </a>
          )}
        </CartContext.Consumer>
      );
    } else {
      return (
        <CartContext.Consumer>
          {({ cart }) => (
            <a href="/cart" className="navbar-link">
              <i className="fas fa-shopping-cart" />
              Cart ({cart.length})
            </a>
          )}
        </CartContext.Consumer>
      );
    }
  } else {
    return (
      <a href="/login" className="navbar-link">
        Cart
      </a>
    );
  }
};

export default NavCart;
