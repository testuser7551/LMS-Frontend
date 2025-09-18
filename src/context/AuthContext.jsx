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

    try {
      const decoded = jwtDecode(token);
     // console.log("Decoded JWT:", decoded);
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        // expired
        localStorage.removeItem("token");
        setUser(null);
        setLoading(false);
      } else {
        // ✅ set minimal user from token
        setUser({
          id: decoded.id || decoded.sub,
          email: decoded.email,
          role: decoded.role,
          name: decoded.name,
        });
        setLoading(false);
      }
    } catch (err) {
      localStorage.removeItem("token");
      setUser(null);
      setLoading(false);
    }
  }, []);

  const setUserContext = (val) => {
    setUser(val);
  }

  return (
    <AuthContext.Provider value={{token, user, loading, setUserContext }}>
      {children}
    </AuthContext.Provider>
  );
};