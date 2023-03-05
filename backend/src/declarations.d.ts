import { Redis, RedisCommander } from 'ioredis';
export {}

declare global {
    namespace Express {
      export interface Application {
        redisBinding: Redis,
        redisPub: (msg: string) => Promise<number>
      }
    }
  }