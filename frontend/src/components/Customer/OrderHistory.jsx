import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Auth/AuthProvider";
import OrderTable from "../shared/OrderTable/OrderTable";

const OrderHistory = () => {
    const { loading, setLoading, user, userType } = useContext(AuthContext);
    const [orderHistory, setOrderHistory] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        setLoading(true);
        axiosSecure
            .get(`/orderHistory?email=${user?.email}`)
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
        
    return (
        <div className="mt-32">
            <h1 className="text-3xl text-center font-bold text-white">Order History</h1>
            <OrderTable orders={orderHistory} userType={userType}/>
        </div>
    );
};

export default OrderHistory;