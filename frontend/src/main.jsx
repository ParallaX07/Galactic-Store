import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//import components
import SignUpForm from "./components/forms/SignUpForm";
import LoginForm from "./components/forms/LoginForm";
import AuthProvider from "./Auth/AuthProvider";
import Root from "./Pages/Root";
import AddProduct from "./components/Admin/AddProduct";
import PrivateRoute from "./Auth/PrivateRoute";
import Home from "./Pages/Home";
import ManageProducts from "./Pages/ManageProducts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/signup", element: <SignUpForm /> },
            { path: "/login", element: <LoginForm /> },
            {
                path: "/a/add-product",
                element: (
                    <PrivateRoute>
                        <AddProduct />
                    </PrivateRoute>
                ),
            },
            {
                path: "/p/:id",
                element: (
                    <PrivateRoute>
                        <h1>Product</h1>
                    </PrivateRoute>
                ),
            },
            {
                path: "/a/manage-products",
                element: (
                    <PrivateRoute>
                        <ManageProducts />
                    </PrivateRoute>
                ),
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
);
