import { useEffect, useState } from "react";
import Type from "../type/Type";
import { Link } from "react-router-dom";
import MobileMenu from "../menu/MobileMenu";
import { MenuContext } from "../../context/Menu";

const Header = () => {
  const [active, setActive] = useState(false);
  const [media, setMedia] = useState({
    phone: false,
    tablet: false,
    pc: true,
  });

  useEffect(() => {
    window.addEventListener("scroll", scrollHanle);
    window.addEventListener("resize", resizeHanle);
    resizeHanle();
  }, []);

  const scrollHanle = () => {
    let scroll = window.pageYOffset;
    if (scroll > 120) {
      setActive(true);
    }
    if (scroll < 60) {
      setActive(false);
    }
  };

  const resizeHanle = () => {
    const size = window.innerWidth;

    if (size <= 1023 && size > 767) {
      setMedia({ phone: false, tablet: true, pc: false });
    } else if (size <= 767) {
      setMedia({ phone: true, tablet: false, pc: false });
    } else {
      setMedia({ phone: false, tablet: false, pc: true });
    }
  };

  const HeaderIcon = () => {
    if (media.phone || media.tablet) {
      return (
        <MenuContext.Consumer>
          {({ setMenu }) => (
            <i className="fas fa-bars fa-lg" onClick={() => setMenu(true)}></i>
          )}
        </MenuContext.Consumer>
      );
    } else {
      return <i className="fas fa-search fa-lg"></i>;
    }
  };

  return (
    <section className="header">
      <header className="grid">
        <div className={active ? "header-head header-active" : "header-head"}>
          <h1 className="header-logo">
            <Link to="/">SHOPEE</Link>
          </h1>
          <div className="header-icon">
            <MenuContext.Consumer>
              {({ menu }) => (!menu ? <HeaderIcon /> : <MobileMenu />)}
            </MenuContext.Consumer>
          </div>
        </div>
        <Type />
      </header>
    </section>
  );
};

export default Header;
