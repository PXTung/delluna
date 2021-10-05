import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [username, setUsername] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token != null) {
      axios
        .get("https://dellunashop.herokuapp.com/verify", {
          headers: { Authorization: token },
        })
        .then((res) => {
          setUsername(res.data.name);
          setAuthenticated(true);
        })
        .catch((error) => {
          toast("TOKEN CAN NOT BE TRUST");
          console.log(error);
        });
    }
  }, []);
  return (
    <>
      <UserContext.Provider
        value={{
          username: username,
          setUsername: setUsername,
          authenticated: authenticated,
          setAuthenticated: setAuthenticated,
        }}
      >
        {props.children}
      </UserContext.Provider>
    </>
  );
};

export default UserProvider;
