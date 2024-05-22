// EditProductModal.jsx
import React from 'react';
import { FaTimes } from "react-icons/fa";
import PropTypes from 'prop-types';

const EditProductModal = ({ product, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = React.useState(product);

    React.useEffect(() => {
        setFormData(product);
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const Name = formData.get('Name');
        const Price = formData.get('Price');
        const Galaxy_source = formData.get('Galaxy_source');
        const Planet_source = formData.get('Planet_source');
        const Quantity_inStock = formData.get('Quantity_inStock');
        const Description = formData.get('Description');
        const Image_Url = formData.get('Image_Url');

        const updatedProduct = {
            Name,
            Price,
            Galaxy_source,
            Planet_source,
            Quantity_inStock,
            Description,
            Image_Url,
            Product_ID: product.Product_ID,
        };

        onSave(updatedProduct);
    };

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 flex pt-[120px]  justify-center z-50 bg-black bg-opacity-50 mx-3'>
            <div className=" max-h-fit">
                <div className="glass  p-6 rounded-lg shadow-lg w-full max-w-md mx-auto ">
                    <button className="absolute top-2 right-2 text-2xl text-red-600" onClick={onClose}>
                        <FaTimes />
                    </button>
                    <h2 className="text-2xl mb-4 text-white">Edit Product</h2>
                    <form onSubmit={handleSubmit} >
                        <div className="flex gap-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-300">Name</label>
                                <input
                                    type="text"
                                    name="Name"
                                    value={formData?.Name || ''}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-300">Price</label>
                                <input
                                    type="number"
                                    name="Price"
                                    value={formData?.Price || ''}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border rounded"
                                />
                            </div>
                        </div>
                        <div className='flex gap-4'>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-300">Galaxy</label>
                                <input
                                    type="text"
                                    name="Galaxy_source"
                                    value={formData?.Galaxy_source || ''}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-300">Planet</label>
                                <input
                                    type="text"
                                    name="Planet_source"
                                    value={formData?.Planet_source || ''}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border rounded"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300">Quantity in Stock</label>
                            <input
                                type="number"
                                name="Quantity_inStock"
                                value={formData?.Quantity_inStock || ''}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300">Image URL</label>
                            <input
                                type="text"
                                name="Image_Url"
                                value={formData?.Image_Url || ''}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300">Description</label>
                            <textarea
                                type="text"
                                name="Description"
                                value={formData?.Description || ''}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border rounded"
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

EditProductModal.propTypes = {
    product: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default EditProductModal;
