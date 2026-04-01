import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const decodeToken = (jwt) => {
        try {
            const payload = JSON.parse(atob(jwt.split('.')[1]));
            return payload;
        } catch {
            return null;
        }
    };

    const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    const contextValue = useMemo(() => {
        const payload = token ? decodeToken(token) : null;
        const roles = payload?.roles || [];
        const isAdmin = roles.includes('ROLE_ADMIN');
        const username = payload?.sub || null;

        return { token, login, logout, isAdmin, username, roles };
    }, [token]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

export default AuthProvider;
