import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('app component renders', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/interviews planner/i);
  expect(linkElement).toBeInTheDocument();
});
