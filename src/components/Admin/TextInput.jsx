import PropTypes from 'prop-types';

const TextInput = ({type, placeholder}) => {
    return (
        <label
            htmlFor={type}
            className="relative block border-b border-gray-700shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
            <input
                type="text"
                id={type}
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 p-3"
                placeholder={placeholder}
            />

            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-[#15192D] p-0.5 text-xs text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                {placeholder}
            </span>
        </label>
    );
};

TextInput.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
};


export default TextInput;
