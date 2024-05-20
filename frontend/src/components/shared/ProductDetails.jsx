import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { CiMap } from "react-icons/ci";
import Loader from "./Loader";
import { FaCoins } from "react-icons/fa6";
import { AuthContext } from "../../Auth/AuthProvider";

const ProductDetails = () => {
    const id = useParams().id;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userType, setUserType] = useState("");
    const { user } = useContext(AuthContext);

    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        setLoading(true);
        axiosSecure
            .get(`/products/${id}`)
            .then((response) => {
                setProduct(response.data[0]);
                console.table(response.data[0]);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });

        //get UserType
        axiosSecure
                .get(`/users?email=${user?.email}&value=${"User_Type"}`)
                .then((res) => {
                    setUserType(res.data[0].User_Type);
                })
                .catch(() => {
                });
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="flex lg:flex-row flex-col lg:h-dvh pt-[80px] glass">
            <div className="flex w-full">
                <img
                    className="object-cover"
                    src={product?.Image_Url}
                    alt={product?.Name}
                />
            </div>
            <div className="w-full lg:p-10 p-3 flex justify-center flex-col items-start text-white">
                <h1 className="animate__animated animate__fadeInDown font-black text-4xl lg:text-7xl text-white">
                    {product?.Name}
                </h1>
                <div className="flex lg:items-start  flex-col lg:justify-between gap-3 lg:gap-5 lg:mt-8 mt-3">
                    <div className="animate__animated animate__fadeInUp">
                        <div className="flex lg:flex-row flex-col gap-3 lg:items-center">
                            <div className="flex items-center gap-3">
                                <p className="flex gap-2 items-center">
                                    <CiMap className="text-xl" />
                                    {product?.Planet_source},{" "}
                                    {product?.Galaxy_source}
                                </p>
                            </div>
                        </div>
                        <p className="text-3xl flex gap-2 items-center font-black animate__animated animate__fadeInUp ">
                            <FaCoins
                                className="lg:text-xl text-[#dbb42c]"
                                title="Price"
                            />
                            <span className="bg-gradient-to-r from-tertiary via-secondary to-primary text-transparent bg-clip-text animate-gradient bg-300%">
                                {product?.Price}
                            </span>{" "}
                            <span className="font-medium text-white">
                                Galactic Credits
                            </span>
                        </p>
                        <div className="lg:mt-4 mt-3">
                            {product?.Description}
                        </div>
                        {
                            userType === "Customer" && <button className="submit text-white hover:bg-black hover:bg-opacity-70 w-full mt-2">
                            Add to Cart
                        </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
