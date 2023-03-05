import express, { Request, Response, NextFunction } from "express";
import { router } from './routes';
import cors from 'cors';

const app = express();

/**
 * A simple middleware that checks if your POST body is JSON.
 * If not it will send a Bad Request response.
 */
app.use((req: Request, res: Response, next: NextFunction) => {
    (req.method === 'POST' && req.headers["content-type"] !== "application/json") ? res.sendStatus(400): next();
});

app.use(cors());
app.use(express.json());
router(app);

export default app;
