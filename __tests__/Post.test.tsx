import React from 'react';
import { render } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import Post from '../src/components/post/Post';
import { usePost } from '../src/hooks/usePost';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

jest.mock('../src/hooks/usePost', () => ({
  usePost: jest.fn(),
}));

describe('Post', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
  });

  it('renders post title and body', () => {
    (usePost as jest.Mock).mockReturnValue({
      getPostById: jest.fn().mockReturnValue({
        id: 1,
        title: 'Test post',
        body: 'Test post body',
        comments: [],
      }),
    });

    const { getByText } = render(<Post />);
    expect(getByText('Test post')).toBeInTheDocument();
    expect(getByText('Test post body')).toBeInTheDocument();
  });

  it('renders "Post not found" when post is not found', () => {
    (usePost as jest.Mock).mockReturnValue({
      getPostById: jest.fn().mockReturnValue(null),
    });

    const { getByText } = render(<Post />);
    expect(getByText('Post not found')).toBeInTheDocument();
  });

  it('renders comments when post has comments', () => {
    const mockComments = [
      {
        id: 1,
        name: 'Test comment 1',
        body: 'Test comment body 1',
        email: 'test@example.com',
      },
      {
        id: 2,
        name: 'Test comment 2',
        body: 'Test comment body 2',
        email: 'test@example.com',
      },
    ];

    (usePost as jest.Mock).mockReturnValue({
      getPostById: jest.fn().mockReturnValue({
        id: 1,
        title: 'Test post',
        body: 'Test post body',
        comments: mockComments,
      }),
    });

    const { getByText } = render(<Post />);
    expect(getByText('Test comment 1')).toBeInTheDocument();
    expect(getByText('Test comment body 1')).toBeInTheDocument();
    expect(getByText('Test comment 2')).toBeInTheDocument();
    expect(getByText('Test comment body 2')).toBeInTheDocument();
  });

  it('renders "No comments available." when post has no comments', () => {
    (usePost as jest.Mock).mockReturnValue({
      getPostById: jest.fn().mockReturnValue({
        id: 1,
        title: 'Test post',
        body: 'Test post body',
        comments: [],
      }),
    });

    const { getByText } = render(<Post />);
    expect(getByText('No comments available.')).toBeInTheDocument();
  });
});
