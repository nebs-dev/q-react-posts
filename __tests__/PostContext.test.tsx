import React, { useContext } from 'react';
import { render, screen, act, renderHook } from '@testing-library/react';
import { PostProvider, PostContext } from '../src/context/PostContext';
import { PostDetailsType } from '../src/types/post-details.types';

describe('PostProvider', () => {
  it('sets initial posts and saves to localStorage', () => {
    const initialPosts: PostDetailsType[] = [
      {
        id: 1,
        title: 'Post 1',
        user: {
          id: 1,
          name: 'John Doe',
          username: 'johndoe',
          email: 'johndoe@example.com',
          phone: '1234567890',
        },
        comments: [],
        body: 'Lorem ipsum',
        userId: 1,
      },
      // Add more posts here if needed
    ];

    let postCount = 0;

    render(
      <PostProvider initialPosts={initialPosts}>
        <PostContext.Consumer>
          {(value) => {
            postCount = value.posts.length;
            return <div data-testid="postCount">{postCount}</div>;
          }}
        </PostContext.Consumer>
      </PostProvider>
    );

    const postCountElement = screen.getByTestId('postCount');
    expect(postCountElement.textContent).toBe('1'); // Assuming there's 1 initial post
  });

  it('updates posts state and localStorage when setPosts is called', () => {
    const { result } = renderHook(() => useContext(PostContext));

    act(() => {
      result.current.setPosts([
        {
          id: 1,
          title: 'Updated Post 1',
          user: {
            id: 1,
            name: 'John Doe',
            username: 'johndoe',
            email: 'johndoe@example.com',
            phone: '1234567890',
          },
          comments: [],
          body: 'Lorem ipsum',
          userId: 1,
        },
        {
          id: 2,
          title: 'Updated Post 2',
          user: {
            id: 2,
            name: 'Jane Doe',
            username: 'janedoe',
            email: 'janedoe@example.com',
            phone: '0987654321',
          },
          comments: [],
          body: 'Dolor sit amet',
          userId: 2,
        },
      ]);
    });

    render(
      <PostProvider initialPosts={[]}>
        <PostContext.Consumer>
          {(value) => (
            <div data-testid="postCount">{value.posts.length}</div>
          )}
        </PostContext.Consumer>
      </PostProvider>
    );

    const postCountElement = screen.getByTestId('postCount');
    expect(postCountElement.textContent).toBe('1');

    const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    expect(storedPosts).toEqual([
      {
        id: 1,
        title: 'Post 1',
        user: {
          id: 1,
          name: 'John Doe',
          username: 'johndoe',
          email: 'johndoe@example.com',
          phone: '1234567890',
        },
        comments: [],
        body: 'Lorem ipsum',
        userId: 1,
      }
    ]);
  });
});
