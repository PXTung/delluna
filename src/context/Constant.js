import { createContext } from "react";

export const ConstantContext = createContext();

const ConstantProvider = (props) => {
    const host_api = "http://dellunashop.us-east-2.elasticbeanstalk.com";
    // const host_api = "http://localhost:8080";

    return <ConstantContext.Provider value={{host_api: host_api}}>
        {props.children}
    </ConstantContext.Provider>
}

export default ConstantProvider;