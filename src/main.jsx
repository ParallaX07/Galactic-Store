import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import SignUpForm from "./components/forms/SignUpForm";
import LoginForm from "./components/forms/LoginForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage></LandingPage>,
        children: [
            {
                path: "/",
                element: <LoginForm></LoginForm>,
            },
            {
                path: "/signup",
                element: <SignUpForm></SignUpForm>,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
