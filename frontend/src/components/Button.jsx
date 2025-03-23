import PropTypes from 'prop-types';

export default function Button({ label, onClick }) {
    return (
        <div className="flex justify-center">
            <button onClick={onClick} className="border-1 py-3 px-10 mt-2 rounded-4xl bg-black text-white" type="button">
                {label}
            </button>
        </div>
    );
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
};