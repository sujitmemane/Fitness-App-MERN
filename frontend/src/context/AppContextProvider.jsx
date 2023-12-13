import { createContext, useState } from "react";

export const AppContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

const AppContextProvider = ({ children }) => {
  const [user,setUser] = useState()
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem("token")));
  

  const values = {
    isAuthenticated,
    setIsAuthenticated,
    user,setUser
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
