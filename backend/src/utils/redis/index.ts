import Redis from "ioredis";

export const redisClient = (
  port?: number,
  host?: string,
  username?: string,
  password?: string
): Redis => {
  return new Redis({
    port,
    host,
    username,
    password,
  });
};