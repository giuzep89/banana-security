import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../components/authcontext/AuthContext";

function SignIn() {
    const {login} = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    function handleFormChange(e, fieldText){
        setFormData({...formData, [fieldText]: e.target.value});
    }

    function handleFormSubmit(){
        login();
        console.log(formData);
    }

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>
      <form onSubmit={handleFormSubmit}>
          <label>Email
              <input type="text" id="email" onChange={(e) => handleFormChange(e, "email")}/>
          </label>
          <label>Password
              <input type="text" id="password" onChange={(e) => handleFormChange(e, "password")}/>
          </label>
        <button type="submit">Inloggen</button>
      </form>
      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;