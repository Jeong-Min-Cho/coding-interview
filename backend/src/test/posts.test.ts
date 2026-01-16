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
        likedBy: [],
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
        likedBy: [],
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

    it('returns 400 for title exceeding 100 characters', async () => {
      const longTitle = 'a'.repeat(101);
      const response = await request(app)
        .post('/api/posts')
        .send({ title: longTitle, content: 'Content', author: 'John' });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('100');
    });

    it('returns 400 for content exceeding 500 characters', async () => {
      const longContent = 'a'.repeat(501);
      const response = await request(app)
        .post('/api/posts')
        .send({ title: 'Title', content: longContent, author: 'John' });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('500');
    });

    it('accepts title at exactly 100 characters', async () => {
      const maxTitle = 'a'.repeat(100);
      const response = await request(app)
        .post('/api/posts')
        .send({ title: maxTitle, content: 'Content', author: 'John' });

      expect(response.status).toBe(201);
      expect(response.body.title).toBe(maxTitle);
    });

    it('accepts content at exactly 500 characters', async () => {
      const maxContent = 'a'.repeat(500);
      const response = await request(app)
        .post('/api/posts')
        .send({ title: 'Title', content: maxContent, author: 'John' });

      expect(response.status).toBe(201);
      expect(response.body.content).toBe(maxContent);
    });
  });

  describe('PATCH /api/posts/:id/like', () => {
    it('adds browserId to likedBy array when liking', async () => {
      // Create a post first
      await request(app)
        .post('/api/posts')
        .send({ title: 'Test', content: 'Content', author: 'Author' });

      const response = await request(app)
        .patch('/api/posts/1/like')
        .send({ browserId: 'user-123' });

      expect(response.status).toBe(200);
      expect(response.body.likedBy).toEqual(['user-123']);
    });

    it('removes browserId from likedBy array when unliking (toggle)', async () => {
      // Create a post first
      await request(app)
        .post('/api/posts')
        .send({ title: 'Test', content: 'Content', author: 'Author' });

      // Like
      await request(app)
        .patch('/api/posts/1/like')
        .send({ browserId: 'user-123' });

      // Unlike (same browserId again)
      const response = await request(app)
        .patch('/api/posts/1/like')
        .send({ browserId: 'user-123' });

      expect(response.status).toBe(200);
      expect(response.body.likedBy).toEqual([]);
    });

    it('allows different browserIds to like the same post', async () => {
      // Create a post first
      await request(app)
        .post('/api/posts')
        .send({ title: 'Test', content: 'Content', author: 'Author' });

      // First user likes
      await request(app)
        .patch('/api/posts/1/like')
        .send({ browserId: 'user-123' });

      // Second user likes
      const response = await request(app)
        .patch('/api/posts/1/like')
        .send({ browserId: 'user-456' });

      expect(response.status).toBe(200);
      expect(response.body.likedBy).toEqual(['user-123', 'user-456']);
    });

    it('returns 400 if browserId is missing', async () => {
      // Create a post first
      await request(app)
        .post('/api/posts')
        .send({ title: 'Test', content: 'Content', author: 'Author' });

      const response = await request(app)
        .patch('/api/posts/1/like')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('browserId');
    });

    it('returns 404 for non-existent post', async () => {
      const response = await request(app)
        .patch('/api/posts/999/like')
        .send({ browserId: 'user-123' });

      expect(response.status).toBe(404);
      expect(response.body.error).toBeDefined();
    });
  });
});
