import { useState } from "react";
import "./OrderTable.css";
import PropType from "prop-types";
import { Link } from "react-router-dom";

const OrderTable = ({ orders, userType }) => {
    const [isImageOpen, setIsImageOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const openImage = (imageUrl) => {
        setSelectedImage(imageUrl);
        setIsImageOpen(true);
    };

    const closeImage = () => {
        setIsImageOpen(false);
    };

    const pending = "bg-orange-500 text-orange-500 border-orange-500";
    const shipped = "bg-green-500 text-green-500 border-green-500";
    const delivered = "bg-blue-500 text-blue-500 border-blue-500";

    return (
        <div className=" lg:mx-auto lg:max-w-6xl mx-3 transition duration-300">
            <div className="overflow-x-auto ">
                <table className="table-auto glass w-full mt-8  rounded-lg border-2 border-gray-100 ">
                    <thead className="hidden lg:table-header-group  rounded-lg">
                        <tr className="text-base font-semibold text-left border-b-2 border-gray-100 text-gray-100">
                            <th className="p-2">Image</th>
                            <th className="p-2">Name</th>
                            <th className="p-2">Unit Price</th>
                            <th className="p-2">Quantity Ordered</th>
                            <th className="p-2">Total Price</th>
                            <th className="p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            let result;
                            if (order?.Status === "pending") {
                                result = pending;
                            } else if (order?.Status === "shipped") {
                                result = shipped;
                            } else {
                                result = delivered;
                            }
                            return (
                                <tr
                                    key={order?.Product_ID}
                                    className="block lg:table-row border-b-2 border-gray-100 text-gray-100 py-4"
                                >
                                    <td
                                        className="p-2 block lg:table-cell relative lg:static"
                                        data-label=""
                                    >
                                        <img
                                            src={order?.Image_Url}
                                            alt={order?.Name}
                                            className="lg:w-20 lg:h-20 object-cover rounded-lg cursor-pointer"
                                            onClick={() =>
                                                openImage(order?.Image_Url)
                                            }
                                        />
                                    </td>

                                    <td
                                        className="p-2 block lg:table-cell relative lg:static"
                                        data-label="Name"
                                    >
                                        <Link to={`/p/${order?.Product_ID}`}>
                                            {order?.Name}
                                        </Link>
                                    </td>
                                    <td
                                        className="p-2 block lg:table-cell relative lg:static"
                                        data-label="Price"
                                    >
                                        {order?.Price}
                                    </td>
                                    <td
                                        className="p-2 block lg:table-cell relative lg:static"
                                        data-label="Quantity"
                                    >
                                        {order?.Quantity}
                                    </td>
                                    <td
                                        className="p-2 block lg:table-cell relative lg:static"
                                        data-label="Total Price"
                                    >
                                        {order?.ProductTotal}
                                    </td>

                                    {
                                        userType === 'Customer' && <td
                                            className="p-2 lg:table-cell relative lg:static block"
                                            data-label="Status"
                                        >
                                            <span
                                                className={`px-5 capitalize py-3 rounded-full bg-opacity-25 border-2 ${result}`}
                                            >
                                                {order?.Status}
                                            </span>
                                        </td>
                                    }
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {isImageOpen && (
                <div
                    className="fixed top-0 left-0 w-dvw h-dvh flex items-center justify-center z-50"
                    style={{
                        background: "rgba(0, 0, 0, 0.8)",
                    }}
                    onClick={closeImage}
                >
                    <img
                        src={selectedImage}
                        alt="Full screen"
                        className="max-h-full max-w-full"
                    />
                </div>
            )}
        </div>
    );
};

OrderTable.propTypes = {
    orders: PropType.object.isRequired,
    userType: PropType.string.isRequired,
};

export default OrderTable;
