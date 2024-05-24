import { Suspense, lazy, useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../shared/Loader";
import { FaEdit } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import Swal from "sweetalert2";
const EditProductModal = lazy(() => import("./EditProductModal"));
import { MessageContext } from "../../Pages/Root";
import { Link } from "react-router-dom";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const [isImageOpen, setIsImageOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const openImage = (imageUrl) => {
        setSelectedImage(imageUrl);
        setIsImageOpen(true);
    };

    const closeImage = () => {
        setIsImageOpen(false);
    };

    const { notifyError, notifySuccess } = useContext(MessageContext);

    const axiosSecure = useAxiosSecure();

    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");

    const handleSort = (field) => {
        setSortField(field);
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    };

    useEffect(() => {
        setLoading(true);
        axiosSecure
            .get("/allProducts")
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const sortedProducts = [...products];
        if (sortField) {
            sortedProducts.sort((a, b) => {
                if (a[sortField] < b[sortField]) {
                    return sortDirection === "asc" ? -1 : 1;
                }
                if (a[sortField] > b[sortField]) {
                    return sortDirection === "asc" ? 1 : -1;
                }
                return 0;
            });
        }
        setProducts(sortedProducts);
    }, [sortField, sortDirection]);

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setIsModalOpen(true);
        console.table(product);
    };

    const handleSave = (updatedProduct) => {
        console.table(updatedProduct);
        setLoading(true);
        axiosSecure
            .put(`/products/${updatedProduct.Product_ID}`, updatedProduct)
            .then(() => {
                const newProducts = products.map((product) => {
                    if (product.Product_ID === updatedProduct.Product_ID) {
                        return updatedProduct;
                    }
                    return product;
                });
                setProducts(newProducts);
                notifySuccess("Product updated successfully");
            })
            .catch((error) => {
                notifyError(error.message);
            })
            .finally(() => {
                setLoading(false);
                setIsModalOpen(false);
            });
    };

    const handleDelete = (productId) => {
        Swal.fire({
            title: `Do you want to delete the item?`,
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
                axiosSecure
                    .delete(`/products/${productId}`)
                    .then(() => {
                        const newProducts = products.filter(
                            (product) => product.Product_ID !== productId
                        );
                        setProducts(newProducts);
                        notifySuccess("Product deleted successfully");
                    })
                    .catch((error) => {
                        notifyError(error.message);
                    })
                    .finally(() => setLoading(false));
            }
        });
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <section className=" px-3 py-20 transition duration-300 glass min-h-dvh">
            <h2 className="text-3xl font-semibold text-center text-gray-100 mt-4 underline underline-offset-4">
                Manage Products
            </h2>
            <div className="overflow-x-auto  lg:mx-auto lg:max-w-6xl ">
                <table className="table-auto glass w-full mt-8  rounded-lg border-2 border-gray-100 ">
                    <thead className="hidden lg:table-header-group  rounded-lg">
                        <tr className="text-base font-semibold text-left border-b-2 border-gray-100 text-gray-100">
                            <th className="p-2 cursor-pointer">Image </th>
                            <th
                                className="p-2 cursor-pointer"
                                onClick={() => handleSort("Name")}
                            >
                                Name{" "}
                                {sortField === "Name" &&
                                    (sortDirection === "asc" ? "↑" : "↓")}
                            </th>
                            <th
                                className="p-2 cursor-pointer"
                                onClick={() => handleSort("Price")}
                            >
                                Price{" "}
                                {sortField === "Price" &&
                                    (sortDirection === "asc" ? "↑" : "↓")}
                            </th>
                            <th
                                className="p-2 cursor-pointer"
                                onClick={() => handleSort("Galaxy_source")}
                            >
                                Galaxy{" "}
                                {sortField === "Galaxy_source" &&
                                    (sortDirection === "asc" ? "↑" : "↓")}
                            </th>
                            <th
                                className="p-2 cursor-pointer"
                                onClick={() => handleSort("Planet_source")}
                            >
                                Planet{" "}
                                {sortField === "Planet_source" &&
                                    (sortDirection === "asc" ? "↑" : "↓")}
                            </th>
                            <th
                                className="p-2 cursor-pointer"
                                onClick={() => handleSort("Quantity_inStock")}
                            >
                                Quantity in Stock{" "}
                                {sortField === "Quantity_inStock" &&
                                    (sortDirection === "asc" ? "↑" : "↓")}
                            </th>
                            <th
                                className="p-2 cursor-pointer"
                                onClick={() => handleSort("TotalSold")}
                            >
                                Total Sold{" "}
                                {sortField === "TotalSold" &&
                                    (sortDirection === "asc" ? "↑" : "↓")}
                            </th>
                            <th
                                className="p-2 cursor-pointer"
                                onClick={() => handleSort("TotalRevenue")}
                            >
                                Total Revenue{" "}
                                {sortField === "TotalRevenue" &&
                                    (sortDirection === "asc" ? "↑" : "↓")}
                            </th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
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
                                    <Link to={`/p/${product?.Product_ID}`}>
                                        {product?.Name}
                                    </Link>
                                </td>
                                <td
                                    className="p-2 block lg:table-cell relative lg:static"
                                    data-label="Price"
                                >
                                    {product?.Price}
                                </td>
                                <td
                                    className="p-2 block lg:table-cell relative lg:static"
                                    data-label="Galaxy"
                                >
                                    {product?.Galaxy_source}
                                </td>
                                <td
                                    className="p-2 block lg:table-cell relative lg:static"
                                    data-label="Planet"
                                >
                                    {product?.Planet_source}
                                </td>
                                <td
                                    className={`p-2 block lg:table-cell relative lg:static ${product?.Quantity_inStock < 10 ? "text-red-500 font-bold" : ""}`}
                                    data-label="Stock"
                                >
                                    {product?.Quantity_inStock}
                                </td>
                                <td
                                    className={`p-2 block lg:table-cell relative lg:static`}
                                    data-label="Total Sold"
                                >
                                    {product?.TotalSold || 0}
                                </td>
                                <td
                                    className="p-2 block lg:table-cell relative lg:static"
                                    data-label="Total Revenue"
                                >
                                    {product?.TotalRevenue || 0}
                                </td>
                                <td
                                    className="p-2 lg:table-cell relative lg:static block"
                                    data-label="Actions"
                                >
                                    <button
                                        className="mr-3 glass rounded-xl py-2 px-3"
                                        onClick={() => handleEdit(product)}
                                    >
                                        <FaEdit />
                                    </button>
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
                    </tbody>
                </table>
            </div>
            <Suspense fallback={<Loader />}>
                <EditProductModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                    product={currentProduct}
                />
            </Suspense>
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

export default ManageProducts;
