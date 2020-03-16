/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SelectFromList from './SelectFromList';

export default function SelectInterview({
  locations,
  availableTransport,
  addInterview,
  location,
  setLocation,
  transport,
  setTransport,
}) {
  const [locationDistance, setLocationDistance] = useState(0);

  function calculateDistance(val) {
    const selectedLocation = locations.filter(({ city }) => city === val);
    const { distance } = selectedLocation[0];
    setLocationDistance(distance);
  }

  function handleLocationSelect(val) {
    // when user selects a location, clear transport option to prevent invalid
    setLocation(val);
    setTransport('');
    if (val) calculateDistance(val);
  }

  function filterTransport(distance) {
    // returns array of transport options (name strings)
    // filters out options which have no units left, or whose max_distance is insufficient
    return availableTransport
      .filter(({ unit, max_distance }) => {
        if (!unit) return false;
        return distance <= max_distance;
      })
      .map(({ name }) => name);
  }

  function submitInterview() {
    addInterview({
      location,
      transport,
    });
  }

  return (
    <form>
      <SelectFromList
        label="Select interview location"
        options={locations.map(({ city }) => city)}
        value={location}
        onChange={(v) => handleLocationSelect(v)}
      />
      {location && (
        <SelectFromList
          label="Select transport method"
          options={filterTransport(locationDistance)}
          value={transport}
          onChange={(v) => setTransport(v)}
        />
      )}
      {location && transport && (
        <button type="button" onClick={submitInterview}>
          Confirm Interview
        </button>
      )}
    </form>
  );
}

SelectInterview.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  availableTransport: PropTypes.arrayOf(PropTypes.object).isRequired,
  addInterview: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired, // currently selected location
  setLocation: PropTypes.func.isRequired,
  transport: PropTypes.string.isRequired, // currently selected transportation name (car)
  setTransport: PropTypes.func.isRequired,
};
