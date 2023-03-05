export type Todos = Todo[];

export enum status {
  PENDING = "pending",
  RESOLVED = "processed"
}
export type Todo = {
  id: string;
  text: string;
  status: status;
  timestamp: number;
};
