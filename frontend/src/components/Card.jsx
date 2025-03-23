import PropTypes from 'prop-types';
import { Children } from 'react';

export default function Card({ label }) {
    return (
        <div className="flex justify-center border-1 p-5 mt-3 border-gray-400 rounded-2xl bg-gray-50">
            <div>
                <h1>{label}</h1>
            </div>
            <div>
                {Children}
            </div>
        </div>
    );
}

Card.propTypes = {
    label: PropTypes.string.isRequired,
};