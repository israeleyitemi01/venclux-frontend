import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("venclux_user");
    const storedToken = localStorage.getItem("venclux_token");
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("venclux_user", JSON.stringify(userData));
    if (token) {
      localStorage.setItem("venclux_token", token);
    }
  };

  // 🌟 NEW: Handles deep dynamic profile sync across views cleanly without token drops
  const updateUser = (updatedUserData) => {
    setUser((prev) => {
      const mergedUser = { ...prev, ...updatedUserData };
      localStorage.setItem("venclux_user", JSON.stringify(mergedUser));
      return mergedUser;
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("venclux_user");
    localStorage.removeItem("venclux_token");
    localStorage.removeItem("venclux_pending_email");
    localStorage.removeItem("venclux_pending_business");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout, updateUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}