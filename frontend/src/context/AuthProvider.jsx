import { useEffect, useState } from "react";

import AuthContext from "./AuthContextObject";

const AuthProvider = ({ children }) => {
  // Load User From LocalStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Save User To LocalStorage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // Login Function
  const login = (userData) => {
    setUser(userData);
  };

  // Logout Function
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
