import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HeaderComponent from '../src/components/Header';

describe('HeaderComponent', () => {
  it('renders the logo text', () => {
    render(
      <MemoryRouter>
        <HeaderComponent />
      </MemoryRouter>
    );
    const logoElement = screen.getByText('React Blog');
    expect(logoElement).toBeInTheDocument();
  });

  it('navigates to the home page when the logo is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/some-route']}>
        <HeaderComponent />
      </MemoryRouter>
    );
    const logoElement = screen.getByText('React Blog');
    expect(logoElement).toHaveAttribute('href', '/');
  });

  it('has the correct CSS class', () => {
    render(
      <MemoryRouter>
        <HeaderComponent />
      </MemoryRouter>
    );
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toHaveClass('header');
  });
});
