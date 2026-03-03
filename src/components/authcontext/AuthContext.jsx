import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from 'jwt-decode';
import axios from "axios";
import {isTokenExpired} from "../helpers/isTokenExpired";


export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const navigate = useNavigate();
    const [authentication, setAuthentication] = useState({
        isAuth: false,
        user: null,
        status: "pending"
    });

    useEffect( () => {
        console.log("Context wordt gerefresht!");

        async function checkToken() {
            if (localStorage.getItem("token") && !isTokenExpired()) {
                const decodedToken = jwtDecode(localStorage.getItem("token"));

                try {
                    const response = await axios.get(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/${decodedToken.userId}`, {
                        headers: {'novi-education-project-id': 'c5b1327a-6c34-419a-8701-6b842cba268c'}
                    })

                    setAuthentication({
                        isAuth: true,
                        user: {
                            "id": response.data.id,
                            "email": response.data.email
                        },
                        status: "done"
                    });
                } catch (e) {
                    console.error(e);
                    setAuthentication({
                        isAuth: false,
                        user: null,
                        status: "done"
                    });
                }
            } else {
                setAuthentication({
                    isAuth: false,
                    user: null,
                    status: "done"
                });
            }
        }

        checkToken();
    }, []);

    async function login(token) {
        localStorage.setItem("token", token);
        const decodedToken = jwtDecode(token);

        try {
            const response = await axios.get(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/${decodedToken.userId}`, {
                headers: {'novi-education-project-id': 'c5b1327a-6c34-419a-8701-6b842cba268c'}
            })

            setAuthentication({
                isAuth: true,
                user: {
                    "id": response.data.id,
                    "email": response.data.email
                },
                status: "done"
            });

            navigate("/profile");
        } catch (e) {
            console.error(e);
        }
    }

    function logout() {
        localStorage.clear();
        setAuthentication({isAuth: false, user: null, status: "done"});
        navigate("/");
    }

    const data = {
        ...authentication,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={data}>
            {authentication.status === "done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider