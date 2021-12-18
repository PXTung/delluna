import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { ConstantContext } from "./Constant";

export const TypeContext = createContext();

const TypeProvider = (props) => {
  const constant = useContext(ConstantContext);
  const host = constant.host_api;
  const [types, setTypes] = useState([]);

  useEffect(() => {
    axios
      .get(host + "type/")
      .then((res) => setTypes(res.data));
  }, [host]);

  return (
    <TypeContext.Provider value={{ types: types }}>
      {props.children}
    </TypeContext.Provider>
  );
};

export default TypeProvider;
