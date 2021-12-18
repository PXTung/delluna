import { useContext } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/User";
import NavCart from "../navbar/NavCart";

export const LoginOrUsername = (props) => {
  const userContext = useContext(UserContext);

  if (props.type === "PC") {
    if (userContext.authenticated) {
      return (
        <a href="/member" className="navbar-link">
          Wellcome, {userContext.username}
        </a>
      );
    } else {
      return (
        <Link to="./login" className="navbar-link">
          Login
        </Link>
      );
    }
  } else {
    if (userContext.authenticated) {
      return (
        <a href="/member" className="navbar-link">
          <i className="far fa-user"></i>
          {userContext.username}
        </a>
      );
    } else {
      return (
        <a href="/login">
          <i className="fas fa-lock" />
          Login
        </a>
      );
    }
  }
};

export const RegisterOrLogout = (props) => {
  const userContext = useContext(UserContext);
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("token");
    userContext.setAuthenticated(false);
    history.push("/login");
  };

  if (props.type === "PC") {
    if (userContext.authenticated) {
      return (
        <li className="navbar-item navbar-link" onClick={logoutHandler}>
          Logout
        </li>
      );
    } else {
      return (
        <li className="navbar-item">
          <a href="./register" className="navbar-link">
            Register
          </a>
          <span className="navbar-hello">
            <span>Hello!</span>
          </span>
        </li>
      );
    }
  } else {
    if (userContext.authenticated) {
      return (
        <li className="mobile-item" onClick={logoutHandler}>
          <i className="fas fa-sign-out-alt"></i>
          Logout
        </li>
      );
    } else {
      return (
        <li className="mobile-item">
          <a href="/register">
            <i className="fas fa-pen" />
            Register
          </a>
        </li>
      );
    }
  }
};

const Navbar = () => {
  return (
    <nav className="navbar grid-full">
      <ul className="navbar-list grid">
        <li className="navbar-item">
          <LoginOrUsername type="PC" />
        </li>
        <li className="navbar-separate"></li>
        <RegisterOrLogout type="PC" />
        <li className="navbar-separate"></li>
        <li className="navbar-item">
          <NavCart type="PC" />
        </li>
        <li className="navbar-separate"></li>
        <li className="navbar-item">
          <a href="./list-order" className="navbar-link">
            Order
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
