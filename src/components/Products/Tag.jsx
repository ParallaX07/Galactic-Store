import PropTyes from "prop-types";
import { Link } from 'react-router-dom';

const Tag = ({tag}) => {
    return (
        <Link to={`/admin/tags/${tag}`}>
            <span
            
                className="bg-[#62DFE8] bg-opacity-10 text-[#62DFE8] px-2 py-1 rounded-3xl font-medium"
            >
                #{tag}
            </span>
        </Link>
    );
};

Tag.propTypes = {
    tag: PropTyes.string.isRequired,
};

export default Tag;
