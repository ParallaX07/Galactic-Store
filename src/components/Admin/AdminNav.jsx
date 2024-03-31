import { useState } from "react";
import "./AdminNav.css";
import { Link } from "react-router-dom";
import AddNewItem from "../forms/AddNewItem";
import { IoAddOutline } from "react-icons/io5";

const searchBar = (
    <>
        <div className="container">
            <input
                type="text"
                name="text"
                className="input"
                required
                placeholder="Type to search..."
            />
            <div className="icon">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ionicon"
                    viewBox="0 0 512 512"
                >
                    <title>Search</title>
                    <path
                        d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                        fill="none"
                        stroke="currentColor"
                        strokeMiterlimit="10"
                        strokeWidth="32"
                    />
                    <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        strokeWidth="32"
                        d="M338.29 338.29L448 448"
                    />
                </svg>
            </div>
        </div>
    </>
);


const AdminNav = () => {
    const [isAdd, setIsAdd] = useState(false);

    const handleAddItem = () => {
        setIsAdd(!isAdd);
        
    };

    

    return (
        <div className="sticky top-0">
            <div className="p-3 bg-[#060811] bg-opacity-90 shadow-2xl flex items-center justify-between relative">
                <Link to="/admin">
                    <img
                        className="size-14"
                        src="https://i.ibb.co/Wg43jL4/logo.png"
                        alt=""
                    />
                </Link>
                <span className="absolute left-0 right-0 mx-auto text-2xl lg:text-4xl font-black bg-gradient-to-r from-[#62DFE8] via-[#325B72] to-[#15192D] text-transparent bg-clip-text animate-gradient bg-300% w-max">
                    Admin Panel
                </span>
                <div className="flex gap-3">
                    <div>{searchBar}</div>
                    <div className="group relative ">
                        <button onClick={handleAddItem} className="bg-[#15192D] rounded-full p-2 flex gap-2 items-center">
                        <IoAddOutline className="text-2xl" />
                        </button>
                        <span className="absolute -bottom-12 left-[50%] -translate-x-[100%] z-20 origin-left scale-0 px-3 rounded-lg border border-[#325B72] bg-[#15192D] py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100 min-w-32">
                            Add new Item <span> </span>
                        </span>
                    </div>
                </div>
            </div>
                {
                    isAdd && <AddNewItem isAdd={isAdd} handleAddItem={handleAddItem}/>
                }
        </div>
    );
};

export default AdminNav;
