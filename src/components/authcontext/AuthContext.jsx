import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from 'jwt-decode';
import axios from "axios";


export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const navigate = useNavigate();
    const [authentication, setAuthentication] = useState({
        isAuth: false,
        user: null
    });

    async function login(token) {
        localStorage.setItem("token", token);
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);

        try {
            const response = await axios.get(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/${decodedToken.userId}`, {
                headers: {'novi-education-project-id': 'c5b1327a-6c34-419a-8701-6b842cba268c'}
            })
            console.log(response.data);

            setAuthentication({
                isAuth: true,
                user: {
                    "id": response.data.id,
                    "email": response.data.email
                }
            });

            navigate("/profile");
        } catch (e) {
            console.error(e);
        }
    }

    function logout() {
        localStorage.clear();
        setAuthentication({isAuth: false, user: null});
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