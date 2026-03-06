import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Feed from "../features/post/pages/Feed";
import CreatePost from "../features/post/pages/CreatePost";
import Home from "../features/shared/pages/Home";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/create-post",
        element: <CreatePost />
    },
    {
        path: "/home",
        element: <Home />
    },
])