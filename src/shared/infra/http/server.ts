import 'dotenv/config';
import express, { Response, Request, NextFunction } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import cors from 'cors';
import AppError from '@shared/errors/AppError';
import upload from '@config/upload';
import { errors } from 'celebrate';
import routes from './routes';
import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(upload.uploadsFolder));
app.get('/', (req, res) =>
  res.json({
    message: 'Hello World',
  }),
);
app.use('/', routes);
app.use(errors());
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
