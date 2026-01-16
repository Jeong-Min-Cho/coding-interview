import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';

// Mock the API
vi.mock('./api', () => ({
  fetchPosts: vi.fn(),
  createPost: vi.fn(),
  likePost: vi.fn(),
}));

// Mock the browserId utility
vi.mock('./utils/browserId', () => ({
  getBrowserId: vi.fn(() => 'test-browser-id'),
}));

import { fetchPosts } from './api';

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the Blog Posts heading', async () => {
    vi.mocked(fetchPosts).mockResolvedValue([]);
    render(<App />);
    expect(screen.getByText('Blog Posts')).toBeInTheDocument();
  });

  it('shows loading state initially', async () => {
    vi.mocked(fetchPosts).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );
    render(<App />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('shows empty state when no posts', async () => {
    vi.mocked(fetchPosts).mockResolvedValue([]);
    render(<App />);
    expect(
      await screen.findByText(/No posts yet/i)
    ).toBeInTheDocument();
  });

  it('renders posts when available', async () => {
    vi.mocked(fetchPosts).mockResolvedValue([
      {
        id: 1,
        title: 'Test Post',
        content: 'Test Content',
        author: 'Test Author',
        createdAt: '2024-01-01T00:00:00.000Z',
        likedBy: [],
      },
    ]);
    render(<App />);
    expect(await screen.findByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
