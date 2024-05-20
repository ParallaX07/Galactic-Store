import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import AllProductCard from '../components/shared/AllProductCard';
import LoadingCard from '../components/shared/LoadingCard';

const Home = () => {
    const [allProducts, setAllProducts] = useState([]);
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axiosSecure.get("/products?attributes=Product_ID,Name,Price,Galaxy_source,Planet_source,Quantity_inStock,Image_Url")
            .then((response) => {
                setAllProducts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);


    return (
        <div className="mt-28 mx-3 lg:mx-32 text-white">
            {
                loading && 
                <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                    <LoadingCard />
                    <LoadingCard />
                    <LoadingCard />
                </div>
            }
            {!loading && <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                {allProducts.map((product) => (
                    <AllProductCard key={product.Product_ID} product={product} />
                ))}
            </div>}
        </div>
    );
};

export default Home;