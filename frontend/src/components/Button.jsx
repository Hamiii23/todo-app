import PropTypes from 'prop-types';

export default function Button({ label, onClick }) {
    return (
        <div className="flex justify-items-start">
            <button onClick={onClick} className="border-1 p-2 mt-2 rounded-md bg-gray-700 text-white" type="button">
                {label}
            </button>
        </div>
    );
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
};