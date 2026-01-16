import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import type { Post, CreatePostInput } from './types';
import { fetchPosts, createPost, likePost } from './api';
import { getBrowserId } from './utils/browserId';
import { HomePage } from './pages/HomePage';
import { CreatePostPage } from './pages/CreatePostPage';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [browserId] = useState(() => getBrowserId());

  const loadPosts = useCallback(async () => {
    try {
      const data = await fetchPosts();
      // Sort posts by createdAt descending (newest first)
      setPosts(data.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
      setError(null);
    } catch {
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleCreatePost = async (input: CreatePostInput) => {
    const newPost = await createPost(input);
    // Optimistically add new post to beginning
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleLike = async (postId: number) => {
    // Optimistic update
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        const isLiked = post.likedBy.includes(browserId);
        return {
          ...post,
          likedBy: isLiked
            ? post.likedBy.filter((id) => id !== browserId)
            : [...post.likedBy, browserId],
        };
      })
    );

    try {
      const updatedPost = await likePost(postId, browserId);
      // Update with server response
      setPosts((prev) =>
        prev.map((post) => (post.id === postId ? updatedPost : post))
      );
    } catch {
      // Revert on error
      loadPosts();
    }
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-2xl mx-auto py-8 px-4">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 text-center">
              Blog Posts
            </h1>
          </header>

          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  posts={posts}
                  loading={loading}
                  error={error}
                  currentBrowserId={browserId}
                  onLike={handleLike}
                />
              }
            />
            <Route
              path="/create"
              element={<CreatePostPage onSubmit={handleCreatePost} />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
