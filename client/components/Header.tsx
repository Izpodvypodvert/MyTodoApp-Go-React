import { Link } from "react-router-dom";
import '../styles/Header.css'
import {useContext} from "react";
import AuthContext from "../context/AuthContext";


const Header = () => {

    let { user, logoutUser }:any = useContext(AuthContext);


    return (
        <div className="header">
      {/*      {user && (*/}
      {/*  <Link to="/" className="links">*/}
      {/*    Home*/}
      {/*  </Link>*/}
      {/*)}*/}
            <span> | </span>
            {user ? (
                <Link to="/" onClick={logoutUser}>
                    Logout
                </Link>
            ) : (
                <Link to="/login">
                    Login
                </Link>
            )}
            <span> | </span>
            {!user && (
                <Link to="/register">
                    Register
                </Link>
            )}
            {/* {user && <p>Hello {user.username}</p>} */}
        </div>
    );
};

export default Header;