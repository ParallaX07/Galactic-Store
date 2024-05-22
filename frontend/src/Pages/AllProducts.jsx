import { Suspense, lazy, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
const AllProductCard = lazy(() =>
    import("../components/shared/ProductCard")
);
const LoadingCard = lazy(() => import("../components/shared/LoadingCard"));
import SearchBar from "../components/shared/SearchBar";
import Loader from "../components/shared/Loader";

const AllProducts = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sortOption, setSortOption] = useState("");
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        setLoading(true);
        axiosSecure
            .get(
                "/products?attributes=Product_ID,Name,Price,Galaxy_source,Planet_source,Quantity_inStock,Image_Url"
            )
            .then((response) => {
                setAllProducts(response.data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (sortOption) {
            const sorted = [...allProducts].sort((a, b) => {
                switch (sortOption) {
                    case "name":
                        return a.Name.localeCompare(b.Name);
                    case "galaxy":
                        return a.Galaxy_source.localeCompare(b.Galaxy_source);
                    case "planet":
                        return a.Planet_source.localeCompare(b.Planet_source);
                    case "price":
                        return a.Price - b.Price;
                    default:
                        return 0;
                }
            });
            setSortedProducts(sorted);
        } else {
            setSortedProducts(allProducts);
        }
    }, [sortOption, allProducts]);

    return (
        <div className="pt-24 px-3  text-white glass pb-10 min-h-dvh">
            <div className="flex justify-center items-center mb-4 lg:flex-row flex-col gap-4">
                <SearchBar
                    setAllProducts={setAllProducts}
                    setLoading={setLoading}
                />
                <div>
                    <label htmlFor="sort" className="mr-2">
                        Sort by:
                    </label>
                    <select
                        id="sort"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="bg-primary text-white p-2 rounded-3xl space-y-2"
                    >
                        <option value="">Select</option>
                        <option value="name">Name</option>
                        <option value="galaxy">Galaxy</option>
                        <option value="planet">Planet</option>
                        <option value="price">Price</option>
                    </select>
                </div>
            </div>
            {loading ? (<div className="grid lg:grid-cols-3 grid-cols-1 gap-4 lg:max-w-7xl mx-auto">
                    <Suspense fallback={<Loader/>}>
                        <LoadingCard />
                        <LoadingCard />
                        <LoadingCard />
                    </Suspense>
                </div>) : 
                (<div className="grid lg:grid-cols-3 grid-cols-1 gap-4 lg:max-w-7xl mx-auto">
                    {sortedProducts.map((product) => (
                            <AllProductCard product={product} key={product.Product_ID} />
                    ))}
                </div>)
            }
            {allProducts.length === 0 && !loading && (
                <div className="flex justify-center items-center h-[70vh]">
                    <h1 className="text-3xl text-white bg-black px-3 py-2 rounded-lg">
                        No Products Found
                    </h1>
                </div>
            )}
        </div>
    );
};

export default AllProducts;