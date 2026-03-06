import { useState } from "react";
import { Link, useNavigate } from "react-router"
import { useAuth } from "../hooks/useAuth";

const Register = () => {

    const { user, loading, handelRegister } = useAuth();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handelSubmit(e) {
        e.preventDefault();

        await handelRegister(username, email, password);

        console.log("User Registred");
        navigate("/");
        console.log(user);
    }

    if (loading) {
        return (<main>
            <h1>Loading...</h1>
        </main>)
    }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handelSubmit}>
                    <input onInput={(e) => { setUsername(e.target.value) }} value={username} type="text" name='username' placeholder='Enter Username' />
                    <input onInput={(e) => { setEmail(e.target.value) }} value={email} type="text" name='email' placeholder='Enter Email' />
                    <input onInput={(e) => { setPassword(e.target.value) }} value={password} type="password" name='password' placeholder='Enter Password' />
                    <button className="button primary-button" type='submit'>Register</button>
                </form>
                <p>Already Have An Account? <Link className="toggleAuthForm" to="/login">Login</Link></p>
            </div>
        </main>
    )
}

export default Register