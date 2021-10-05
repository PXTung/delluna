import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const TypeContext = createContext();

const TypeProvider = (props) => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    axios
      .get("https://dellunashop.herokuapp.com/type")
      .then((res) => setTypes(res.data));
  }, []);

  return (
    <TypeContext.Provider value={{ types: types }}>
      {props.children}
    </TypeContext.Provider>
  );
};

export default TypeProvider;
