import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const fetchTodos = () => {
  return apiClient.get("/todos");
};

export const addTodo = (text: string) => {
  return apiClient.post("/todo", {
    text,
  });
};
