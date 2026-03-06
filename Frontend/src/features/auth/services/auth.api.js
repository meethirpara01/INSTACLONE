import axios from "axios";

const api = axios.create({
    baseURL: "https://instaclone-zdpc.onrender.com/api/auth",
    withCredentials: true
});

export async function register(username, email, password) {

    const response = await api.post("/register", {
        username,
        email,
        password
    });

    return response.data;
}

export async function login(username, password) {

    const response = await api.post("/login", {
        username,
        password
    });

    return response.data;
}

export async function getMe() {

    const responce = await api.get("/get-me");

    return responce.data;
}

export async function logout() {

    const response = await api.post("/logout");
    
    return response.data;
}