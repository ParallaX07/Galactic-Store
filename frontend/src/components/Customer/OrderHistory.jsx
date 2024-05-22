import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Auth/AuthProvider";
import OrderTable from "../shared/OrderTable/OrderTable";
import Loader from "../shared/Loader";

const OrderHistory = () => {
    const { user, userType } = useContext(AuthContext);
    const [orderHistory, setOrderHistory] = useState([]);
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);

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

    if (loading) {
        return <Loader />;
    }
        
    return (
        <div className="mt-32">
            <h1 className="text-3xl text-center font-bold text-white">Order History</h1>
            <OrderTable orders={orderHistory} userType={userType}/>
        </div>
    );
};

export default OrderHistory;