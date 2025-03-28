import React, { createContext, useState } from 'react';

// Create the context with default values
const UserContext = createContext({
    user: null,
    setUser: () => {},
    loading: false,
    setLoading: () => {},
    initialized: false,
    setInitialized: () => {}
});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [initialized, setInitialized] = useState(false);

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            loading,
            setLoading,
            initialized,
            setInitialized
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = React.useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export default UserContext; 