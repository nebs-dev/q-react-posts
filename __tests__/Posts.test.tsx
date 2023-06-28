import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Posts from '../src/components/posts/Posts';
import { PostProvider } from '../src/context/PostContext';

import '@testing-library/jest-dom/extend-expect';

const mockPosts = [
  {
    id: 1,
    title: 'Test post 1',
    body: 'Test post body 1',
    user: { 
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'johndoe@gmail.com',
      phone: '1234567890',
    },
    userId: 1,
    comments: [],
  },
  {
    id: 2,
    title: 'Test post 2',
    body: 'Test post body 2',
    user: {
      id: 2,
      name: 'Jane Doe',
      username: 'janedoe',
      email: 'janedoe@gmail.com',
      phone: '0987654321',
    },
    userId: 2,
    comments: [],
  },
];

describe('Posts', () => {

  it('renders the post list', () => {
    const { getByText } = render(
      <MemoryRouter>
        <PostProvider>
          <Posts posts={mockPosts} />
        </PostProvider>
      </MemoryRouter>
    );

    expect(getByText('Test post 1')).toBeInTheDocument();
    expect(getByText('Test post body 1')).toBeInTheDocument();
    expect(getByText('Test post 2')).toBeInTheDocument();
    expect(getByText('Test post body 2')).toBeInTheDocument();
  });

  it('filters posts based on search term', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <MemoryRouter>
        <PostProvider>
          <Posts posts={mockPosts} />
        </PostProvider>
      </MemoryRouter>
    );

    const searchInput = getByPlaceholderText('Search by user name');
    fireEvent.change(searchInput, { target: { value: 'John' } });

    expect(getByText('Test post 1')).toBeInTheDocument();
    expect(getByText('Test post body 1')).toBeInTheDocument();
    expect(queryByText('Test post 2')).not.toBeInTheDocument();
    expect(queryByText('Test post body 2')).not.toBeInTheDocument();
  });

  it('navigates to post details page when a post is clicked', () => {
    const history = createBrowserHistory();

    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <PostProvider>
          <Routes>
            <Route
              path="/post/:id"
              element={
                <div>
                  <span data-testid="postDetailsText">Post Details</span>{' '}
                  <span data-testid="postId">{history.location.pathname.split('/').pop()}</span>
                </div>
              }
            />
            <Route path="/" element={<Posts posts={mockPosts} />} />
          </Routes>
        </PostProvider>
      </MemoryRouter>
    );

    const postLink = getByText('Test post 1');
    fireEvent.click(postLink);
  
    const postDetailsText = getByTestId('postDetailsText');

    expect(postDetailsText).toBeInTheDocument();
    expect(postDetailsText.textContent).toContain('Post Details');
    expect(history.location.pathname).toBe('/');
  });

});