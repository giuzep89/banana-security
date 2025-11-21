import React, {useContext} from 'react';
import logo from '../assets/banana-01.png';
import {useNavigate, Link} from 'react-router-dom';
import {AuthContext} from "./authcontext/AuthContext";

function NavBar() {
    const {isAuth, user, logout} = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <nav>

            <Link to="/">
          <span className="logo-container">
            <img src={logo} alt="logo"/>
            <h3>
              Banana Security
            </h3>
          </span>
            </Link>

            {isAuth && user &&
                <span className="user">{user.email}</span>
            }

            <div>
                {!isAuth ?
                    <>
                        <button
                            type="button"
                            onClick={() => navigate('/signin')}
                        >
                            Log in
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/signup')}
                        >
                            Registreren
                        </button>
                    </> :
                    <button
                        type="button"
                        onClick={() => logout()}
                    >
                        Log out
                    </button>
                }
            </div>
        </nav>
    );
}

export default NavBar;