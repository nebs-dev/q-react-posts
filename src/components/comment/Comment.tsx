import React from "react";
import styles from "./Comment.module.scss";
import withLogging from "../../hoc/withLogging";

interface CommentProps {
  children: React.ReactNode;
}

const CommentComponent: React.FC<CommentProps> = ({ children }) => {
  return <li className={styles.comment}>{children}</li>;
};

const Comment = withLogging(CommentComponent);
export default Comment;
