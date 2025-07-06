import { createContext, useContext, useState } from "react";

const AuthContext = createContext();


export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {

  // For demo: use localStorage so refresh persists login
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("velra_logged_in"));


  const login = () => {
    localStorage.setItem("velra_logged_in", "true");
    setIsLoggedIn(true);
  };


  const logout = () => {
    localStorage.removeItem("velra_logged_in");
    setIsLoggedIn(false);
  };

  
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};