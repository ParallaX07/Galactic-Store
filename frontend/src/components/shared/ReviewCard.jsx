import PropTypes from "prop-types";
import { PiStarBold, PiStarFill, PiStarHalfFill } from "react-icons/pi";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";

const ReviewCard = ({
    productReview,
    currentUserEmail,
    handleDeleteReview,
}) => {
    return (
        <div className="flex flex-col justify-between rounded-md border border-neutral-800 glass p-8 shadow-sm w-full">
            <p className="my-4 mb-0 text-base font-normal leading-relaxed tracking-wide text-gray-400">
                &quot;{productReview.reviewDesc}&quot;
            </p>
            <ReactStars
                count={5}
                value={productReview.rating}
                size={24}
                isHalf={true}
                edit={false}
                emptyIcon={<PiStarBold />}
                halfIcon={<PiStarHalfFill />}
                fullIcon={<PiStarFill />}
                activeColor="#62DFE8"
            />
            <div className="mt-6 flex items-center gap-6 ">
                <div className="size-14 rounded-full shadow-sm outline-neutral-800">
                    <div className="  rounded-full border-neutral-800">
                        <img
                            alt=""
                            src={
                                productReview.Profile_image ||
                                "https://i.ibb.co/hYbbGyR/6596121-modified.png"
                            }
                            loading="lazy"
                        ></img>
                    </div>
                </div>
                <div>
                    <p className="leading-relaxed tracking-wide text-gray-200">
                        <span className="font-bold">{productReview.Name}</span>{" "}
                        <br />
                        <span className="text-sm flex gap-3 items-center">
                            Verified Buyer{" "}
                            <RiVerifiedBadgeFill className="text-secondary text-lg" />
                        </span>
                        {/* format post_date 2024-05-24T00:30:25.000Z */}
                        <span className="text-sm text-gray-400">
                            {new Date(productReview.post_date).toLocaleString(
                                "en-US",
                                {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true,
                                }
                            )}
                        </span>
                    </p>
                </div>
            </div>
            {currentUserEmail === productReview.Email_ID && (
                <div className="flex justify-start">
                    <button
                        className="text-sm text-gray-300 mt-3 bg-primary-500 px-4 rounded-md"
                        onClick={() =>
                            handleDeleteReview(
                                productReview.product_ID,
                                productReview.Email_ID
                            )
                        }
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

ReviewCard.propTypes = {
    productReview: PropTypes.object.isRequired,
    currentUserEmail: PropTypes.string,
    handleDeleteReview: PropTypes.func,
};

export default ReviewCard;
