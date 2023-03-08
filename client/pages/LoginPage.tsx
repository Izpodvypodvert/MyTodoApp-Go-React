import {ENDPOINT} from "../src/App";
import {useContext, useState} from "react";
import AuthContext from "../context/AuthContext";


const LoginPage = () => {
    let { loginUser }:any = useContext(AuthContext);


    return (
        <div className="loginPageContainer">
            <form onSubmit={loginUser}>
                <h1>Login</h1>
                <input type="text" name="username" placeholder="Enter username"></input>
                <input
                    id="inputPassword"
                    type="text"
                    name="password"
                    placeholder="Enter password"
                ></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default LoginPage;
