import React, { useEffect, useState } from "react";

const AuthContex = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin:(email,password)=>{}
});

export const AuthContexProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return <AuthContex.Provider value={{
    isLoggedIn:isLoggedIn,
    onLogout:logoutHandler,
    onLogin:loginHandler

  }}>{props.children}</AuthContex.Provider>;
};

export default AuthContex;
