import { CommentType } from "./comment.types";
import { PostType } from "./post.types";
import { UserType } from "./user.types";

export interface PostDetailsType extends PostType {  
  user: UserType;
  comments: CommentType[];
}