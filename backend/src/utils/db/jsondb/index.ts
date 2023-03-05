import { JsonDB, Config } from 'node-json-db';

const dbName = "todos";
const saveOnPush = true;
const saveAsHumanReadable = true;

export const db = new JsonDB(new Config(dbName, saveOnPush, saveAsHumanReadable, '/'));