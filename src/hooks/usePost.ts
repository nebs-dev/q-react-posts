import { useContext } from "react";
import { PostDetailsType } from "../types/post-details.types";
import { PostContext } from "../context/PostContext";

export const usePost = () => {
  const { posts } = useContext(PostContext);  

  const getPostById = (postId: number): PostDetailsType | undefined => {  
    return posts.find((post) => post.id === postId);
  };

  return { getPostById };
};