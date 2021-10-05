import axios from "axios";
import { useEffect, useState } from "react";

const User = () => {
  const host = "https://dellunashop.herokuapp.com/";
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(host + "member", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(JSON.stringify(error)));
  }, []);

  return "";
};

export default User;
