/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SelectFromList from './SelectFromList';

const props = {
  label: 'select an option',
  options: ['one', 'two'],
  value: '',
  onChange: jest.fn(),
};

describe('<SelectFromList>', () => {
  it('renders', () => {
    expect.assertions(1);
    const { getByText } = render(<SelectFromList {...props} />);
    const testElm = getByText(props.label);
    expect(testElm).toBeInTheDocument();
  });

  // it('calls onChange when selected', async () => {
  //   expect.assertions(2);
  //   expect(props.onChange).toHaveBeenCalledTimes(0);
  //   const { getByLabelText } = render(<SelectFromList {...props} />);
  //   fireEvent.change(getByLabelText(props.label), { target: { value: 'two' } });
  //   expect(props.onChange).toHaveBeenCalledTimes(1);
  // });
});
