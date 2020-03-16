/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render } from '@testing-library/react';
import InterviewSelections from './InterviewSelections';

const props = {
  locations: [],
  availableTransport: [],
  addInterview: jest.fn(),
  location: '',
  setLocation: jest.fn(),
  transport: '',
  setTransport: jest.fn(),
};

describe('<InterviewSelections>', () => {
  it('renders', () => {
    expect.assertions(1);
    const { getByText } = render(<InterviewSelections {...props} />);
    const testElm = getByText(/select interview location/i);
    expect(testElm).toBeInTheDocument();
  });
});
