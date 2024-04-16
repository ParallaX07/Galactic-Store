import { Outlet } from "react-router-dom";
import "./LandingPage.css";
import { createContext } from "react";
import toast, { Toaster } from "react-hot-toast";
const NotifyContext = createContext();

const LandingPage = () => {
    const notifySuccess = (message) => {
        toast.success(message, {
            style: {
                border: "1px solid #10B981",
                padding: "16px",
                color: "#10B981",
            },
            iconTheme: {
                primary: "#10B981",
                secondary: "#FFFAEE",
            },
        });
    };

    const notifyError = (message) => {
        toast.error(message, {
            style: {
                border: "1px solid #EF4444 ",
                padding: "16px",
                color: "#EF4444 ",
            },
            iconTheme: {
                primary: "#EF4444 ",
                secondary: "#FFFAEE",
            },
        });
    };

    const messageInfo = {
        notifySuccess,
        notifyError,
    };

    return (
        // toast notify context provider
        <NotifyContext.Provider value={messageInfo}>
            <Outlet />

            {/* add toast div */}
            <Toaster position="top-right" reverseOrder={false} />
        </NotifyContext.Provider>
    );
};

export default LandingPage;
