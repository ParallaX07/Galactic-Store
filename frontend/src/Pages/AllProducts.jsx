import { Suspense, lazy, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
const AllProductCard = lazy(() => import("../components/shared/ProductCard"));
const LoadingCard = lazy(() => import("../components/shared/LoadingCard"));
import SearchBar from "../components/shared/SearchBar";
import Loader from "../components/shared/Loader";
import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";

const AllProducts = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sortOption, setSortOption] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(0);
    const axiosSecure = useAxiosSecure();
    const [itemsPerPage] = useState(9);

    const numberOfPages = Math.ceil(count / itemsPerPage);

    const pages = [...Array(numberOfPages).keys()];

    useEffect(() => {
        setLoading(true);
        axiosSecure
            .get(
                `/products?attributes=Product_ID,Name,Price,Galaxy_source,Planet_source,Quantity_inStock,Image_Url&limit=${itemsPerPage}&page=${currentPage}`
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

            axiosSecure.get("/productCount").then((res) => setCount(res.data[0].count)).catch((err) => console.log(err));
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        if (sortOption && Array.isArray(allProducts)) {
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
            <div className="flex flex-wrap gap-4 justify-center items-center my-3">
                <BiArrowFromRight
                    className=" text-gray-100 text-2xl hover:cursor-pointer"
                    onClick={() =>
                        setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev))
                    }
                />
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-2 py-1 rounded-lg ${
                            page === currentPage
                                ? "bg-white text-primary"
                                : " bg-primary text-gray-100"
                        } border-2 border-white bg-gray-100 transition duration-300 font-bold`}
                    >
                        {page + 1}
                    </button>
                ))}
                <BiArrowFromLeft
                    className=" text-gray-100 text-2xl hover:cursor-pointer"
                    onClick={() =>
                        setCurrentPage((prev) =>
                            prev < numberOfPages - 1 ? prev + 1 : prev
                        )
                    }
                />
            </div>
            {loading ? (
                <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 lg:max-w-7xl mx-auto">
                    <Suspense fallback={<Loader />}>
                        <LoadingCard />
                        <LoadingCard />
                        <LoadingCard />
                    </Suspense>
                </div>
            ) : (
                <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 lg:max-w-7xl mx-auto">
                    {sortedProducts.map((product) => (
                        <AllProductCard
                            product={product}
                            key={product.Product_ID}
                        />
                    ))}
                </div>
            )}
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
