import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Posts.module.scss';
import { PostDetailsType } from '../../types/post-details.types';
import Search from '../search/Search';
import withLogging from '../../hoc/withLogging';

interface PostsProps {
  posts: PostDetailsType[];
}

const PostsComponent: React.FC<PostsProps> = ({ posts }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const filteredPosts = posts.filter((post) =>
    post.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.posts}>
      <h1>Posts</h1>
      <Search searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <ul className={styles.postList}>
        {filteredPosts.map((post) => {
          return (
            <li key={post.id} className={styles.postItem}>
              <Link to={`/post/${post.id}`} className={styles.postLink}>
                <h2>{post.title}</h2>
              </Link>
              <p>{post.body}</p>
              <div className={styles.meta}>
                <span className={styles.author}>By {post.user.name}</span>
                <span className={styles.commentCount}>
                  {post.comments.length} Comment{post.comments.length !== 1 ? 's' : ''}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Posts = withLogging(PostsComponent);
export default Posts;
