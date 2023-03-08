import { Link } from "react-router-dom";
import {ENDPOINT} from "../src/App";
import {useContext} from "react";
import AuthContext from "../context/AuthContext";


const Header = () => {

    let { user, logoutUser }:any = useContext(AuthContext);
    // async function logoutUser() {
    //     const response = await fetch(`${ENDPOINT}/logout`, {
    //         method: 'GET',
    //     })
    //     let data = await response.json();
    //
    //     if (response.status === 200) {
    //         window.location.href = "/";
    //     } else {
    //         alert("Something went wrong!");
    //     }
    // }

    return (
        <div className="header">
            {!user && (
        <Link to="/" className="links">
          Home
        </Link>
      )}
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