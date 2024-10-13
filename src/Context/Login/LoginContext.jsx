import React, { createContext, useContext, useState, useEffect } from "react";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  // Initialize the login state based on localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedLoginState = localStorage.getItem("isLoggedIn");
    return savedLoginState === "true";
  });

  // Function to handle login and store login state in localStorage
  const login = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  // Function to handle logout and remove login state from localStorage
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => {
  return useContext(LoginContext);
};
