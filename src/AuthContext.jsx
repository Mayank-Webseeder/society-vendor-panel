import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();


export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {

  const navigate = useNavigate();

  // For demo: use localStorage so refresh persists login
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("velra_logged_in"));


  const login = () => {
    localStorage.setItem("velra_logged_in", "true");
    setIsLoggedIn(true);
    navigate('/dashboard', {replace: true});
  };


  const logout = () => {
    localStorage.removeItem("velra_logged_in");
    localStorage.removeItem("velra_user");    //Also clear the user data
    setIsLoggedIn(false);
    navigate('/auth', {replace: true});
  };

  
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};