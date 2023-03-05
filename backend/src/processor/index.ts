import * as dotenv from "dotenv";
dotenv.config();

import { logger, redisClient, db, Todo, Tstatus } from "../utils";

logger.defaultMeta = { service: 'processor-service' }

const redis = redisClient(process.env.REDIS_PORT as unknown as number, process.env.REDIS_HOST, process.env.REDIS_USERNAME, process.env.REDIS_PASSWORD);
redis.subscribe(process.env.REDIS_CHANNEL!);

redis.on("message", async (channelName: string, uuid: string) => {
    try {
        await db.reload();
        const todo = await db.getObject<Todo>(`/${uuid}`);
        todo.status = Tstatus.RESOLVED;
        await db.push(`/${uuid}`, todo);
        await db.save();
        
        //@ts-expect-error
        process.send(`${uuid} done!`);

    } catch(e){
        logger.error(e);
    }
});

logger.info(`Processor init!`);