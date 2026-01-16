export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  likes: number;
}

export interface CreatePostInput {
  title: string;
  content: string;
  author: string;
}
