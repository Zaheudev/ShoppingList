import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Authenticated user details
  const [notifications, setNotifications] = useState([]); // User notifications

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, notifications, setNotifications }}>
      {children}
    </AuthContext.Provider>
  );
};
