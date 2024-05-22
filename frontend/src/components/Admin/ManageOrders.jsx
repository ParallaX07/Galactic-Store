import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Auth/AuthProvider";
import Loader from "../shared/Loader";
import OrderTable from "../shared/OrderTable/OrderTable";
import { MessageContext } from "../../Pages/Root";

const ManageOrders = () => {
    const { loading, setLoading, user, userType } = useContext(AuthContext);
    const [orderHistory, setOrderHistory] = useState([]);
    const { notifySuccess, notifyError } = useContext(MessageContext);

    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        setLoading(true);
        axiosSecure
            .get(`/allOrderHistory`)
            .then((response) => {
                setOrderHistory(response.data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
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

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="mt-32">
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
