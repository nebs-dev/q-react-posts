import { CommentType } from "../types/comment.types";
import { PostType } from "../types/post.types";
import { UserType } from "../types/user.types";

const BASE_URL = import.meta.env.VITE_API_URL

export const fetchPosts = async (): Promise<PostType[]> => {
  const response = await fetch(`${BASE_URL}/posts`);
  const data: PostType[] = await response.json();
  return data;
}

export const fetchPost = async (id: number): Promise<PostType> => {
  const response = await fetch(`${BASE_URL}/posts/${id}`);
  const data: PostType = await response.json();
  return data;
}

export const fetchComments = async (id: number): Promise<CommentType[]> => {
  const response = await fetch(`${BASE_URL}/posts/${id}/comments`);
  const data: CommentType[] = await response.json();
  return data;
}

export const fetchUser = async (id: number): Promise<UserType> => {
  const response = await fetch(`${BASE_URL}/users/${id}`);
  const data: UserType = await response.json();
  return data;
}
