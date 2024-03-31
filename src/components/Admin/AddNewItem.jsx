import PropTypes from "prop-types";
import { ImCross } from "react-icons/im";
import TextInput from "./TextInput";

const AddNewItem = ({ isAdd, handleAddItem }) => {
    let showPanel = "hidden";
    isAdd ? (showPanel = "flex") : (showPanel = "hidden");
    return (
        <div className="absolute top-52 lg:left-96 lg:right-96 left-3 right-3">
            <div
                className={`${showPanel} relative z-10 border flex flex-col gap-4 p-4 lg:p-10 bg-[#15192D] rounded-2xl shadow-2xl w-full h-96`}
            >
                <span className="mx-auto text-2xl lg:text-4xl font-black bg-gradient-to-r from-[#62DFE8] via-[#325B72] to-[#15192D] text-transparent bg-clip-text animate-gradient bg-300% w-max">
                    Admin Panel
                </span>
                <form className="flex flex-col gap-3">
                    <TextInput type="name" placeholder="Product Name" />
                    <TextInput type="price" placeholder="Price" />
                    <TextInput type="imageUrl" placeholder="Image URL" />
                    <TextInput type="Description" placeholder="Description" />
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
