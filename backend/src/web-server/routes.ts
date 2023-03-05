import { Express, Request, Response } from "express";
import { db, Todo, Todos, Tstatus, sleep, randomIntFromInterval, validateBodySchema } from "../utils";
import { v4 as generateUUIDv4 } from "uuid";

export const router = (app: Express) => {

  app.get("/status", async (req: Request, res: Response) => {
    res.json({
      healthy: true,
      timestamp: Date.now(),
    });
  });

  app.get("/dummyfill", async (req:Request, res: Response) => {
    const numberOfEntries = randomIntFromInterval(5, 33);

    for( let i=0; i<numberOfEntries; i++) {
        const id = generateUUIDv4();
        const entry: Todo = {
            id,
            status: Tstatus.PENDING,
            timestamp: Date.now(),
            text: 'Lorem ipsum'
        }
        await db.push(`/${id}`, entry);
    }

    const todosFromDb = await db.getObject<Todos>("/");
    res.json(todosFromDb);
  });

  app.get("/todos", async (req: Request, res: Response) => {
    try {
        await db.reload();
        const allTodos = await db.getObject<Todos>("/");
        res.json(allTodos);
    } catch(e) {
        // When the db is empty it will throw a Unexpected end of JSON input
        res.sendStatus(204);
    }
  });

  app.post("/todo", async (req: Request, res: Response) => {
    const { body }: {body: Todo} = req;
    const bodySchemaValidationFail = validateBodySchema(body);
    
    if(bodySchemaValidationFail){
        res.status(400);
        res.send({
            "message": bodySchemaValidationFail
        });
    }

    else {
        const todo: Todo = {
            id: generateUUIDv4(),
            text: body.text,
            status: Tstatus.PENDING,
            timestamp: Date.now()
        };
        await db.reload();
        await db.push(`/${todo.id}`, todo);
        await app.redisPub(todo.id);
        res.json(todo);
    }
  });
};