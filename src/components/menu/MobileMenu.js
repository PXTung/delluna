import NavCart from "../navbar/NavCart";
import { Link } from "react-router-dom";
import { MenuContext } from "../../context/Menu";
import { LoginOrUsername, RegisterOrLogout } from "../navbar/Navbar";
import { TypeContext } from "../../context/Type";

const MobileMenu = () => {
  return (
    <section className="mobile">
      <div className="mobile-menu">
        <div className="mobile-title mobile-menu-title">
          <div>MENU</div>
          <MenuContext.Consumer>
            {({ setMenu }) => <i className="fas fa-times fa-lg" onClick={() => setMenu(false)}></i>}
          </MenuContext.Consumer>
        </div>
        <ul className="mobile-list">
          <li className="mobile-item">
            <LoginOrUsername type="MOBILE" />
          </li>
        </ul>
        <div className="mobile-title">PRODUCTS</div>
        <ul className="mobile-list">
          <TypeContext.Consumer>
            {({ types }) =>
              types.map((type) => {
                return (
                  <li className="mobile-item" key={type.id}>
                    <Link to={"/product/type/" + type.name}>
                      <i className="fas fa-box" />
                      {type.name}
                    </Link>
                  </li>
                );
              })
            }
          </TypeContext.Consumer>
        </ul>
        <div className="mobile-title">PROPERTIES</div>
        <ul className="mobile-list">
          <li className="mobile-item">
            <NavCart type="MOBILE" />
          </li>
          <li className="mobile-item">
            <Link to="/login">
              <i className="fas fa-file-invoice" />
              Order
            </Link>
          </li>
          <RegisterOrLogout />
        </ul>
      </div>
    </section>
  );
};

export default MobileMenu;
