/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

export default function SelectFromList(props) {
  const { label, options, value, onChange } = props;
  return (
    <label htmlFor={label}>
      {label}
      <select
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">&nbsp;</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

SelectFromList.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
