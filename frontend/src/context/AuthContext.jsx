import React, { createContext, useState, useContext } from 'react';
import { login as apiLogin } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // In-memory session. On hard refresh, this resets to null.
  
  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await apiLogin(username, password);
      // Expected response format from the backend: { userID, fullName, username, role }
      setUser(response);
      return { success: true };
    } catch (error) {
      console.error("Login error", error);
      
      let errorMessage = 'Invalid username or password.';
      
      // Check if it's a network error (server down, CORS, etc.)
      if (error.code === 'ERR_NETWORK') {
        errorMessage = 'Cannot connect to server. Please check if the backend is running.';
      } else if (error.response?.data) {
        // Try to extract error message from ASP.NET Core response
        errorMessage = error.response.data.message || error.response.data.title || 'Invalid credentials.';
      }

      return { 
        success: false, 
        message: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
