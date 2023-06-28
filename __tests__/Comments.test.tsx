import React from 'react';
import { render } from '@testing-library/react';
import Comments from '../src/components/comments/Comments';


describe('Comments', () => {
  it('renders without error', () => {
    render(<Comments>Test comment 1</Comments>);
  });

  it('displays the comments correctly', () => {
    const { getByText } = render(
      <Comments>
        <li>Test comment 1</li>
        <li>Test comment 2</li>
        <li>Test comment 3</li>
      </Comments>
    );

    expect(getByText('Test comment 1')).toBeInTheDocument();
    expect(getByText('Test comment 2')).toBeInTheDocument();
    expect(getByText('Test comment 3')).toBeInTheDocument();
  });

  it('applies the correct CSS class to the comments element', () => {
    const { container } = render(<Comments>Test comment</Comments>);
    const commentsElement = container.querySelector('ul');
    expect(commentsElement).toHaveClass('comments');
  });
});
