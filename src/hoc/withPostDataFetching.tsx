import React, { useEffect, useState } from 'react';
import { PostDetailsType } from '../types/post-details.types';
import { PostContext } from '../context/PostContext';
import Loader from '../components/Loader';
import { fetchComments, fetchPosts, fetchUser } from '../services/api';

const withPostDataFetching = <P extends object>(
  WrappedComponent: React.ComponentType<P & { posts: PostDetailsType[] }>
) => {
  const WithPostDataFetching: React.FC<P> = (props) => {    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { posts, setPosts } = React.useContext(PostContext);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const postsData = await fetchPosts();          

          const postPromises = postsData.map(async (post) => {
            const [userData, commentsData] = await Promise.all([
              fetchUser(post.userId),
              fetchComments(post.id),
            ]);            

            const postWithUserData: PostDetailsType = {
              ...post,
              user: userData,
              comments: commentsData,
            };                      

            return postWithUserData;
          });

          const postsWithUserData = await Promise.all(postPromises);
          setPosts(postsWithUserData);          
          setLoading(false);
          localStorage.setItem('posts', JSON.stringify(postsWithUserData));
        } catch (error) {
          setError('Error fetching data.');
          setLoading(false);
        }
      };

      fetchData();
    }, [setPosts]);

    if (loading) {
      return <Loader />;
    }

    if (error) {
      return <div>{error}</div>;
    }

    return <WrappedComponent {...props as P} posts={posts} />;
  };

  return WithPostDataFetching;
};

export default withPostDataFetching;
