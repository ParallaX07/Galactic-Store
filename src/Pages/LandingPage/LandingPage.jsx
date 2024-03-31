import { Outlet } from "react-router-dom";
import "./LandingPage.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

import { NotifyContext } from "../../utils/NotifyContext"; // import NotifyContext

const LandingPage = () => {
    const notify = (message) =>
        toast.success(`You have succesfully ${message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        
        return (
            // toast notify context provider
            <NotifyContext.Provider value={notify}>
                <Outlet />

                {/* add toast div */}
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    transition={Bounce}
                />
            </NotifyContext.Provider>
        );
};

export default LandingPage;
