import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from './../../components/FunctionalComponents/Loader';
import "./ManageProducts.css";
import { FaEdit } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import Swal from "sweetalert2";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        setLoading(true);
        axiosSecure.get("/products?attributes=Product_ID,Name,Price,Galaxy_source,Planet_source,Quantity_inStock,Image_Url,Description")
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

    const handleEdit = (productId) => {
        console.log(productId);
        //open modal
        
    };


    const handleDelete = (productId) => {
        console.log(productId);
        Swal.fire({
            title: `Do you want to delete the item?`,
            showDenyButton: true,
            confirmButtonText: "Yes, delete it",
            denyButtonText: `No, don't delete`,
            icon: "question",
            confirmButtonColor: '#0b090a', 
            background: '#0b090a',
            denyButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                axiosSecure.delete(`/products/${productId}`).then(() => {
                    const newProducts = products.filter(
                        (product) => product.Product_ID !== productId
                    );
                    setProducts(newProducts);
                }).finally(() => setLoading(false));
            }
        }); 
    };

    if (loading) {
        return <Loader />;
    }
    
    return (
        <section className=" lg:mx-auto lg:max-w-6xl mx-3 py-20 transition duration-300">
            <h2 className="text-3xl font-semibold text-center dark:text-gray-100 mt-4 underline underline-offset-4">
                Manage Products
            </h2>
            {/* table */}
            <div className="overflow-x-auto ">
                <table className="table-auto glass w-full mt-8  rounded-lg border-2 border-primary dark:border-gray-100 ">
                    <thead className="hidden lg:table-header-group  rounded-lg">
                        <tr className="text-base font-semibold text-left border-b-2 border-primary dark:border-gray-100 dark:text-gray-100">
                            <th className="p-2">Image</th>
                            <th className="p-2">Name</th>
                            <th className="p-2">Price</th>
                            <th className="p-2">Galaxy</th>
                            <th className="p-2">Planet</th>
                            <th className="p-2">Quantity in Stock</th>
                            <th className="p-2">Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr
                                key={product?.Product_ID}
                                className="block lg:table-row border-b-2 border-primary dark:border-gray-100 dark:text-gray-100 py-4"
                            >
                                <td
                                    className="p-2 block lg:table-cell relative lg:static"
                                    data-label=""
                                >
                                    <img
                                        src={product?.Image_Url}
                                        alt={product?.Name}
                                        className="lg:w-20 lg:h-20 object-cover rounded-lg"
                                    />
                                </td>
                                <td
                                    className="p-2 block lg:table-cell relative lg:static"
                                    data-label="Name"
                                >
                                    {product?.Name}
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
                                    className="p-2 block lg:table-cell relative lg:static"
                                    data-label="Quantity in Stock"
                                >
                                    {product?.Quantity_inStock}
                                </td>
                                <td
                                    className="p-2 lg:table-cell relative lg:static block"
                                    data-label="Actions"
                                >
                                    <button className="mr-3 glass rounded-xl py-2 px-3" onClick={()=> handleEdit(product?.Product_ID)}><FaEdit/></button>
                                    <button className=" py-2 px-3 rounded-xl bg-red-500" onClick={()=>handleDelete(product?.Product_ID)}><ImBin/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ManageProducts;