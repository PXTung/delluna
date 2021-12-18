import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/Cart";
import { UserContext } from "../../context/User";

const NavCart = (props) => {
  const userContext = useContext(UserContext);

  if (userContext.authenticated) {
    if (props.type === "PC") {
      return (
        <CartContext.Consumer>
          {({ cart }) => (
            <Link to="/cart" className="navbar-link">
              Cart ({cart.length})
            </Link>
          )}
        </CartContext.Consumer>
      );
    } else {
      return (
        <CartContext.Consumer>
          {({ cart }) => (
            <Link to="/cart" className="navbar-link">
              <i className="fas fa-shopping-cart" />
              Cart ({cart.length})
            </Link>
          )}
        </CartContext.Consumer>
      );
    }
  } else {
    return (
      <Link to="/login" className="navbar-link">
        Cart
      </Link>
    );
  }
};

export default NavCart;
