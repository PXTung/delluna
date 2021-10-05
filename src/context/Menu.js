import { createContext, useState } from "react";

export const MenuContext = createContext();

const MenuProvider = (props) => {
  const [menu, setMenu] = useState(false);

  const setMenuStatus = () => {
    setMenu(!menu);
  };

  return (
    <MenuContext.Provider
      value={{ menu: menu, setMenu: setMenu, setMenuStatus: setMenuStatus }}
    >
      {props.children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;
