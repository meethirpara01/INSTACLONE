import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import "../style/form.scss"
import { useAuth } from '../hooks/useAuth';

const Login = () => {

    const { user, loading, handelLogin } = useAuth();

    useEffect(() => {
        console.log("User updated:", user);
    }, [user]);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handelSubmit = async (e) => {
        e.preventDefault();

        await handelLogin(username, password);

        console.log("User LoggedIn");
        console.log(user); // NULL - because setUser() does NOT update immediately
        navigate("/home");
    }

    if (loading) {
        return (<main>
            <h1>Loading...</h1>
        </main>)
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handelSubmit}>
                    <input onInput={(e) => { setUsername(e.target.value) }} value={username} type="text" name='username' placeholder='Enter Username' />
                    <input onInput={(e) => { setPassword(e.target.value) }} value={password} type="password" name='password' placeholder='Enter Password' />
                    <button className='button primary-button' type='submit'>Login</button>
                </form>
                <p>Don't Have An Account? <Link className="toggleAuthForm" to="/register">Register</Link></p>
            </div>
        </main>
    )
}

export default Login