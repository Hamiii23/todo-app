import PropTypes from 'prop-types';

export default function InputBox({label, placeholder}) {
    return <div>
        <h5 className="m-2">{label}</h5>
        <input className="border-1 rounded-b-sm p-2 w-2xl" type="text" placeholder={placeholder}/>
    </div>
}

InputBox.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
};