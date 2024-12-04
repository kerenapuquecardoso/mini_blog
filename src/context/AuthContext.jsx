import { useContext, createContext} from 'react';

// Valor inicial para o contexto
const AuthContext = createContext({ user: null }); // Passando um valor inicial com { user: null }

export function AuthProvider({ children, value }) {
    console.log("Valor do usuário no AuthProvider", value);
    return (
        <AuthContext.Provider value={{ value }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthValue() {
    return useContext(AuthContext);
}
