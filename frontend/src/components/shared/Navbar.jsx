import { Link, NavLink } from "react-router-dom";
import { FaPlus, FaUserAstronaut } from "react-icons/fa6";
import { AuthContext } from "../../Auth/AuthProvider";
import { useContext, useEffect, useRef, useState } from "react";
import { Tooltip } from "react-tooltip";
import { IoMdLogOut } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";
import { MessageContext } from "../../Pages/Root";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
    const active =
        "bg-gradient-to-r from-tertiary via-secondary to-primary text-transparent bg-clip-text animate-gradient bg-300% border-secondary border-b-2";
    const inactive = "hover:text-gray-400 border-transparent border-b-2";
    const { user, logout, loading, setLoading, setUserName, setUserType } =
        useContext(AuthContext);
    const { notifySuccess, notifyError } = useContext(MessageContext);
    const [userDetails, setUserDetails] = useState({});
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (user) {
            setLoading(true);
            axiosSecure
                .get(
                    `/users?email=${
                        user?.email
                    }&value=${"User_Type, CONCAT(F_Name, ' ', L_Name) as Name, Profile_image"}`
                )
                .then((res) => {
                    setUserDetails(res.data[0]);
                    setUserName(res.data[0].Name);
                    setUserType(res.data[0].User_Type);
                })
                .catch((error) => {
                    notifyError(error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [user]);

    const customerNavItems = (
        <>
            <li>
                <NavLink
                    to="/c/order-history"
                    className={({ isActive }) =>
                        isActive ? `${active}` : `${inactive}`
                    }
                >
                    Order History
                </NavLink>
            </li>
        </>
    );

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const adminNavItems = (
        <li>
            <button
                onClick={toggleDropdown}
                className="transition duration-300 focus:outline-none text-gray-100 hover:text-gray-400 flex items-center gap-2"
            >
                Dashboard
                <MdOutlineKeyboardArrowDown className="font-medium text-2xl" />
            </button>
            <div className="relative min-w-full">
                {/* Dashboard dropdown */}
                {dropdownVisible && (
                    <ul className="transition duration-300 absolute top-full -left-20 bg-primary border-gray-100 border shadow-lg py-2 px-3 rounded-md z-10 min-w-fit text-lg">
                        <li>
                            <NavLink
                                to="/a/manage-products"
                                className={({ isActive }) =>
                                    isActive ? `${active}` : `${inactive}`
                                }
                            >
                                Manage Products
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/a/manage-orders"
                                className={({ isActive }) =>
                                    isActive ? `${active}` : `${inactive}`
                                }
                            >
                                Manage Orders
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/a/allUsers"
                                className={({ isActive }) =>
                                    isActive ? `${active}` : `${inactive}`
                                }
                            >
                                View User Information
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/a/stats"
                                className={({ isActive }) =>
                                    isActive ? `${active}` : `${inactive}`
                                }
                            >
                                Store Statistics
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </li>
    );

    const handleLogout = async () => {
        try {
            await logout();
            notifySuccess("Logged out successfully");
        } catch (error) {
            notifyError("An error occurred. Please try again later.");
        }
    };

    /**
     * Represents the logged out state of the Navbar component.
     * @type {JSX.Element}
     */
    const loggedOutState = (
        <>
            <div className="gap-2 items-center lg:flex hidden">
                <FaUserAstronaut className="text-secondary" />
                <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                        isActive ? `${active}` : `${inactive}`
                    }
                >
                    Sign Up
                </NavLink>
                <p>/</p>
                <NavLink
                    to="/login"
                    className={({ isActive }) =>
                        isActive ? `${active}` : `${inactive}`
                    }
                >
                    Login
                </NavLink>
            </div>
        </>
    );

    /**
     * Represents the logged-in state of the Navbar component.
     * @returns {JSX.Element} The JSX element representing the logged-in state.
     */
    const loggedInState = (
        <>
            <div className="flex gap-2 items-center">
                <Link to="/profile" className="profileImage">
                    <img
                        className="size-12 rounded-full"
                        src={
                            userDetails.Profile_image ||
                            "https://i.ibb.co/hYbbGyR/6596121-modified.png"
                        }
                        alt=""
                    />
                </Link>

                <button
                    onClick={handleLogout}
                    className="lg:py-2 lg:px-3 rounded-full  text-white bg-primarybg-opacity-20 border-primary border-2 hidden lg:flex items-center gap-2"
                >
                    <IoMdLogOut className="size-6" />
                </button>
            </div>
        </>
    );

    const [dropDown, setDropDown] = useState(false);

    /**
     * Toggles the dropdown state.
     */
    const handleDropDown = () => {
        setDropDown(!dropDown);
    };

    useEffect(() => {
        /**
         * Handles the click event outside of the dropdown and hamburger elements.
         * If the click is outside and the dropdown is open, it closes the dropdown.
         * @param {Event} event - The click event object.
         */
        const handleClickOutside = (event) => {
            if (
                dropDown &&
                event.target.closest(".dropdown") === null &&
                event.target.closest(".hamburger") === null
            ) {
                setDropDown(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [dropDown]);

    const loadingSkeleton = (
        <div className="flex gap-2 items-center animate-pulse">
            <div className="profileImage bg-gray-200 rounded-full h-12 w-12"></div>
            <button className="lg:py-2 lg:px-3 rounded-full bg-gray-200 text-gray-200 bg-opacity-20 border-gray-200 border-2 hidden lg:flex items-center gap-2">
                <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                Getting info
            </button>
        </div>
    );

    return (
        <>
            <div className=" fixed w-full top-0 z-50 text-white glass">
                <nav className="lg:px-5 px-3 py-2 flex justify-between text-sm items-center lg:text-xl font-medium">
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            className="lg:size-16 size-14"
                            src="https://i.ibb.co/Wg43jL4/logo.png"
                            alt=""
                        />
                        <div>
                            <h1 className=" text-lg lg:text-2xl font-extrabold flex gap-2 bg-gradient-to-r from-tertiary via-secondary to-primary text-transparent bg-clip-text animate-gradient bg-300%">
                                Galactic{" "}
                                <span className="text-white">Store</span>
                            </h1>
                            <p className="text-gray-400 text-xs lg:text-sm font-extrabold">
                                Intergalactic Marketplace
                            </p>
                        </div>
                    </Link>
                    {/* large screen nav items */}
                    <ul className="hidden lg:flex gap-4">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive ? `${active}` : `${inactive}`
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/products"
                                className={({ isActive }) =>
                                    isActive ? `${active}` : `${inactive}`
                                }
                            >
                                All Products
                            </NavLink>
                        </li>

                        {user &&
                            !loading &&
                            (userDetails.User_Type === "Admin"
                                ? adminNavItems
                                : customerNavItems)}
                    </ul>
                    {/* small screen nav items */}
                    <div className="flex gap-3 relative items-center">
                        {userDetails.User_Type === "Admin" && (
                            <NavLink
                                to="/a/add-product"
                                className={({ isActive }) =>
                                    isActive
                                        ? `text-xl p-1 border-2 rounded-full font-bold text-secondary border-secondary`
                                        : `text-xl p-1 border-2 border-white rounded-full font-bold`
                                }
                                title={`Add Product`}
                            >
                                <FaPlus />
                            </NavLink>
                        )}
                        {userDetails.User_Type === "Customer" && user && (
                            <NavLink
                                to="/c/cart"
                                className={({ isActive }) =>
                                    isActive
                                        ? `text-xl p-1 font-bold text-secondary border-secondary`
                                        : `text-xl p-1 font-bold`
                                }
                                title={`Cart`}
                            >
                                <FaShoppingCart />
                            </NavLink>
                        )}
                        {loading
                            ? loadingSkeleton
                            : user
                            ? loggedInState
                            : loggedOutState}{" "}
                        {/* right most element */}
                        <TiThMenu
                            onClick={handleDropDown}
                            className="lg:hidden flex size-6 text-secondary hamburger"
                        />
                        <div
                            className={`dropdown ${
                                dropDown ? "flex" : "hidden"
                            } absolute top-6 right-1 rounded-lg bg-primary py-3 px-5 font-medium border border-secondary w-44`}
                        >
                            <ul className="flex flex-col gap-3 font-medium text-lg">
                                <li>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            isActive
                                                ? `${active}`
                                                : `${inactive}`
                                        }
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/products"
                                        className={({ isActive }) =>
                                            isActive
                                                ? `${active}`
                                                : `${inactive}`
                                        }
                                    >
                                        All Products
                                    </NavLink>
                                </li>
                                {user &&
                                    !loading &&
                                    (userDetails.User_Type === "Admin"
                                        ? adminNavItems
                                        : customerNavItems)}
                                {user ? (
                                    <li
                                        onClick={handleLogout}
                                        className="flex gap-2 items-center"
                                    >
                                        <IoMdLogOut className="text-white" />
                                        Logout
                                    </li>
                                ) : (
                                    <>
                                        <li>
                                            <NavLink
                                                to="/login"
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? `${active}`
                                                        : `${inactive}`
                                                }
                                            >
                                                Login
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/signup"
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? `${active}`
                                                        : `${inactive}`
                                                }
                                            >
                                                Sign Up
                                            </NavLink>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
                <Tooltip
                    anchorSelect=".profileImage"
                    place="top"
                    style={{
                        backgroundColor: "#325B72",
                        color: "rgb(255, 255, 255)",
                        fontWeight: "700",
                    }}
                >
                    {userDetails.Name}
                </Tooltip>
            </div>
        </>
    );
};

export default Navbar;
