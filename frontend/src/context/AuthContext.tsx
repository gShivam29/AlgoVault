import React, {createContext, useState, useContext, useEffect} from "react";
import type { ReactNode } from "react";
import axios from 'axios';

interface User{
    id: string,
    name: string,
}

interface AuthContextType{
    user: User | null,
    isAuthenticated: boolean,
    isLoading: boolean,
    login: (userData: User) => void,
    logout: () => void
}

interface AuthProviderProps{
    children: ReactNode;
}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState<User | null> (null);
    const [isLoading, setIsLoading] = useState(true); //start with loading state

    useEffect(() => {
        const verifyUser = async () => {
            try{
                const response  = await axios.get<{success: boolean, user: User}>('http://localhost:3000/api/auth/verify', {withCredentials: true});
                if (response.data.success){
                    setUser(response.data.user);
                }
            } catch (error){
                console.error("Verification Failed: ", error);
                setUser(null);
            } finally{
                setIsLoading(false); //stop loading once verified
            }
        }

        verifyUser();
    }, []);

    const login = (userData: User) => setUser(userData);
    const logout = () => setUser(null);

    const isAuthenticated =  !!user; //converts to boolean and then negates it, !null -> !true -> false

    return (
        <AuthContext.Provider value = {{user, isAuthenticated, isLoading, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}