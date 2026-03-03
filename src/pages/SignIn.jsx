import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../components/authcontext/AuthContext";
import axios from "axios";

function SignIn() {
    const {login} = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, toggleError] = useState(false);
    const [controller, setController] = useState(new AbortController);

    async function signIn({email, password}){
        toggleError(false);

        try{
            const response = await axios.post("https://novi-backend-api-wgsgz.ondigitalocean.app/api/login", {
                "email": email,
                "password": password
            }, {
                headers: {'novi-education-project-id': 'c5b1327a-6c34-419a-8701-6b842cba268c'},
                signal: controller.signal
            })
            console.log(response.data);
            const token = response.data.token;
            login(token);
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

    function handleFormChange(e, fieldText){
        setFormData({...formData, [fieldText]: e.target.value});
    }

    function handleFormSubmit(e){
        e.preventDefault();
        signIn(formData);
    }

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>
      <form onSubmit={handleFormSubmit}>
          <label>Email
              <input type="email" id="email" onChange={(e) => handleFormChange(e, "email")}/>
          </label>
          <label>Password
              <input type="password" id="password" onChange={(e) => handleFormChange(e, "password")}/>
          </label>
        <button type="submit">Inloggen</button>
      </form>
      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;