import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { ImBin } from "react-icons/im";
import Swal from "sweetalert2";
import Loader from "../shared/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { MessageContext } from "../../Pages/Root";

const Cart = () => {
    const { userName, user } = useContext(AuthContext);

    const [isImageOpen, setIsImageOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [inCart, setInCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { notifySuccess, notifyError } = useContext(MessageContext);

    const openImage = (imageUrl) => {
        setSelectedImage(imageUrl);
        setIsImageOpen(true);
    };

    const closeImage = () => {
        setIsImageOpen(false);
    };

    useEffect(() => {
        setLoading(true);
        axiosSecure
            .get(`/cart?email=${user?.email}`)
            .then((response) => {
                setInCart(response.data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (inCart.length === 0 && !loading) {
        return (
            <section className="lg:mx-auto lg:max-w-6xl mx-3 py-20 transition duration-300">
                <h2 className="text-3xl font-semibold text-gray-100 mt-4 underline underline-offset-4">
                    <span className="bg-gradient-to-r from-tertiary via-secondary to-primary text-transparent bg-clip-text animate-gradient bg-300%">
                        {userName}&apos;s
                    </span>{" "}
                    Cart
                </h2>
                <h2 className="text-4xl font-semibold text-center text-gray-100 mt-8">
                    Your cart is empty
                </h2>
            </section>
        );
    }

    const handleDelete = (productId) => {
        Swal.fire({
            title: `Do you want to remove item from cart?`,
            showDenyButton: true,
            confirmButtonText: "Yes, delete it",
            denyButtonText: `No, don't delete`,
            icon: "question",
            confirmButtonColor: "#0b090a",
            background: "#0b090a",
            denyButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                axiosSecure.delete(`/cart?productID=${productId}&email=${user?.email}`)
                    .then(() => {
                        notifySuccess("Item removed from cart successfully");
                        setInCart(inCart.filter((product) => product.Product_ID !== productId));
                    })
                    .catch((error) => {
                        console.error(error);
                        notifyError("Failed to remove item from cart");
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        });
    };

    if (loading) {
        <Loader />;
    }

    return (
        <section className=" lg:mx-auto lg:max-w-6xl mx-3 py-20 transition duration-300">
            <h2 className="text-3xl font-semibold text-gray-100 mt-4 underline underline-offset-4">
                <span className="bg-gradient-to-r from-tertiary via-secondary to-primary text-transparent bg-clip-text animate-gradient bg-300%">
                    {userName}&apos;s
                </span>{" "}
                Cart
            </h2>
            <div className="overflow-x-auto ">
                <table className="table-auto glass w-full mt-8  rounded-lg border-2 border-gray-100 ">
                    <thead className="hidden lg:table-header-group  rounded-lg">
                        <tr className="text-base font-semibold text-left border-b-2 border-gray-100 text-gray-100">
                            <th className="p-2">Image</th>
                            <th className="p-2">Name</th>
                            <th className="p-2">Unit Price</th>
                            <th className="p-2">Quantity Ordered</th>
                            <th className="p-2">Total Price</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inCart.map((product) => (
                            <tr
                                key={product?.Product_ID}
                                className="block lg:table-row border-b-2 border-gray-100 text-gray-100 py-4"
                            >
                                <td
                                    className="p-2 block lg:table-cell relative lg:static"
                                    data-label=""
                                >
                                    <img
                                        src={product?.Image_Url}
                                        alt={product?.Name}
                                        className="lg:w-20 lg:h-20 object-cover rounded-lg cursor-pointer"
                                        onClick={() =>
                                            openImage(product?.Image_Url)
                                        }
                                    />
                                </td>

                                <td
                                    className="p-2 block lg:table-cell relative lg:static"
                                    data-label="Name"
                                >
                                    <Link to={`/p/${product?.Product_ID}`}>{product?.Name}</Link>
                                </td>
                                <td
                                    className="p-2 block lg:table-cell relative lg:static"
                                    data-label="Price"
                                >
                                    {product?.Price}
                                </td>
                                <td
                                    className="p-2 block lg:table-cell relative lg:static"
                                    data-label="Quantity"
                                >
                                    {product?.Quantity}
                                </td>
                                <td
                                    className="p-2 block lg:table-cell relative lg:static"
                                    data-label="Total Price"
                                >
                                    {product?.ProductTotal}
                                </td>

                                <td
                                    className="p-2 lg:table-cell relative lg:static block"
                                    data-label="Actions"
                                >
                                    <button
                                        className=" py-2 px-3 rounded-xl bg-red-500"
                                        onClick={() =>
                                            handleDelete(product?.Product_ID)
                                        }
                                    >
                                        <ImBin />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td
                                colSpan="6"
                                className="p-2 block lg:table-cell relative lg:static"
                            >
                                <h2 className="text-xl text-right font-semibold text-gray-100 mt-4">
                                    Total Price:{" "}
                                    <span className="mx-3">{inCart[0]?.CartTotal}</span>
                                </h2>
                            </td>
                        </tr>
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
        </section>
    );
};

export default Cart;
