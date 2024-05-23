import { lazy, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
const ProductCard = lazy(() => import("../components/shared/ProductCard"));
const LoadingCard = lazy(() => import("../components/shared/LoadingCard"));

const Home = () => {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
        setLoading(true);
        axiosSecure
            .get("/bestSellers")
            .then((res) => {
                setBestSellers(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="mt-[80px] px-3 lg:mx-auto text-white glass pb-10">
            <div className="flex lg:flex-row gap-5 flex-col-reverse items-center justify-center">
                <div className="lg:max-w-3xl flex flex-col justify-end items-end lg:ml-16 lg:text-start text-center">
                    <h1 className="lg:text-7xl text-4xl font-bold bg-gradient-to-r from-tertiary via-secondary to-primary text-transparent bg-clip-text animate-gradient bg-300%">
                        Discover the Galaxy&apos;s Best Products
                    </h1>
                    <p className="text-2xl font-semibold text-gray-400">
                        Explore our vast collection of intergalactic goods, from
                        cutting-edge technology to rare alien artifacts.
                    </p>
                    <button className="submit text-white hover:bg-black hover:bg-opacity-40 justify-start flex items-start mt-2">
                        Browse Collection 
                    </button>
                </div>
                <img
                    src="https://i.ibb.co/sRP1gWS/OIG1.jpg"
                    alt=""
                    className="max-h-[calc(100dvh-80px)] lg:rounded-bl-lg"
                />
            </div>
            <div className="mt-16 lg:max-w-7xl lg:mx-auto mx-3">
                <h2 className="text-4xl font-bold text-center underline underline-offset-4">
                    Best Sellers
                </h2>
                <div className="flex flex-wrap justify-center gap-5 mt-8">
                    {loading && (
                        <>
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                        </>
                    )}
                    {bestSellers.map((product) => (
                        <ProductCard
                            key={product.Product_ID}
                            product={product}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
