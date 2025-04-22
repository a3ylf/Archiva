import { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextProps {
    user: string | null;
    setUser: (user: string | null) => void;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    setUser: () => { },
    isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser('Usuário logado');
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

