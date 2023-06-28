import React, { Dispatch, SetStateAction, useEffect } from "react";
import { PostDetailsType } from "../types/post-details.types";

interface PostContextType {
  posts: PostDetailsType[];
  setPosts: Dispatch<SetStateAction<PostDetailsType[]>>;
}

export const PostContext = React.createContext<PostContextType>({
  posts: [],
  setPosts: () => undefined,
});

interface PostProviderProps {
  children: React.ReactNode;
  initialPosts?: PostDetailsType[];
}

export const PostProvider: React.FC<PostProviderProps> = ({
  children,
  initialPosts = [],
}) => {
  const [posts, setPosts] = React.useState<PostDetailsType[]>(initialPosts);

  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      const parsedPosts: PostDetailsType[] = JSON.parse(storedPosts);
      if (parsedPosts.length > 0 && posts.length === 0) {
        setPosts(parsedPosts);
      }
    }
  }, [posts.length]);

  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem("posts", JSON.stringify(posts));
    }
  }, [posts]);

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
};
