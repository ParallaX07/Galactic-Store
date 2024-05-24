import { Suspense, lazy, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { CiMap } from "react-icons/ci";
import Loader from "./Loader";
import { FaCoins } from "react-icons/fa6";
import { AuthContext } from "../../Auth/AuthProvider";
import { MessageContext } from "../../Pages/Root";
import ReactStars from "react-rating-stars-component";
const ReviewCard = lazy(() => import("./ReviewCard"));
import { PiStarBold, PiStarFill, PiStarHalfFill } from "react-icons/pi";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";

const ProductDetails = () => {
    const id = useParams().id;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user, userType } = useContext(AuthContext);
    const [quantity, setQuantity] = useState(1);
    const { notifySuccess, notifyError } = useContext(MessageContext);
    const [userRating, setUserRating] = useState(0);
    const [productReviews, setProductReviews] = useState([]);
    const [alreadyReviewed, setAlreadyReviewed] = useState(false);
    const [productRating, setProductRating] = useState(0);

    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        setLoading(true);
        Promise.all([
            axiosSecure.get(`/product/${id}`),
            axiosSecure.get(`/reviews/${id}`),
            axiosSecure.get(`/rating/${id}`)
        ]).then(([productResponse, reviewsResponse, ratingResponse]) => {
            setProduct(productResponse.data[0]);
            setProductReviews(reviewsResponse.data);
            setProductRating(ratingResponse.data[0]);
    
            reviewsResponse.data.forEach((review) => {
                if (review?.Email_ID === user?.email) {
                    setAlreadyReviewed(true);
                }
            });
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <Loader />;
    }

    const handleCart = () => {
        const orderQuantity = Number(quantity);
        const Product_ID = product?.Product_ID;
        const OrderQuantity = orderQuantity;
        const Email_ID = user?.email;

        if (orderQuantity > product?.Quantity_inStock) {
            notifyError("Quantity exceeds the available stock");
            return;
        }

        setLoading(true);
        axiosSecure
            .post(
                `/cart?productID=${Product_ID}&quantity=${OrderQuantity}&email=${Email_ID}`
            )
            .then(() => {
                notifySuccess("Product added to cart successfully");
            })
            .catch((error) => {
                notifyError("Failed to add product to cart");
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleReview = (e) => {
        e.preventDefault();
        const review = e.target.review.value;
        const rating = userRating;
        const Product_ID = product?.Product_ID;
        const Email_ID = user?.email;

        setLoading(true);

        // check if user already reviewed the product
        if (alreadyReviewed) {
            notifyError("You have already reviewed this product");
            setLoading(false);
            return;
        }
        axiosSecure
            .post("/reviews", {
                product_ID: Product_ID,
                Email_ID: Email_ID,
                reviewDesc: review,
                rating: rating,
            })
            .then((res) => {
                if (res.status === 200) {
                    
                    notifySuccess("Review added successfully");
                }
                setAlreadyReviewed(true);

            })
            .catch((error) => {
                notifyError("Failed to add review");
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDeleteReview = (product_ID, Email_ID) => {
        Swal.fire({
            title: `Do you want to delete the item?`,
            showDenyButton: true,
            confirmButtonText: "Yes, delete it",
            denyButtonText: `No, don't delete`,
            icon: "question",
            confirmButtonColor: "#0b090a",
            background: "#0b090a",
            denyButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                axiosSecure
                    .delete(`/reviews?productID=${product_ID}&userID=${Email_ID}`)
                    .then(() => {
                        notifySuccess("Review deleted successfully");
                        setProductReviews((prevReviews) =>
                            prevReviews.filter(
                                (review) =>
                                    review.product_ID !== product_ID &&
                                    review.Email_ID !== Email_ID
                            )
                        );
                    })
                    .catch((error) => {
                        notifyError("Failed to delete review");
                        console.error(error);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        });
    }

    return (
        <div className=" pt-[80px] glass pb-10 flex flex-col gap-5">
            <div className="flex lg:flex-row flex-col lg:h-dvh">
                <div className="flex w-full lg:rounded-br-lg">
                    <img
                        className="object-cover lg:rounded-br-lg"
                        src={product?.Image_Url}
                        alt={product?.Name}
                    />
                </div>
                <div className="w-full lg:p-10 p-3 flex flex-col justify-center items-start text-white">
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
                            <div className="mt-3 flex items-center gap-3 w-fit rating">
                                <ReactStars
                                    count={5}
                                    size={24}
                                    value={productRating?.rating || 0}
                                    isHalf={true}
                                    edit={false}
                                    emptyIcon={<PiStarBold />}
                                    halfIcon={<PiStarHalfFill />}
                                    fullIcon={<PiStarFill />}
                                    activeColor="#62DFE8"
                                />
                                <p className="text-sm text-gray-300 font-medium">({productRating.count} ratings)</p>
                            </div>
                            <p className="text-lg mt-3">
                                <span className="text-white">In Stock:</span>{" "}
                                <span className="underline underline-offset-4">
                                    {product?.Quantity_inStock}
                                </span>
                            </p>
                            <div className="lg:mt-4 mt-3">
                                {product?.Description}
                            </div>
                            {userType === "Customer" && (
                                <div className="mt-5">
                                    {/* choose quantity */}
                                    <div className="flex items-center gap-3">
                                        <label
                                            htmlFor="quantity"
                                            className="text-white"
                                        >
                                            Quantity:
                                        </label>
                                        {/* decrement */}
                                        <button
                                            className="text-white bg-black  hover:bg-black/30 px-2 py-1 rounded-lg"
                                            onClick={() =>
                                                setQuantity(
                                                    quantity > 1
                                                        ? quantity - 1
                                                        : 1
                                                )
                                            }
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            className="input text-black text-center w-10 rounded-lg"
                                            name="quantity"
                                            value={Number(quantity)}
                                            onChange={(e) =>
                                                setQuantity(e.target.value)
                                            }
                                            style={{ appearance: "textfield" }}
                                        />
                                        {/* increment */}
                                        <button
                                            className="text-white bg-black  hover:bg-black/30 px-2 py-1 rounded-lg"
                                            onClick={() =>
                                                setQuantity(quantity + 1)
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        className="submit text-white bg-black/80 hover:bg-black/80 w-full mt-4"
                                        onClick={handleCart}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* user post reviw box */}
            <div className="animate__animated animate__fadeInUp w-full text-white p-6 rounded-xl shadow-md mt-10 border-2 border-primary glass lg:max-w-5xl lg:mx-auto mx-3">
                <h2 className="text-2xl font-semibold mb-4">
                    Share Your Feedback
                </h2>
                <form onSubmit={handleReview} className={`${alreadyReviewed ? "cursor-not-allowed opacity-30" : ""}`} title={`${alreadyReviewed ? "Already Reviewed" : ""}`}>
                    <ReactStars
                        count={5}
                        onChange={setUserRating}
                        size={24}
                        isHalf={true}
                        emptyIcon={<PiStarBold />}
                        halfIcon={<PiStarHalfFill />}
                        fullIcon={<PiStarFill />}
                        activeColor="#ffd700"
                        edit={!alreadyReviewed}
                    />
                    <textarea
                        className={`w-full lg:h-24 p-2 border rounded-lg resize-none bg-opacity-35 bg-white text-white ${alreadyReviewed ? "cursor-not-allowed" : ""}`}
                        name="review"
                        placeholder="Write your review..."
                        required
                        {...(alreadyReviewed ? { disabled: true } : {})}
                    />
                    <button
                        type="submit"
                        className={`submit text-white bg-black/80 hover:bg-black/80 mt-2 ${alreadyReviewed ? "cursor-not-allowed" : ""}`}
                        {...(alreadyReviewed ? { disabled: true } : {})}
                    >
                        Submit Review
                    </button>
                </form>
            </div>
            {/* product reviews */}
            <div className="grid grid-cols-1 gap-3 max-w-5xl lg:mx-auto mx-3">
                <Suspense fallback={<p></p>}>
                    {productReviews.map((review, idx) => (
                        <ReviewCard key={idx} productReview={review} currentUserEmail={user?.email} handleDeleteReview={handleDeleteReview} />
                    ))}
                </Suspense>
            </div>
            <Tooltip
                    anchorSelect=".rating"
                    place="top"
                    style={{
                        backgroundColor: "#325B72",
                        color: "rgb(255, 255, 255)",
                        fontWeight: "700",
                    }}
                >
                    {productRating?.rating || 0} out of 5 stars
                </Tooltip>
        </div>
    );
};

export default ProductDetails;
