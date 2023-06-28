import React from "react";
import { useParams } from "react-router-dom";
import { usePost } from "../../hooks/usePost";
import styles from './Post.module.scss';
import withLogging from "../../hoc/withLogging";
import Comments from "../comments/Comments";
import Comment from "../comment/Comment";

const PostComponent: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const postId = parseInt(id || '', 10) || 0;

  const { getPostById } = usePost();
  const post = getPostById(postId);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className={styles.post}>
      <h2>{post.title}</h2>
      <p>{post.body}</p>

      <h3>Comments</h3>
      {post.comments.length > 0 ? (
        <Comments>
          {post.comments.map((comment) => (
            <Comment key={comment.id}>
              <h4>{comment.name}</h4>
              <p>{comment.body}</p>
              <p>Email: {comment.email}</p>
            </Comment>
          ))}
        </Comments>
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
};

const Post = withLogging(PostComponent);
export default Post;
