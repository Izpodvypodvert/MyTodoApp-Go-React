import {useContext} from "react";
import AuthContext from "../context/AuthContext";

function RegisterPage() {

    function passHandler() {
    }
    let { SignUp }:any = useContext(AuthContext);
    return (
        <section className="loginPageContainer">
            <form onSubmit={SignUp}>
                <h1>Registration</h1>
                <div>
                    {/* <label htmlFor="username">Username</label> */}
                    <input
                        type="text"
                        id="username"
                        onChange={passHandler}
                        placeholder="Username"
                        required
                    />
                </div>
                <div>
                    {/* <label htmlFor="password">Password</label> */}
                    <input
                        type="password"
                        id="password"
                        onChange={passHandler}
                        placeholder="Password"
                        required
                    />
                </div>
                {/*<div>*/}
                {/*    /!* <label htmlFor="confirm-password">Confirm Password</label> *!/*/}
                {/*    <input*/}
                {/*        type="password"*/}
                {/*        id="confirm-password"*/}
                {/*        onChange={passHandler}*/}
                {/*        placeholder="Confirm Password"*/}
                {/*        required*/}
                {/*    />*/}
                {/*    /!*<p>{password2 !== password ? "Passwords do not match" : ""}</p>*!/*/}
                {/*</div>*/}
                <button>Register</button>
            </form>
        </section>
    );
}

export default RegisterPage