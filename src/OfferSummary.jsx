/* eslint-disable operator-linebreak */
import React from 'react';
import PropTypes from 'prop-types';

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
  return (
    <>
      <h3>
        Job Offer
        {jobOffers.length > 1 ? 's' : ''}
      </h3>
      <p>{jobOffers.map((offer) => offer.location).join(', ')}</p>
    </>
  );
}

OfferSummary.propTypes = {
  interviews: PropTypes.arrayOf(PropTypes.object).isRequired,
};
