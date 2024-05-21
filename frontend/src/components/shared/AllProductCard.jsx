import PropTypes from "prop-types";
import { FaCoins } from "react-icons/fa6";
import { GiGalaxy } from "react-icons/gi";
import { IoPlanet } from "react-icons/io5";
import { Link } from "react-router-dom";

const AllProductCard = ({product}) => {

    return (
        <div className="form p-4 rounded-3xl custom-shadow flex flex-col flex-grow justify-around lg:min-h-full relative border border-gray-100">
        <img
            className="rounded-2xl h-[290px] object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
            src={product.Image_Url}
            alt=""
        />
        <div className="lg:my-3">
            <h2 className="text-2xl font-semibold hover:text-gray-400">
                {product.Name}
            </h2>
            <div className="flex lg:flex-row flex-col lg:gap-5 lg:items-center mt-4">
                <p className="flex gap-2 items-center text-primary font-bold">
                    <FaCoins className="lg:text-xl text-[#dbb42c]" title="Price"/>
                    {product.Price} <span className="font-medium">Galactic Credits</span>
                </p>
                <p className="flex gap-2 items-center font-medium">
                    In Stock: {product.Quantity_inStock}
                </p>
            </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
            <div className="flex gap-2 items-center text-xl" title="Galaxy">
                <GiGalaxy className="lg:text-xl text-purple-400" />
                {product.Galaxy_source}
            </div>
            <div className="flex gap-2 items-center text-xl" title="Planet">
                <IoPlanet className="lg:text-xl text-tertiary" />
                {product.Planet_source}
            </div>
        </div>
        <Link to={`/p/${product.Product_ID}`}>
            <button className="submit text-white hover:bg-black hover:bg-opacity-40 w-full mt-2">
                View Product
            </button>
        </Link>
    </div>
    );
};

AllProductCard.propTypes = {
    product: PropTypes.object.isRequired,
};

export default AllProductCard;