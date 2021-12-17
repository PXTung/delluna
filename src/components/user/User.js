import axios from "axios";
import { useContext, useEffect } from "react";
import { ConstantContext } from "../../context/Constant";

const User = () => {
  const constant = useContext(ConstantContext);
  const host = constant.host_api;

  useEffect(() => {
    axios
      .get(host + "member", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(JSON.stringify(error)));
  }, [host]);

  return "";
};

export default User;
