import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./Auth/AuthProvider";
import PrivateRoute from "./Auth/PrivateRoute";
import { lazy, Suspense } from "react";
import Loader from "./components/shared/Loader";
import Stats from "./components/Admin/Stats";

//import components
const SignUpForm = lazy(() => import("./Pages/SignUpForm"));
const LoginForm = lazy(() => import("./Pages/LoginForm"));
const AddProduct = lazy(() => import("./components/Admin/AddProduct"));
const ManageProducts = lazy(() => import("./components/Admin/ManageProducts"));
const ProductDetails = lazy(() => import("./components/shared/ProductDetails"));
const Home = lazy(() => import("./Pages/Home"));
const Error404 = lazy(() => import("./components/shared/Error404"));
const UpdateProfile = lazy(() => import("./Pages/UpdateProfile"));
const Root = lazy(() => import("./Pages/Root"));
const Cart = lazy(() => import("./components/Customer/Cart"));
const OrderHistory = lazy(() => import("./components/Customer/OrderHistory"));
const ManageOrders = lazy(() => import("./components/Admin/ManageOrders"));
const AllProducts = lazy(() => import("./Pages/AllProducts"));
const AllUsers = lazy(() => import("./components/Admin/AllUsers"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={<Loader/>}>
            <Root />
        </Suspense>,
        errorElement: <Suspense fallback={<Loader/>}>
            <Error404 />
        </Suspense>,
        children: [
            { path: "/", element: <Suspense fallback={<Loader/>}>
                <Home />
            </Suspense> },
            {
                path: "/signup",
                element: (
                    <Suspense fallback={<Loader />}>
                        <SignUpForm />
                    </Suspense>
                ),
            },
            {
                path: "/products",
                element: <Suspense fallback={<Loader/>}>
                    <AllProducts />
                </Suspense>,

            },
            {
                path: "/a/allusers",
                element: (
                    <PrivateRoute>
                        <Suspense fallback={<Loader />}>
                            <AllUsers />
                        </Suspense>
                    </PrivateRoute>
                ),
            },
            {
                path: "/login",
                element: (
                    <Suspense fallback={<Loader />}>
                        <LoginForm />
                    </Suspense>
                ),
            },
            {
                path: "/profile",
                element: (
                    <PrivateRoute>
                        <Suspense fallback={<Loader />}>
                            <UpdateProfile />
                        </Suspense>
                    </PrivateRoute>
                ),
            },
            {
                path: "/a/add-product",
                element: (
                    <PrivateRoute>
                        <Suspense fallback={<Loader />}>
                            <AddProduct />
                        </Suspense>
                    </PrivateRoute>
                ),
            },
            {
                path: "/p/:id",
                element: (
                    <PrivateRoute>
                        <Suspense fallback={<Loader />}>
                            <ProductDetails />
                        </Suspense>
                    </PrivateRoute>
                ),
            },
            {
                path: "/a/manage-products",
                element: (
                    <PrivateRoute>
                        <Suspense fallback={<Loader />}>
                            <ManageProducts />
                        </Suspense>
                    </PrivateRoute>
                ),
            },
            {
                path: "/a/stats",
                element: (
                    <PrivateRoute>
                        <Suspense fallback={<Loader />}>
                            <Stats />
                        </Suspense>
                    </PrivateRoute>
                ),
            },
            {
                path: "/c/cart",
                element: (
                    <PrivateRoute>
                        <Suspense fallback={<Loader />}>
                            <Cart/>
                        </Suspense>
                    </PrivateRoute>
                ),
            },
            {
                path: "/c/order-history",
                element: (
                    <PrivateRoute>
                        <Suspense fallback={<Loader />}>
                            <OrderHistory />
                        </Suspense>
                    </PrivateRoute>
                ),
            },
            {
                path: "/a/manage-orders",
                element: (
                    <PrivateRoute>
                        <Suspense fallback={<Loader />}>
                            <ManageOrders />
                        </Suspense>
                    </PrivateRoute>
                ),
            }
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
);
