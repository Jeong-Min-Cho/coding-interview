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
      likedBy: [],
    };
    posts.push(post);
    return post;
  },

  like: (id: number, browserId: string): Post | undefined => {
    const post = posts.find((p) => p.id === id);
    if (post) {
      const index = post.likedBy.indexOf(browserId);
      if (index === -1) {
        // Not liked yet, add the browserId
        post.likedBy.push(browserId);
      } else {
        // Already liked, remove it (unlike)
        post.likedBy.splice(index, 1);
      }
    }
    return post;
  },

  // For testing - reset the store
  reset: (): void => {
    posts = [];
    nextId = 1;
  },
};
