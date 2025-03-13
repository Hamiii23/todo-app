import PropTypes from 'prop-types';

export default function InputBox({label, placeholder, type, onChange}) {
    return <div>
        <h5 className="m-2">{label}</h5>
        <input onChange={onChange} className="border-1 rounded-b-sm p-2 w-2xl" type={type} placeholder={placeholder}/>
    </div>
}

InputBox.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
};