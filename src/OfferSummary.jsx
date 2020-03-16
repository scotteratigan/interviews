/* eslint-disable operator-linebreak */
import React from 'react';
import PropTypes from 'prop-types';
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
      <>
        <h3>
          Job Offer
          {jobOffers.length > 1 ? 's' : ''}
        </h3>
        <p>{jobOffers.map((offer) => offer.location).join(', ')}</p>
        <Confetti />
      </>
    );
  }
  return <h3>No offers this round, better luck next time.</h3>;
}

OfferSummary.propTypes = {
  interviews: PropTypes.arrayOf(PropTypes.object).isRequired,
};
