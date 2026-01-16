import { useNavigate, Link } from 'react-router-dom';
import type { CreatePostInput } from '../types';
import { PostForm } from '../components/PostForm';

interface CreatePostPageProps {
  onSubmit: (input: CreatePostInput) => Promise<void>;
}

export function CreatePostPage({ onSubmit }: CreatePostPageProps) {
  const navigate = useNavigate();

  const handleSubmit = async (input: CreatePostInput) => {
    await onSubmit(input);
    navigate('/');
  };

  return (
    <>
      <div className="mb-6">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <span>&larr;</span> Back to Posts
        </Link>
      </div>

      <PostForm onSubmit={handleSubmit} />
    </>
  );
}
