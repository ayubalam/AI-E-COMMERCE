import { useState } from "react";

import AuthContextObject from "./AuthContextObject";

const AuthProvider = ({ children }) => {

  // Load from localStorage directly
  const [user, setUser] =
    useState(() => {

      const storedUser =
        localStorage.getItem("user");

      return storedUser
        ? JSON.parse(storedUser)
        : null;
    });

  const [token, setToken] =
    useState(() => {

      return localStorage.getItem(
        "token"
      );
    });

  // Login
  const login = (data) => {

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    localStorage.setItem(
      "token",
      data.token
    );

    setUser(data.user);

    setToken(data.token);
  };

  // Logout
  const logout = () => {

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "token"
    );

    setUser(null);

    setToken(null);
  };

  return (
    <AuthContextObject.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContextObject.Provider>
  );
};

export default AuthProvider;