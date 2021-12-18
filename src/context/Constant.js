import { createContext } from "react";

export const ConstantContext = createContext();

const ConstantProvider = (props) => {
    const host_api = "https://delluna-api.herokuapp.com/";
    // const host_api = "http://localhost:8080";

    return <ConstantContext.Provider value={{host_api: host_api}}>
        {props.children}
    </ConstantContext.Provider>
}

export default ConstantProvider;