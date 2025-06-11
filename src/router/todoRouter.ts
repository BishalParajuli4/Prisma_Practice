
import { Router } from "express";
import { createTodoController, deleteTodoController, getAllTodoController, getTodoByIdController, updateTodoController } from "../controller/todoController";
export const todoRouter = Router();

todoRouter.post("/", createTodoController);
todoRouter.put("/", updateTodoController);
todoRouter.get("/", getAllTodoController);
todoRouter.get("/:id", getTodoByIdController);
todoRouter.delete("/:id", deleteTodoController);