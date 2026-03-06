import { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setuser] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <AuthContext.Provider value={{ user, setuser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
