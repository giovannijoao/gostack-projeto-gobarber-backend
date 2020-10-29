import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
interface UploadConfig {
  driver: 's3' | 'disk';
  tmpFolder: string;
  multer: {
    storage: multer.StorageEngine;
  };
  config: {
    disk: {
      uploadsFolder: string;
    };
    s3: {
      bucket: string;
      baseURL: string;
    };
  };
}

export default {
  driver: process.env.APP_STORAGE_DRIVER || 'disk',
  tmpFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;
        return callback(null, fileName);
      },
    }),
  },
  config: {
    disk: {
      uploadsFolder: path.resolve(tmpFolder, 'uploads'),
    },
    s3: {
      bucket: process.env.APP_S3_STORAGE_BUCKET as string,
      baseURL: process.env.APP_S3_BASE_URL,
    },
  },
} as UploadConfig;
