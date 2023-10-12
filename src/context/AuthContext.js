import { createContext, useState } from "react";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) =>
{
   const [auth, setAuth] = useState({});
   const [currObj, setCurrObj] = useState({
    contactNo: "",
    customerName: "",
    address: "",
    items: [],
    price: 0,
    id: "",
  }); 

   return (
    <AuthContext.Provider value={{auth, setAuth, currObj, setCurrObj}}>
        {children}
    </AuthContext.Provider>
   )
}

export default AuthContext;