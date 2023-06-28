import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { PostContext } from '../src/context/PostContext';
import { usePost } from '../src/hooks/usePost';
import { PostDetailsType } from '../src/types/post-details.types';

describe('usePost', () => {
  it('returns the correct post by id', () => {
    const postId = 1;
    const post: PostDetailsType = {
      id: 1,
      title: 'Test Post',
      user: {
        id: 123,
        name: 'John Doe',
        email: 'johndoe@example.com',
        username: 'johndoe',
        phone: '123-456-7890',
      },
      comments: [],
      body: 'Lorem ipsum dolor sit amet.',
      userId: 123,
    };

    const mockPostContextValue = {
      posts: [post],
      setPosts: jest.fn(),
    };

    const wrapper = ({ children }) => (
      <PostContext.Provider value={mockPostContextValue}>{children}</PostContext.Provider>
    );

    const { result } = renderHook(() => usePost(), { wrapper });

    const resultPost = result.current.getPostById(postId);

    expect(resultPost).toEqual(post);
  });

  it('returns undefined when post is not found', () => {
    const postId = 1;
    const mockPostContextValue = {
      posts: [],
      setPosts: jest.fn(),
    };

    const wrapper = ({ children }) => (
      <PostContext.Provider value={mockPostContextValue}>{children}</PostContext.Provider>
    );

    const { result } = renderHook(() => usePost(), { wrapper });

    const resultPost = result.current.getPostById(postId);

    expect(resultPost).toBeUndefined();
  });
});
