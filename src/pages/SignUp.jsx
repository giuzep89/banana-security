import React, {useState} from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    function handleFormChange(e, fieldText){
        setFormData({...formData, [fieldText]: e.target.value});
    }

    function handleFormSubmit(e){
        e.preventDefault();
        console.log(formData);
    }

  return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
          <form onSubmit={handleFormSubmit}>
              <label>Email
                  <input type="email" id="email" onChange={(e) => handleFormChange(e, "username")}/>
              </label>
              <label>Password
                  <input type="text" id="password" onChange={(e) => handleFormChange(e, "password")}/>
              </label>
              <label>Username
                  <input type="text" id="username" onChange={(e) => handleFormChange(e, "password")}/>
              </label>
              <button type="submit">Inloggen</button>
          </form>
      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;