import { createContext, useState } from "react";
import React from "react";
import {ENDPOINT} from "../src/App";


const AuthContext = createContext({});

export default AuthContext;



export const AuthProvider = ({ children }: any) => {


    let [user, setUser] = useState(() =>
        localStorage.getItem("user")
            ? localStorage.getItem("user")
            : null
    );

    let loginUser = async (e: any) => {
        e.preventDefault();
        const response = await fetch(`${ENDPOINT}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Email: e.target.username.value,
                Password: e.target.password.value,
            }),
        }).then(data => data.json())

        if (typeof(response.ID) != "undefined") {
            localStorage.setItem("user", JSON.stringify(response))
            setUser(response)


            window.location.href = "/";

        } else {
            alert(response.error);
        }
    };

    let SignUp = async (e: any) => {
        e.preventDefault();
        const response = await fetch(`${ENDPOINT}/signUp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Email: e.target.username.value,
                Password: e.target.password.value,
            }),
        }).then(data => data.json())

        // if (typeof(response.ID) != "undefined") {
        //     localStorage.setItem("user", JSON.stringify(response))
        //     setUser(response)


            window.location.href = "/login";

        // } else {
        //     alert(response.error);
        // }
    };

    let logoutUser = () => {
        setUser(null);
        localStorage.removeItem("user");
        window.location.href = "/login/";
    };





    let contextData = {
        user,
        setUser,
        loginUser,
        SignUp,
        logoutUser,

    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}
