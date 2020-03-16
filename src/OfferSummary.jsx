/* eslint-disable operator-linebreak */
import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Confetti from 'react-confetti';

const MAX_INTERVIEWS = 4;

export default function OfferSummary({ interviews }) {
  if (!interviews.length) {
    return null;
  }
  const interviewsRemain =
    interviews.length < MAX_INTERVIEWS ||
    interviews.some(({ interviewed }) => !interviewed);
  if (interviewsRemain) return null;
  const jobOffers = interviews.filter((interview) => interview.offeredJob);
  if (jobOffers.length) {
    return (
      <Box m={4}>
        <h3>
          Job Offer
          {jobOffers.length > 1 ? 's' : ''}
        </h3>
        <p style={{ fontSize: '3rem' }}>
          {jobOffers.map((offer) => offer.location).join(', ')}
        </p>
        <Confetti />
      </Box>
    );
  }
  return <h3>No offers this round, better luck next time.</h3>;
}

OfferSummary.propTypes = {
  interviews: PropTypes.arrayOf(PropTypes.object).isRequired,
};
