import { Router } from "express";


import {
  createCategoryController,
  updateCategoryController,
  getAllCategoryController,
  getCategoryByIdController,
  deleteCategoryController,
} from "../controller/categoryController";
const categoryRouter = Router();

categoryRouter.post("/", createCategoryController);
categoryRouter.put("/:id", updateCategoryController);
categoryRouter.get("/", getAllCategoryController);
categoryRouter.get("/:id", getCategoryByIdController);
categoryRouter.delete("/:id", deleteCategoryController);

export default categoryRouter;
