import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('app', () => {
  it('component renders', () => {
    expect.assertions(1);
    const { getByText } = render(<App />);
    const linkElement = getByText(/interviews planner/i);
    expect(linkElement).toBeInTheDocument();
  });
});
