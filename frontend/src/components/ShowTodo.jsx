import PropTypes from 'prop-types';

export default function ShowTodo({ title, description }) {
    return (
        <div>
            <div>
                <h5>Todo:</h5>
                <h6>{title}</h6>
                <p>{description}</p>
            </div>
        </div>
    );
}

ShowTodo.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};