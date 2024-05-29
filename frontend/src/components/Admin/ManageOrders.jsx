import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Auth/AuthProvider";
import Loader from "../shared/Loader";
import OrderTable from "../shared/OrderTable";
import { MessageContext } from "../../Pages/Root";

const ManageOrders = () => {
    const { user, userType, logout, loading } = useContext(AuthContext);
    const [orderHistory, setOrderHistory] = useState([]);
    const { notifySuccess, notifyError } = useContext(MessageContext);
    const [isLoading, setisLoading] = useState(false);

    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if(userType !== "Admin" && user && !loading) {
            notifyError("You are not authorized to view this page");
            logout();
        }
    }, []);

    useEffect(() => {
        setisLoading(true);
        axiosSecure
            .get(`/allOrderHistory`)
            .then((response) => {
                setOrderHistory(response.data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setisLoading(false);
            });
    }, [user]);

    const handleStatusChange = (newStatus, productID, orderID) => {
        console.log(newStatus, productID, orderID);
        axiosSecure
            .put(`/allOrderDetails`, {
                orderID,
                productID,
                newStatus,
            })
            .then(() => {
                notifySuccess("Order status updated successfully");
            })
            .catch((error) => {
                console.error(error);
                notifyError("Failed to update order status");
            });
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="pt-32 pb-10 glass min-h-dvh">
            <h1 className="text-3xl text-center font-bold text-white">
                Manage Orders
            </h1>
            <OrderTable
                orders={orderHistory}
                userType={userType}
                onStatusChange={handleStatusChange}
            />
        </div>
    );
};

export default ManageOrders;
