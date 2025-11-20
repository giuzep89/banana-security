import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const navigate = useNavigate();
    const [authentication, setAuthentication] = useState({
        isAuth: false,
        user: null
    });

    function login(user, token){
        setAuthentication({isAuth: true, user: user});
        localStorage.setItem("token", token);
        console.log("Gebruiker is ingelogd!");
        navigate("/profile");
    }


    function logout(){
        setAuthentication({isAuth: false, user: null});
        console.log("Gebruiker is uitgelogd!");
        navigate("/");
    }

    const data = {
        ...authentication,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContextProvider