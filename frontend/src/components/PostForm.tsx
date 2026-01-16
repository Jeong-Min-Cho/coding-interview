import { useState, type FormEvent } from 'react';
import type { CreatePostInput } from '../types';

interface PostFormProps {
  onSubmit: (input: CreatePostInput) => Promise<void>;
}

interface ValidationErrors {
  title?: string;
  content?: string;
  author?: string;
}

export function PostForm({ onSubmit }: PostFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.trim().length > 100) {
      newErrors.title = 'Title must be 100 characters or less';
    }
    if (!content.trim()) {
      newErrors.content = 'Content is required';
    } else if (content.trim().length > 500) {
      newErrors.content = 'Content must be 500 characters or less';
    }
    if (!author.trim()) {
      newErrors.author = 'Author is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        content: content.trim(),
        author: author.trim(),
      });
      // Clear form on success
      setTitle('');
      setContent('');
      setAuthor('');
      setErrors({});
    } catch {
      setErrors({ title: 'Failed to create post. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-6 mb-6"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Create a New Post
      </h2>

      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter post title"
          disabled={submitting}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500" data-testid="title-error">
            {errors.title}
          </p>
        )}
        <p className="mt-1 text-xs text-gray-500">{title.length}/100</p>
      </div>

      <div className="mb-4">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.content ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Write your post content"
          disabled={submitting}
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-500" data-testid="content-error">
            {errors.content}
          </p>
        )}
        <p className="mt-1 text-xs text-gray-500">{content.length}/500</p>
      </div>

      <div className="mb-4">
        <label
          htmlFor="author"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Author
        </label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.author ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Your name"
          disabled={submitting}
        />
        {errors.author && (
          <p className="mt-1 text-sm text-red-500" data-testid="author-error">
            {errors.author}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {submitting ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  );
}
