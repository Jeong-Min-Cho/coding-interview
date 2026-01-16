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
  if (title.trim().length > 100) {
    res.status(400).json({ error: 'Title must be 100 characters or less' });
    return;
  }
  if (!content || typeof content !== 'string' || content.trim() === '') {
    res.status(400).json({ error: 'Content is required' });
    return;
  }
  if (content.trim().length > 500) {
    res.status(400).json({ error: 'Content must be 500 characters or less' });
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

// PATCH /api/posts/:id/like - Toggle like on a post
router.patch('/:id/like', (req: Request, res: Response) => {
  const idParam = req.params.id;
  const id = parseInt(Array.isArray(idParam) ? idParam[0] : idParam, 10);

  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid post ID' });
    return;
  }

  const { browserId } = req.body as { browserId?: string };
  if (!browserId || typeof browserId !== 'string' || browserId.trim() === '') {
    res.status(400).json({ error: 'browserId is required' });
    return;
  }

  const post = store.like(id, browserId.trim());

  if (!post) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }

  res.json(post);
});

export default router;
