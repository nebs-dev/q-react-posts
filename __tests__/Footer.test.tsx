import React from 'react';
import { render } from '@testing-library/react';
import FooterComponent from '../src/components/Footer';

describe('FooterComponent', () => {
  it('renders the footer text', () => {
    const { getByText } = render(<FooterComponent />);
    const currentYear = new Date().getFullYear();
    const expectedText = `© ${currentYear} React Blog. All rights reserved.`;
    expect(getByText(expectedText)).toBeInTheDocument();
  });

  it('has the correct CSS class', () => {
    const { container } = render(<FooterComponent />);
    const footerElement = container.querySelector('footer');
    expect(footerElement).toHaveClass('footer');
  });
});
