import PropTypes from "prop-types";
import { useState } from "react";
import { ImCross } from "react-icons/im";

const AddNewItem = ({ isAdd, handleAddItem }) => {
    let showPanel = "hidden";
    isAdd ? (showPanel = "flex") : (showPanel = "hidden");

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        price: "",
        image: "",
        description: "",
    });

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
        
    };

    // post to database with this function

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        
    }

    return (
        <div className="absolute top-42 lg:left-96 lg:right-96 left-3 right-3">
            <div
                className={`${showPanel} relative z-10 border flex flex-col gap-4 p-4 lg:p-10 bg-black bg-opacity-95 rounded-2xl shadow-2xl w-full min-h-96 py-3`}
            >
                <span className="mx-auto text-xl lg:text-4xl font-black bg-gradient-to-r from-tertiary via-secondary to-primary text-transparent bg-clip-text animate-gradient bg-300%">
                    Add New Item
                </span>
                <form className=" flex flex-col gap-3" onSubmit={handleSubmit}>
                    <label
                        htmlFor="id"
                        className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
                    >
                        <input
                            type="text"
                            id="id"
                            placeholder="Product ID"
                            className="text-wrap peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                            onChange={handleInputChange}
                            required
                        />

                        <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                            Product ID
                        </span>
                    </label>
                    <label
                        htmlFor="name"
                        className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
                    >
                        <input
                            type="text"
                            id="name"
                            placeholder="Product Name"
                            className="text-wrap peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                            onChange={handleInputChange}
                            required
                        />

                        <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                            Product Name
                        </span>
                    </label>
                    <label
                        htmlFor="price"
                        className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
                    >
                        <input
                            type="text"
                            id="price"
                            placeholder="Price"
                            className="text-wrap peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                            onChange={handleInputChange}
                            required
                        />

                        <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                            Price
                        </span>
                    </label>
                    <label
                        htmlFor="image"
                        className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
                    >
                        <input
                            type="text"
                            id="image"
                            placeholder="Image URL"
                            className="text-wrap peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                            onChange={handleInputChange}
                            required
                        />

                        <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                            Image URL
                        </span>
                    </label>
                    <label
                        htmlFor="Description"
                        className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
                    >
                        <textarea
                            type="text"
                            id="description"
                            placeholder="Description"
                            className="text-wrap peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                            onChange={handleInputChange}
                            required
                        />

                        <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                            Description
                        </span>
                    </label>
                    <button
                        type="submit"
                        className="submit text-white bg-primary hover:bg-opacity-40 mt-5"
                    >
                        Add item
                    </button>
                </form>

                <ImCross
                    onClick={handleAddItem}
                    className="absolute top-3 right-3 text-2xl"
                />
            </div>
        </div>
    );
};

AddNewItem.propTypes = {
    isAdd: PropTypes.bool.isRequired,
    handleAddItem: PropTypes.func.isRequired,
};

export default AddNewItem;
