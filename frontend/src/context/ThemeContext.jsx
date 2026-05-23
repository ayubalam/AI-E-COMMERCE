import {
  useState,
  useEffect,
} from "react";

import ThemeContextObject
  from "./ThemeContextObject";

const ThemeProvider =
  ({ children }) => {

    const [darkMode,
      setDarkMode] =
      useState(() => {

        return (
          localStorage.getItem(
            "theme"
          ) === "dark"
        );
      });

    // APPLY DARK MODE
    useEffect(() => {

      if (darkMode) {

        document.documentElement.classList.add(
          "dark"
        );

        localStorage.setItem(
          "theme",
          "dark"
        );

      } else {

        document.documentElement.classList.remove(
          "dark"
        );

        localStorage.setItem(
          "theme",
          "light"
        );
      }

    }, [darkMode]);

    // TOGGLE THEME
    const toggleTheme =
      () => {

        setDarkMode(
          !darkMode
        );
      };

    return (

      <ThemeContextObject.Provider
        value={{

          darkMode,

          toggleTheme,
        }}
      >

        {children}

      </ThemeContextObject.Provider>
    );
  };

export default ThemeProvider;