import React, {useEffect, useState} from 'react';
import {isRouteErrorResponse, Link, useNavigate} from 'react-router-dom';
import axios from "axios";

function SignUp() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [error, toggleError] = useState(false);
    const navigate = useNavigate();
    const [controller, setController] = useState(new AbortController);

    async function createUser({email, password}) {
        toggleError(false);

        try {
            const response = await axios.post("https://novi-backend-api-wgsgz.ondigitalocean.app/api/users",
                {
                    "email": email,
                    "password": password,
                    "roles": ["user"],
                }, {
                    headers: {'novi-education-project-id': 'c5b1327a-6c34-419a-8701-6b842cba268c'},
                    signal: controller.signal
                })
            console.log("Registration successful:", response.status, response.data);
            navigate("/signin");
        } catch (e) {
            toggleError(true);
            console.error(e);
        }
    }

    useEffect(() => {
        return function cleanup(){
            controller.abort();
        }
    }, []);

    function handleFormChange(e, fieldText) {
        setFormData({...formData, [fieldText]: e.target.value});
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        createUser(formData);
    }

    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
            <form onSubmit={handleFormSubmit}>
                <label>Email
                    <input type="email" id="email" onChange={(e) => handleFormChange(e, "email")}/>
                </label>
                <label>Password
                    <input type="text" id="password" onChange={(e) => handleFormChange(e, "password")}/>
                </label>
                <label>Username
                    <input type="text" id="username" onChange={(e) => handleFormChange(e, "username")}/>
                </label>
                <button type="submit">Registreren</button>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;