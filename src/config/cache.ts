import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: 'redis';
  config: {
    redis: RedisOptions;
  };
}

export default {
  driver: 'redis',
  config: {
    redis: {
      port: process.env.APP_CACHE_REDIS_PORT || 6379,
      host: process.env.APP_CACHE_REDIS_HOST || '127.0.0.1',
      family: process.env.APP_CACHE_REDIS_FAMILY || 4, // 4 (IPv4) or 6 (IPv6)
      password: process.env.APP_CACHE_REDIS_HOST,
      db: process.env.APP_CACHE_REDIS_DB,
    },
  },
} as ICacheConfig;
