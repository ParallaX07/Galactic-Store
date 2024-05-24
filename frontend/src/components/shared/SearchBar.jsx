// SearchBar.jsx
import { useState, useEffect, useRef } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { IoSearchOutline } from "react-icons/io5";
import PropTypes from "prop-types";

const SearchBar = ({setAllProducts, setLoading}) => {
    const axiosSecure = useAxiosSecure();

    const [searchParam, setSearchParam] = useState("");
    const searchRef = useRef(null);

    const handleSearch = () => {
        if (searchParam === "" || searchParam === null) {
            axiosSecure.get("/products?attributes=Product_ID,Name,Price,Galaxy_source,Planet_source,Quantity_inStock,Image_Url")
            .then((response) => {
                setAllProducts(response.data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
            return;
        }
        setLoading(true);
        axiosSecure.get(`/products/search?param=${searchParam}`).then((res) => {
            setAllProducts(res.data);
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
            setLoading(false);
        });
    };

    // Debounce the search
    useEffect(() => {
        const timer = setTimeout(handleSearch, 500);
        return () => clearTimeout(timer);
    }, [searchParam]);

    return (
        <div
            className="flex justify-center lg:flex-row  items-center gap-4 relative "
            ref={searchRef}
        >
            <input
                type="text"
                placeholder="Search Products"
                className="p-2 rounded-lg bg-gray-100 text-primary border-2 border-primary"
                value={searchParam}
                onChange={(e) => setSearchParam(e.target.value)}
            />
            <button
                className="p-3 rounded-full bg-primary text-gray-50"
                onClick={handleSearch}
            >
                <IoSearchOutline />

            </button>
            
        </div>
    );
};

SearchBar.propTypes = {
    setAllProducts: PropTypes.func,
    setLoading: PropTypes.func,
};

export default SearchBar;
