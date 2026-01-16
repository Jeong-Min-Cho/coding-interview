import { Link } from 'react-router-dom';
import type { Post } from '../types';
import { PostList } from '../components/PostList';

interface HomePageProps {
  posts: Post[];
  loading: boolean;
  error: string | null;
  currentBrowserId: string;
  onLike: (postId: number) => void;
}

export function HomePage({
  posts,
  loading,
  error,
  currentBrowserId,
  onLike,
}: HomePageProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Recent Posts</h2>
        <Link
          to="/create"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          + Create Post
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <PostList
        posts={posts}
        loading={loading}
        currentBrowserId={currentBrowserId}
        onLike={onLike}
      />
    </>
  );
}
