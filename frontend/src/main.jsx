import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//import components
import SignUpForm from "./Pages/SignUpForm";
import LoginForm from "./Pages/LoginForm";
import AuthProvider from "./Auth/AuthProvider";
import Root from "./Pages/Root";
import AddProduct from "./components/Admin/AddProduct";
import PrivateRoute from "./Auth/PrivateRoute";
import Home from "./Pages/Home";
import ManageProducts from "./Pages/ManageProducts/ManageProducts";
import ProductDetails from "./components/shared/ProductDetails";
import Error404 from "./components/shared/Error404";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Error404 />,
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
                        <ProductDetails />
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
