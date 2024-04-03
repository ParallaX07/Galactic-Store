import PropTyes from "prop-types";
import { useNavigate } from "react-router-dom";

const Tag = ({ tag }) => {
    const navigate = useNavigate();

    const handleClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        navigate(`/admin/tags/${tag}`);
    };

    return (
        <span
            onClick={handleClick}
            className="bg-tertiary bg-opacity-10 text-tertiary px-2 py-1 rounded-3xl font-medium"
            style={{ cursor: "pointer" }}
        >
            #{tag}
        </span>
    );
};
Tag.propTypes = {
    tag: PropTyes.string.isRequired,
};

export default Tag;