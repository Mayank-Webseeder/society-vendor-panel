import { createContext, useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";


const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {

  const navigate = useNavigate();
  const { resetUser } = useUser();

  // For demo: use localStorage so refresh persists login
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("user_logged_in"));


  const login = useCallback(() => {
    localStorage.setItem("user_logged_in", "true");
    setIsLoggedIn(true);
    navigate('/dashboard', {replace: true});
  }, [navigate]);


  const logout = useCallback(() => {
    localStorage.removeItem("user_logged_in");
    resetUser();    // Resets both state & localStorage for user
    setIsLoggedIn(false);
    navigate('/auth', {replace: true});
  }, [resetUser, navigate]);


  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};