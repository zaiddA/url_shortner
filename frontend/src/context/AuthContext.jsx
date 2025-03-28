import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

// Create the context with default values
const AuthContext = createContext({
    user: null,
    loading: false,
    initialized: false,
    login: async () => {},
    logout: () => {}
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('access_token');
            
            if (!token) {
                setUser(null);
                setLoading(false);
                setInitialized(true);
                return;
            }

            try {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const userResponse = await api.get('/api/user/me/');
                setUser(userResponse.data);
            } catch (error) {
                localStorage.removeItem('access_token');
                delete api.defaults.headers.common['Authorization'];
                setUser(null);
            } finally {
                setLoading(false);
                setInitialized(true);
            }
        };

        checkAuth();
    }, []); // Only run once on mount

    const login = async (username, password) => {
        setLoading(true);
        try {
            const tokenResponse = await api.post('/api/user/token/', {
                username,
                password
            });

            const { access } = tokenResponse.data;
            localStorage.setItem('access_token', access);
            api.defaults.headers.common['Authorization'] = `Bearer ${access}`;

            const userResponse = await api.get('/api/user/me/');
            setUser(userResponse.data);
            return userResponse.data;
        } catch (error) {
            localStorage.removeItem('access_token');
            delete api.defaults.headers.common['Authorization'];
            
            if (error.response?.status === 401) {
                throw new Error('Invalid username or password');
            } else if (error.response?.data?.detail) {
                throw new Error(error.response.data.detail);
            } else {
                throw new Error('Login failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, initialized, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 