import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('<App>', () => {
  it('renders', () => {
    expect.assertions(1);
    const { getByText } = render(<App />);
    const testElm = getByText(/interviews planner/i);
    expect(testElm).toBeInTheDocument();
  });
});
