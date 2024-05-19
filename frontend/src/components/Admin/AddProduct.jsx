import { useContext } from "react";
import { MessageContext } from "../../Pages/Root";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddProduct = () => {
    const { notifyError, notifySuccess } = useContext(MessageContext);
    const axiosSecure = useAxiosSecure();

    const handleAddProduct = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get("name");
        const price = formData.get("price");
        const planet = formData.get("planet");
        const galaxy = formData.get("galaxy");
        const quantity = formData.get("quantity");
        const image = formData.get("image");
        const description = formData.get("description");

        axiosSecure.post("/products", {
            Name: name,
            Price: price,
            Planet: planet,
            Galaxy: galaxy,
            Quantity_Stock: quantity,
            Image: image,
            Description: description,
        }).then(() => {
            notifySuccess("Product added successfully");
            e.target.reset();
        }).catch((error) => {
            notifyError(error.message);
        });
    }

    return (
        <div className="h-dvh flex justify-center mt-10">
            <form
                className="form lg:px-20 lg:py-14 m-6 p-10 w-full max-w-fit my-auto"
                onSubmit={(e) => handleAddProduct(e)}
            >
                <p className="text-2xl underline underline-offset-4 text-center">Add Product</p>
                <div className="flex gap-4 lg:flex-row flex-col">
                    <div className="group">
                        <input
                            required={true}
                            className="main-input"
                            type="text"
                            name="name"
                        />
                        <span className="highlight-span"></span>
                        <label className="label-email">Name</label>
                    </div>
                    <div className="group">
                        <input
                            required={true}
                            className="main-input"
                            type="number"
                            name="price"
                        />
                        <span className="highlight-span"></span>
                        <label className="label-email">Price</label>
                    </div>
                </div>
                <div className="flex gap-4 lg:flex-row flex-col">
                    <div className="group">
                        <input
                            required={true}
                            className="main-input"
                            type="text"
                            name="planet"
                        />
                        <span className="highlight-span"></span>
                        <label className="label-email">Planet</label>
                    </div>
                    <div className="group">
                        <input
                            required={true}
                            className="main-input"
                            type="text"
                            name="galaxy"
                        />
                        <span className="highlight-span"></span>
                        <label className="label-email">Galaxy</label>
                    </div>
                </div>
                <div className="flex gap-4 lg:flex-row flex-col">
                    <div className="group">
                        <input
                            required={true}
                            className="main-input"
                            type="number"
                            name="quantity"
                        />
                        <span className="highlight-span"></span>
                        <label className="label-email">Quantity Stock</label>
                    </div>
                    <div className="group">
                        <input
                            required={true}
                            className="main-input"
                            type="text"
                            name="image"
                        />
                        <span className="highlight-span"></span>
                        <label className="label-email">Image URL</label>
                    </div>
                </div>
                <div className="group">
                    <textarea
                        required={true}
                        className="main-input"
                        type="text"
                        name="description"
                    />
                    <span className="highlight-span"></span>
                    <label className="label-email">Description</label>
                </div>
                {/* sign up button */}
                <button type="submit" className="submit text-white hover:bg-black hover:bg-opacity-40">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;