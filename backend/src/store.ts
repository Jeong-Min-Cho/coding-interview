import { Post, CreatePostInput } from './types';

let posts: Post[] = [];
let nextId = 1;

export const store = {
  getAll: (): Post[] => {
    return posts;
  },

  getById: (id: number): Post | undefined => {
    return posts.find((p) => p.id === id);
  },

  create: (input: CreatePostInput): Post => {
    const post: Post = {
      id: nextId++,
      title: input.title,
      content: input.content,
      author: input.author,
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    posts.push(post);
    return post;
  },

  like: (id: number): Post | undefined => {
    const post = posts.find((p) => p.id === id);
    if (post) {
      post.likes += 1;
    }
    return post;
  },

  // For testing - reset the store
  reset: (): void => {
    posts = [];
    nextId = 1;
  },
};
