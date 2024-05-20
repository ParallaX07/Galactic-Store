import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//import components
import SignUpForm from "./components/forms/SignUpForm";
import LoginForm from "./components/forms/LoginForm";
import AuthProvider from "./Auth/AuthProvider";
import Root from './Pages/Root';
import AddProduct from "./components/Admin/AddProduct";
import PrivateRoute from './Auth/PrivateRoute';
import Home from './Pages/Home';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [   
            { path: "/", element: <Home />},   
            { path: "/signup", element: <SignUpForm /> },
            { path: "/login", element: <LoginForm /> },
            {
                path: '/a/add-product',
                element: <PrivateRoute>
                    <AddProduct />
                </PrivateRoute>,
            },
            {   
                path: "/p/:id",
                element: <h1>Product</h1>
            }
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
);
