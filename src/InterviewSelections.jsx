import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function SelectInterview({ locations, availableTransport }) {
  const [location, setLocation] = useState('');
  const [transport, setTransport] = useState('');
  return (
    <form>
      <label htmlFor="interview-location">
        Select interview location
        <select
          id="interview-location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">&nbsp;</option>
          {locations.map(({ city }) => (
            <option key={city}>{city}</option>
          ))}
        </select>
      </label>
      {location && (
        <label htmlFor="transport-method">
          Select transport method
          <select
            id="transport-method"
            value={transport}
            onChange={(e) => setTransport(e.target.value)}
          >
            <option value="">&nbsp;</option>
            {availableTransport.map(({ name }) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </label>
      )}
      {location && transport && (
        <button type="button">Confirm Interview</button>
      )}
    </form>
  );
}

SelectInterview.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  availableTransport: PropTypes.arrayOf(PropTypes.object).isRequired,
};
