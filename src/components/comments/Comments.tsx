import React from "react";
import styles from "./Comments.module.scss";
import withLogging from "../../hoc/withLogging";

interface CommentsProps {
  children: React.ReactNode;
}

const CommentsComponent: React.FC<CommentsProps> = ({ children }) => {
  return <ul className={styles.comments}>{children}</ul>;
};

const Comments = withLogging(CommentsComponent);
export default Comments;
