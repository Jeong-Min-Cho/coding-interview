import express, { Request, Response } from 'express';
import cors from 'cors';
import postsRouter from './routes/posts';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Example API endpoint
app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Express!' });
});

// Posts API
app.use('/api/posts', postsRouter);

export default app;
