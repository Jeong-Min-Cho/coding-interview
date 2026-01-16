import { Router, Request, Response } from 'express';
import { store } from '../store';
import { CreatePostInput } from '../types';

const router = Router();

// GET /api/posts - Fetch all posts
router.get('/', (_req: Request, res: Response) => {
  const posts = store.getAll();
  res.json(posts);
});

// POST /api/posts - Create a new post
router.post('/', (req: Request, res: Response) => {
  const { title, content, author } = req.body as CreatePostInput;

  // Validation
  if (!title || typeof title !== 'string' || title.trim() === '') {
    res.status(400).json({ error: 'Title is required' });
    return;
  }
  if (!content || typeof content !== 'string' || content.trim() === '') {
    res.status(400).json({ error: 'Content is required' });
    return;
  }
  if (!author || typeof author !== 'string' || author.trim() === '') {
    res.status(400).json({ error: 'Author is required' });
    return;
  }

  const post = store.create({
    title: title.trim(),
    content: content.trim(),
    author: author.trim(),
  });

  res.status(201).json(post);
});

// PATCH /api/posts/:id/like - Like a post
router.patch('/:id/like', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid post ID' });
    return;
  }

  const post = store.like(id);

  if (!post) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }

  res.json(post);
});

export default router;
