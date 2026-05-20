import { useContext } from "react";

import AuthContextObject from "../context/AuthContextObject";

const useAuth = () => {

  return useContext(
    AuthContextObject
  );
};

export default useAuth;