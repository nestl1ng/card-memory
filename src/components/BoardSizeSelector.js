import React from 'react';

const BoardSizeSelector = ({ onChange, options }) => {
    return (
        <select onChange={onChange}>
            {options.map((option) => (
                <option key={option.value} value={option.value} disabled={option.disabled}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default BoardSizeSelector;
