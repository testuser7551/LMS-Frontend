import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      setToken(null);
      return;
    } else {
      setToken(token);
    }
  }, []);

  const setUserContext = (val) => {
    setUser(val);
    setLoading(false);
  }
  const setLoadingFront=(val)=>{
    setLoading(val);
  }

  return (
    <AuthContext.Provider value={{token, user, loading, setUserContext ,setLoadingFront }}>
      {children}
    </AuthContext.Provider>
  );
};