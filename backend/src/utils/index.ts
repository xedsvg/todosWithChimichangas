import { Todo } from './db';
/**
 * A function that returns a random number between min and max.
 * Min and max values are included.
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} The random number.
 */
export const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const validateBodySchema = (body: Todo) => {
    for (let key in body) {
      if (key !== 'text') {
        return 'Body should only have an "text" property';
      }
    }

    if(!body.text) {
        return 'Body should have an "text" property';
    }

    return;
  }

export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export { logger } from './logger';
export { db, Todo, Todos, Tstatus } from "./db";
export { redisClient } from './redis';