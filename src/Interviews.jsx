import React from 'react';
import PropTypes from 'prop-types';

export default function Interviews({ interviews, performInterview }) {
  if (interviews.length === 0) {
    return (
      <div>
        <h2>Interviews Scheduled</h2>
        <p>No interviews scheduled yet.</p>
      </div>
    );
  }
  const totals = interviews.reduce(
    (total, current) => ({
      distance: total.distance + current.distance,
      travelHours: total.travelHours + current.travelHours,
    }),
    { distance: 0, travelHours: 0 },
  );

  return (
    <section>
      <h2>Interviews Scheduled</h2>
      <table>
        <thead>
          <tr>
            <td>Location</td>
            <td>Travel Method</td>
            <td>Distance</td>
            <td>Travel Time (hours)</td>
            <td />
          </tr>
        </thead>
        <tbody>
          {interviews.map(
            ({
              location,
              distance,
              transport,
              travelHours,
              interviewed,
              // offeredJob,
            }) => (
              <tr key={location}>
                <td>{location}</td>
                <td>{transport}</td>
                <td>{distance}</td>
                <td>{travelHours}</td>
                <td>
                  {!interviewed && (
                    <button
                      type="button"
                      onClick={() => performInterview(location)}
                    >
                      Interview
                    </button>
                  )}
                </td>
              </tr>
            ),
          )}
          <tr style={{ backgroundColor: 'grey' }}>
            <td>Total</td>
            <td />
            <td>{totals.distance}</td>
            <td>{totals.travelHours}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

Interviews.propTypes = {
  interviews: PropTypes.arrayOf(PropTypes.object).isRequired,
  performInterview: PropTypes.func.isRequired,
};
