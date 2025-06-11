import { Request, Response } from "express";
import {
  Create_Todo_Model,
  delete_Todo_Model,
  getAll_Todo_Model,
  getTodo_ById_Model,
  Update_Todo_Model,
} from "../models/todo_Model";

export const createTodoController = async (req: Request, res: Response) => {
  try {
    const created = await Create_Todo_Model(req.body);
    res.status(200).json(created);
  } catch {
    res.status(404).json("Unable to create Todo");
  }
  return;
};
export const updateTodoController = async (req: Request, res: Response) => {
  try {
    const updated = await Update_Todo_Model(req.body);
    res.status(200).json(updated);
  } catch {
    res.status(404).json("Unable to update Todo");
  }
  return;
};
export const getAllTodoController = async (req: Request, res: Response) => {
  try {
    const data = await getAll_Todo_Model();
    res.status(200).json(data);
  } catch {
    res.status(404).json("Unable to fetch Todos");
  }
  return;
};
export const getTodoByIdController = async (req: Request, res: Response) => {
  try {
    const data = await getTodo_ById_Model(Number(req.params.id));
    res.status(200).json(data);
  } catch {
    res.status(404).json("Unable to fetch Todo");
  }
  return;
};
export const deleteTodoController = async (req: Request, res: Response) => {
  try {
    const data = await delete_Todo_Model(Number(req.params.id));
    res.status(200).json(data);
  } catch {
    res.status(404).json("Unable to delete Todo");
  }
  return;
};
