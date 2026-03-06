import { useContext } from "react"
import { AuthContext } from "../auth.context"
import { login, register, getMe, logout } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);

    const { user, loading, setuser, setLoading } = context;

    const handelRegister = async (username, email, password) => {

        setLoading(true);

        const response = await register(username, email, password);
        setuser(response.user);

        setLoading(false);
    }

    const handelLogin = async (username, password) => {

        setLoading(true);

        const response = await login(username, password);
        setuser(response.user);

        setLoading(false);
    }

    const getMeDetails = async () => {

        setLoading(true);

        const response = await getMe();
        setuser(response.user);
        console.log(response.user);


        setLoading(false);
    }

    const handleLogout = async () => {

        setLoading(true);

        await logout();

        setuser(null);

        setLoading(false);
    }

    return {
        user, loading, handelRegister, handelLogin, getMeDetails, handleLogout
    }
}