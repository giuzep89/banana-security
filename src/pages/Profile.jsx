import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../components/authcontext/AuthContext";
import axios from "axios";

function Profile() {
    const {user} = useContext(AuthContext);
    const [secrets, setSecrets] = useState({});

    useEffect(() => {
        const controller = new AbortController();

        async function fetchSecrets() {
            const token = localStorage.getItem("token");

            try {
                const response = await axios.get(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/secrets/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'novi-education-project-id': 'c5b1327a-6c34-419a-8701-6b842cba268c',
                        signal: controller.signal
                    }
                })
                setSecrets(response.data[0]);
            } catch (e) {
                console.error(e);
            }
        }
        fetchSecrets();

        return function cleanup(){
            controller.abort();
        }
    }, []);

    return (
        <>
            <h1>Profielpagina</h1>
            <section>
                <h2>Gegevens</h2>
                {Object.keys(user).length > 0 ?
                    <p><strong>Gebruikersnaam:</strong> {user.email}</p> :
                    <p color="red">Could not load user information</p>
                }
            </section>
            <section>
                {Object.keys(secrets).length > 0 &&
                    <>
                        <h2>{secrets.title}</h2>
                        <p>{secrets.content}</p>
                    </>
                }
            </section>
            <p>Terug naar de <Link to="/">Homepagina</Link></p>
        </>
    );
}

export default Profile;