import type { Post } from '../types';
import { PostCard } from './PostCard';

interface PostListProps {
  posts: Post[];
  loading: boolean;
  currentBrowserId: string;
  onLike: (postId: number) => void;
}

export function PostList({
  posts,
  loading,
  currentBrowserId,
  onLike,
}: PostListProps) {
  if (loading) {
    return (
      <div className="text-center py-8 text-gray-500" data-testid="loading">
        Loading posts...
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500" data-testid="empty-state">
        No posts yet. Be the first to write one!
      </div>
    );
  }

  return (
    <div data-testid="post-list">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          currentBrowserId={currentBrowserId}
          onLike={onLike}
        />
      ))}
    </div>
  );
}
