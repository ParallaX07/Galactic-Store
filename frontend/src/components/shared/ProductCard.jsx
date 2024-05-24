import PropTypes from "prop-types";
import { FaCoins } from "react-icons/fa6";
import { GiGalaxy } from "react-icons/gi";
import { IoPlanet } from "react-icons/io5";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { PiStarBold, PiStarFill, PiStarHalfFill } from "react-icons/pi";
import { Tooltip } from "react-tooltip";

const ProductCard = ({ product }) => {
    console.log(product.AvgRating);

    return (
        <div className="form p-4 rounded-3xl custom-shadow flex flex-col flex-grow justify-around lg:min-h-full relative border border-gray-100 max-w-sm">
            <img
                className="rounded-2xl h-[300px] object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
                src={product.Image_Url}
                alt=""
            />
            <div className="lg:my-3">
                <h2 className="text-2xl font-semibold hover:text-gray-400">
                    {product.Name}
                </h2>
                    {product.AvgRating && <div className=" flex items-center gap-3 w-fit" id={`${product?.Product_ID}`}>
                        <ReactStars
                            count={5}
                            size={24}
                            value={product?.AvgRating || 0}
                            isHalf={true}
                            edit={false}
                            emptyIcon={<PiStarBold />}
                            halfIcon={<PiStarHalfFill />}
                            fullIcon={<PiStarFill />}
                            activeColor="#62DFE8"
                        />
                    </div>}
                <div className="flex lg:flex-row flex-col lg:gap-5 lg:items-center mt-4">
                    <p className="flex gap-2 items-center text-primary font-bold">
                        <FaCoins
                            className="lg:text-xl text-[#dbb42c]"
                            title="Price"
                        />
                        {product.Price}{" "}
                        <span className="font-medium">Galactic Credits</span>
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
            <Tooltip
                    anchorSelect={`#${product?.Product_ID}`}
                    place="top"
                    style={{
                        backgroundColor: "#325B72",
                        color: "rgb(255, 255, 255)",
                        fontWeight: "700",
                    }}
                >
                    {product.AvgRating || 0} / 5 stars <span className="text-sm text-gray-300 font-medium">({product.TotalReviews} reviews)</span>
                </Tooltip>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    productRating: PropTypes.number,
};

export default ProductCard;
