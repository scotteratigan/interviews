/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render } from '@testing-library/react';
import InterviewSelections from './InterviewSelections';

const props = {
  locations: [],
  availableTransport: [],
};

describe('interviewSelections', () => {
  it('component renders', () => {
    expect.assertions(1);
    const { getByText } = render(<InterviewSelections {...props} />);
    const linkElement = getByText(/select interview location/i);
    expect(linkElement).toBeInTheDocument();
  });
});
