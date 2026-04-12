"use client";

import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userFound = localStorage.getItem("user");
    if (userFound) {
      setUser(JSON.parse(userFound));
    }
  }, []);

  const saveUser = (username) => {
    const newUser = {
      id: Math.random().toString(36).slice(2, 9),
      username,
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, saveUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);