import React from 'react';
import PropTypes from 'prop-types';

export default function SelectInterview({ locations }) {
  return (
    <form>
      <label htmlFor="interview-location">
        Select interview location
        <select id="interview-location">
          {locations.map(({ city }) => (
            <option key={city}>{city}</option>
          ))}
        </select>
      </label>
    </form>
  );
}

SelectInterview.propTypes = {
  locations: PropTypes.objectOf(PropTypes.string).isRequired,
};
