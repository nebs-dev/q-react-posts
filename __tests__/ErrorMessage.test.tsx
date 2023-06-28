import React from 'react';
import { render } from '@testing-library/react';
import ErrorMessage from '../src/components/ErrorMessage';

describe('ErrorMessage', () => {
  it('renders the error message', () => {
    const errorMessage = 'An error occurred.';
    const { getByText } = render(<ErrorMessage message={errorMessage} />);
    expect(getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it('displays the correct error message prop', () => {
    const errorMessage = 'Network error';
    const { getByText } = render(<ErrorMessage message={errorMessage} />);
    expect(getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });
});
