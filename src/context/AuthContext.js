import React, { createContext, useState } from "react";

import auth from "../utils/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Authenticated user details
  const [notifications, setNotifications] = useState([]); // User notifications

  const login = async (userData) => {
    auth.setAuthToken(userData.token, userData.user.id);
    setUser(userData);
  };
  const logout = () => {
    setUser(null);
    auth.clearAuthToken();
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, notifications, setNotifications }}
    >
      {children}
    </AuthContext.Provider>
  );
};
