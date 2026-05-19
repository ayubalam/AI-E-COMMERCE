import {
  useEffect,
  useState,
} from "react";

import AuthContext from "./authContext";

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {

    const savedUser =
      localStorage.getItem("user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  // Save User
  useEffect(() => {

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

  }, [user]);

  // Login
  const login = (userData) => {
    setUser(userData);
  };

  // Logout
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