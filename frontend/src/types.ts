export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  likedBy: string[];
}

export interface CreatePostInput {
  title: string;
  content: string;
  author: string;
}
