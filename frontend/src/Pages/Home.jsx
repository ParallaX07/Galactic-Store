import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import AllProductCard from './../components/AllProductCard';

const Home = () => {
    const [allProducts, setAllProducts] = useState([]);
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        axiosSecure.get("/products")
            .then((response) => {
                setAllProducts(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);


    return (
        <div className="mt-28 mx-3 lg:max-w-4xl lg:mx-auto text-white">
            <div className="grid grid-cols-3">
                {allProducts.map((product) => (
                    <AllProductCard key={product.Product_ID} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Home;