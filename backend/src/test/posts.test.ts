import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app';
import { store } from '../store';

describe('Posts API', () => {
  beforeEach(() => {
    store.reset();
  });

  describe('GET /api/posts', () => {
    it('returns empty array initially', async () => {
      const response = await request(app).get('/api/posts');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('returns array of posts after creation', async () => {
      // Create a post first
      await request(app)
        .post('/api/posts')
        .send({ title: 'Test', content: 'Content', author: 'Author' });

      const response = await request(app).get('/api/posts');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toMatchObject({
        title: 'Test',
        content: 'Content',
        author: 'Author',
        likes: 0,
      });
    });
  });

  describe('POST /api/posts', () => {
    it('creates post with valid data', async () => {
      const response = await request(app)
        .post('/api/posts')
        .send({ title: 'My Post', content: 'Hello World', author: 'John' });

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        id: 1,
        title: 'My Post',
        content: 'Hello World',
        author: 'John',
        likes: 0,
      });
      expect(response.body.createdAt).toBeDefined();
    });

    it('returns 400 for missing title', async () => {
      const response = await request(app)
        .post('/api/posts')
        .send({ content: 'Hello', author: 'John' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });

    it('returns 400 for missing content', async () => {
      const response = await request(app)
        .post('/api/posts')
        .send({ title: 'Title', author: 'John' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });

    it('returns 400 for missing author', async () => {
      const response = await request(app)
        .post('/api/posts')
        .send({ title: 'Title', content: 'Content' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });
  });

  describe('PATCH /api/posts/:id/like', () => {
    it('increments like count', async () => {
      // Create a post first
      await request(app)
        .post('/api/posts')
        .send({ title: 'Test', content: 'Content', author: 'Author' });

      const response = await request(app).patch('/api/posts/1/like');

      expect(response.status).toBe(200);
      expect(response.body.likes).toBe(1);
    });

    it('increments like count multiple times', async () => {
      // Create a post first
      await request(app)
        .post('/api/posts')
        .send({ title: 'Test', content: 'Content', author: 'Author' });

      await request(app).patch('/api/posts/1/like');
      await request(app).patch('/api/posts/1/like');
      const response = await request(app).patch('/api/posts/1/like');

      expect(response.status).toBe(200);
      expect(response.body.likes).toBe(3);
    });

    it('returns 404 for non-existent post', async () => {
      const response = await request(app).patch('/api/posts/999/like');

      expect(response.status).toBe(404);
      expect(response.body.error).toBeDefined();
    });
  });
});
