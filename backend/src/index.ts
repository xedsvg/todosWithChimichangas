import * as dotenv from "dotenv";
dotenv.config();

import { fork } from 'child_process';
import path from 'path';

import { logger, redisClient } from "./utils";
import app from './web-server';

const port = process.env.API_PORT || 8337;
const redis = redisClient(process.env.REDIS_PORT as unknown as number, process.env.REDIS_HOST, process.env.REDIS_USERNAME, process.env.REDIS_PASSWORD);

app.redisBinding = redis;
app.redisPub = async (msg: string) => redis.publish(process.env.REDIS_CHANNEL!, msg);

app.listen(port, () => {
    const childProcess = fork(path.resolve(`${__dirname}/processor`, 'index'), [], {
        stdio: ['inherit', 'inherit', 'inherit', 'ipc']
      });
      childProcess.on('message', (message) => {

        // This is neccessary because the child process sends back a bunch of info object when dependencies are finished loading
        if(typeof message === "string") logger.info(`Message received from child process: ${message}`);
      });
    logger.info(`App listening on port ${port}`);
});

// process exit handle cleanup