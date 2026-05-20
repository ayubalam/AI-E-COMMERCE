import { useEffect, useState } from "react";

import ThemeContext from "./ThemeContextObject";

const ThemeProvider = ({ children }) => {

  const [darkMode, setDarkMode] =
    useState(() => {

      const savedTheme =
        localStorage.getItem("darkMode");

      return savedTheme
        ? JSON.parse(savedTheme)
        : false;
    });

  // Save Theme
  useEffect(() => {

    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );

    if (darkMode) {

      document.documentElement.classList.add(
        "dark"
      );

    } else {

      document.documentElement.classList.remove(
        "dark"
      );
    }

  }, [darkMode]);

  // Toggle Theme
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;