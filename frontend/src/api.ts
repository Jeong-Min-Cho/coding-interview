import type { Post, CreatePostInput } from './types';

const API_BASE = '/api';

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch(`${API_BASE}/posts`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

export async function createPost(input: CreatePostInput): Promise<Post> {
  const response = await fetch(`${API_BASE}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create post');
  }
  return response.json();
}

export async function likePost(id: number, browserId: string): Promise<Post> {
  const response = await fetch(`${API_BASE}/posts/${id}/like`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ browserId }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to like post');
  }
  return response.json();
}
