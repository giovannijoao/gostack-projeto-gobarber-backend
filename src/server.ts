import express, { Response, Request, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './shared/routes';
import 'reflect-metadata';
import './shared/database';
import upload from './config/upload';
import AppError from './shared/errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(upload.directory));
app.get('/', (req, res) =>
  res.json({
    message: 'Hello World',
  }),
);
app.use('/', routes);
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`✨ Server start on port ${PORT}`);
});
