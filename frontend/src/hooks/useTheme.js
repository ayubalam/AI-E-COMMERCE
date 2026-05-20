import { useContext } from "react";

import ThemeContext from "../context/ThemeContextObject";

const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;