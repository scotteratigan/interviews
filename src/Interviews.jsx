import React from 'react';
import PropTypes from 'prop-types';

export default function Interviews({ interviews }) {
  return (
    <section>
      <h2>Interviews Scheduled</h2>
      {interviews.length === 0 && <div>No interviews scheduled yet.</div>}
      {interviews.map(({ location, distance, transport }) => (
        <div key={location}>
          {location}
          {distance}
          {transport}
        </div>
      ))}
    </section>
  );
}

Interviews.propTypes = {
  interviews: PropTypes.arrayOf(PropTypes.object).isRequired,
};
