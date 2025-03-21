import PropTypes from 'prop-types';

export default function Button({ label, onClick }) {
    return (
        <div className="flex justify-items-start">
            <button onClick={onClick} className="border-1 py-3 px-5 mt-2 rounded-xl bg-black text-white" type="button">
                {label}
            </button>
        </div>
    );
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
};