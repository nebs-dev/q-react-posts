import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Search from '../src/components/search/Search';

describe('SearchComponent', () => {
  it('renders without error', () => {
    render(<Search searchTerm="" onSearchChange={() => {}} />);
  });

  it('displays the search input with the correct placeholder', () => {
    const { getByPlaceholderText } = render(
      <Search searchTerm="" onSearchChange={() => {}} />
    );
    const searchInput = getByPlaceholderText('Search by user name') as HTMLInputElement;
    expect(searchInput).toBeInTheDocument();
  });

  it('invokes the onSearchChange callback when the input value changes', () => {
    const onSearchChange = jest.fn();
    render(<Search searchTerm="" onSearchChange={onSearchChange} />);
    const searchInput = screen.getByPlaceholderText('Search by user name') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'John' } });
    expect(onSearchChange).toHaveBeenCalledWith('John');
  });

  it('displays the search term correctly in the input value', () => {
    render(<Search searchTerm="John" onSearchChange={() => {}} />);
    const searchInput = screen.getByPlaceholderText('Search by user name') as HTMLInputElement;
    expect(searchInput.value).toBe('John');
  });
});
