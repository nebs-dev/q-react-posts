import React from 'react';
import { render } from '@testing-library/react';
import Comment from '../src/components/comment/Comment';

describe('CommentComponent', () => {
  it('renders without error', () => {
    render(<Comment>Test comment</Comment>);
  });

  it('displays the comment text correctly', () => {
    const { getByText } = render(<Comment>Test comment</Comment>);
    const commentText = getByText('Test comment');
    expect(commentText).toBeInTheDocument();
  });

  it('applies the correct CSS class to the comment element', () => {
    const { container } = render(<Comment>Test comment</Comment>);
    const commentElement = container.querySelector('li');
    expect(commentElement).toHaveClass('comment');
  });
});
