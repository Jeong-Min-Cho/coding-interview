import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app';

describe('API Endpoints', () => {
  it('GET /api/health returns ok status', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'ok',
      message: 'Server is running',
    });
  });

  it('GET /api/hello returns greeting', async () => {
    const response = await request(app).get('/api/hello');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Hello from Express!',
    });
  });
});
