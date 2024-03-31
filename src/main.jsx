import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import pages
import LandingPage from "./Pages/LandingPage/LandingPage";
import AdminPage from "./Pages/AdminPage";

//import components
import SignUpForm from "./components/forms/SignUpForm";
import LoginForm from "./components/forms/LoginForm";
import Products from "./components/Products/Products";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage/>,
        children: [
            {
                index: true,
                element: <LoginForm/>,
            },
            {
                path: "/signup",
                element: <SignUpForm/>,
            },
        ],
    },
    {
        path: "/admin",
        element: <AdminPage/>,
        children: [
            {
                index: true,
                element: <Products/>,
            },
            {
                path: "/admin/products/:id",
                element: <h1>Product</h1>,
            },
            {
                path: "/admin/tags/:tag",
                element: <h1>Tag</h1>,
            },
        ],
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <>
        <RouterProvider router={router} />
    </>
);
