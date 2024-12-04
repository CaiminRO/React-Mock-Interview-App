import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/api/account/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);
      } catch (error) {
        console.error(error);
        logout();
      }
    };

    if (token) {
      setIsAuthenticated(true);
      fetchUser();
    }
    else {
      setIsAuthenticated(false);
      setUser(null);
    }
    // No need to include fetchUser in dependencies
  }, [token]);

  const register = async (userData) => {
    try {
      const res = await axios.post(
        '/api/account/register',
        userData
      );

      return res.data.message; // Return success message
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  };

  const login = async (username, password) => {
    try {
      const res = await axios.post('/api/account/login', {
        username,
        password,
      });

      localStorage.setItem('token', res.data.accessToken);
      setToken(res.data.accessToken);
      setIsAuthenticated(true);

      return true;
    }
    catch (error) {
      console.error(error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated,
    register,
    login,
    logout,
    token,
    isAdmin: user?.is_admin || false
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};