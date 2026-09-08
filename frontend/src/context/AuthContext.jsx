import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    // Set up axios default header
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    // Check if user is logged in on page load
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
        setLoading(false);
    }, []);

    // Login function
    const login = (userData, token) => {
        setUser(userData);
        setToken(token);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    };

    // Logout function
    const logout = () => {
        setUser(null);
        setToken('');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
    };

    // Update user info (for channel creation)
    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const value = {
        user,
        token,
        loading,
        login,
        logout,
        updateUser,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};