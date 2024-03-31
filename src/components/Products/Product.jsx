import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Tag from './Tag';



const Product = ({ product }) => {
    return (
        <Link to={`/admin/products/${product.id}`}>
            <div className="shadow-2xl bg-black bg-opacity-95  rounded-2xl p-6 h-full flex flex-col justify-between">
                <div className="w-full p-2 rounded-2xl flex justify-center">
                    <img
                        src={product.image}
                        alt=""
                        className="h-64 object-contain rounded-lg"
                    />
                </div>
                <div className="flex flex-col gap-2 mt-4">
                    <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag, idx) => (
                            <Tag key={idx} tag={tag} />
                        ))}
                    </div>
                    <h3 className="text-2xl font-bold">{product.name}</h3>
                    <p className="text-[#acacac]">$ {product.price}</p>
                </div>
            </div>
        </Link>
    );
};

Product.propTypes = {
    product: PropTypes.object.isRequired,
};

export default Product;
