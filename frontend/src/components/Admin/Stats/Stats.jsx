import { useEffect, useState } from "react";
import TotalStatsChart from "./TotalStatsChart";
import Loader from "../../shared/Loader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaCoins } from "react-icons/fa6";

const Stats = () => {
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const [productOverview, setProductOverview] = useState({});

    useEffect(() => {
        setLoading(true);
        axiosSecure
            .get("/productOverview")
            .then((res) => {
                setProductOverview(res.data[0]);
                console.log(productOverview);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <section className="pb-10 px-3 py-20 transition duration-300 glass min-h-dvh">
            <h2 className="lg:mx-auto lg:max-w-6xl text-4xl font-semibold  mt-4 bg-gradient-to-r from-tertiary via-secondary to-primary text-transparent bg-clip-text animate-gradient bg-300%">
                Admin Dashboard
            </h2>
            <div className="flex flex-col items-center">
                <TotalStatsChart setLoading={setLoading} />
            </div>

            {/* simple table with orders overview */}
            <div className="flex flex-col lg:flex-row lg:mx-auto lg:max-w-6xl justify-evenly gap-5">
                <div className="overflow-x-auto ">
                    <h3 className=" text-2xl font-semibold  mt-4 bg-gradient-to-r from-tertiary via-secondary to-primary text-transparent bg-clip-text animate-gradient bg-300%">
                        Order Status Overview
                    </h3>
                    <table className="table-auto glass w-full mt-8  rounded-lg border-2 border-gray-100 ">
                        <thead className="hidden lg:table-header-group  rounded-lg">
                            <tr className="text-base font-semibold text-left border-b-2 border-gray-100 text-gray-100">
                                <th className="p-2">Total Orders</th>
                                <th className="p-2">Total Pending</th>
                                <th className="p-2">Total Shipped</th>
                                <th className="p-2">Total Delivered</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="block text-center lg:table-row border-b-2 border-gray-100 text-gray-100 py-4">
                                <td
                                    className="p-2 block lg:table-cell relative lg:static"
                                    data-label="Total Orders"
                                >
                                    {productOverview?.totalOrders || 0}
                                </td>
                                <td
                                    className="p-2 block lg:table-cell relative lg:static"
                                    data-label="Total Products"
                                >
                                    {productOverview?.pending || 0}
                                </td>
                                <td
                                    className="p-2 block lg:table-cell relative lg:static"
                                    data-label="Total Users"
                                >
                                    {productOverview?.shipped || 0}
                                </td>
                                <td
                                    className="p-2 block lg:table-cell relative lg:static"
                                    data-label="Total Revenue"
                                >
                                    {productOverview?.delivered || 0}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="overflow-x-auto ">
                    <h3 className=" text-2xl font-semibold  mt-4 bg-gradient-to-r from-tertiary via-secondary to-primary text-transparent bg-clip-text animate-gradient bg-300%">
                        Products Overview
                    </h3>
                    <table className="table-auto glass w-full mt-8  rounded-lg border-2 border-gray-100 ">
                        <thead className="hidden lg:table-header-group  rounded-lg">
                            <tr className="text-base font-semibold text-left border-b-2 border-gray-100 text-gray-100">
                                <th className="p-2">Low Stock</th>
                                <th className="p-2">Total Revenue (Galactic Credits) </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="block text-center lg:table-row border-b-2 border-gray-100 text-gray-100 py-4">
                                <td
                                    className="p-2 block lg:table-cell relative lg:static"
                                    data-label="Total Orders"
                                >
                                    <Link to="/a/manage-products">{productOverview?.lowStock  || 0}</Link>
                                </td>
                                <td
                                    className="p-2 block lg:table-cell relative lg:static"
                                    data-label="Total Products"
                                >
                                    <span className="flex items-center gap-3"><FaCoins
                                    className="lg:text-xl text-[#dbb42c]"
                                    title="Price"
                                />{productOverview?.totalRevenue}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Stats;
