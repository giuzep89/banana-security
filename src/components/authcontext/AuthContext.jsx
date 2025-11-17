import {createContext, useState} from "react";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    function login(){
        setIsAuthenticated(true);
    }

    function logout(){
        setIsAuthenticated(false);
    }

    const data = {
        isAuthenticated,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContextProvider