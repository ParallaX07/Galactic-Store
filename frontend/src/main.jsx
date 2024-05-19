import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//import components
import SignUpForm from "./components/forms/SignUpForm";
import LoginForm from "./components/forms/LoginForm";
import AuthProvider from "./Auth/AuthProvider";
import Root from './Pages/Root';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [      
            { path: "/signup", element: <SignUpForm /> },
            { path: "/login", element: <LoginForm /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
);
