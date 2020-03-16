import React from 'react';
import PropTypes from 'prop-types';

export default function Interviews({ interviews, performInterview }) {
  return (
    <section>
      <h2>Interviews Scheduled</h2>
      {interviews.length === 0 && <div>No interviews scheduled yet.</div>}
      {interviews.map(
        ({
          location,
          distance,
          transport,
          travelHours,
          applied,
          offeredJob,
        }) => (
          <div key={location}>
            {location}
            {distance}
            {transport}
            {travelHours}
            {!applied ? (
              <button type="button" onClick={() => performInterview(location)}>
                Interview
              </button>
            ) : null}
            {!applied ? null : offeredJob ? (
              <span>Congrats!</span>
            ) : (
              <span>Better luck next time</span>
            )}
          </div>
        ),
      )}
    </section>
  );
}

Interviews.propTypes = {
  interviews: PropTypes.arrayOf(PropTypes.object).isRequired,
  performInterview: PropTypes.func.isRequired,
};
