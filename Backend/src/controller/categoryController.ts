
import { Request, Response } from "express";
import { Create_Category_Model, Update_Category_Model, getAll_Category_Model, getCategory_ById_Model, delete_Category_Model, getCategory_ByName_Model } from "../models/category_model";
export const createCategoryController = async(req:Request, res:Response) =>{
    try {
        const createCategory = await Create_Category_Model(req.body)
        res.status(200).json(createCategory)
    }
    catch{
        res.status(404).json("Unable to Create Category")
    }
    return;
}
export const updateCategoryController = async(req:Request, res:Response) =>{
    try {
        const id = Number (req.params.id);
        const updated = await Update_Category_Model(id,req.body)
        res.status(200).json(updated)
        
    }
    catch(error){
        console.log("UpdateCategoryController Error",error);
        res.status(404).json("Unable to Update Category")
    }
    return;
}
export const getAllCategoryController = async(req:Request, res:Response) =>{
    try {
        const data = await getAll_Category_Model()
        res.status(200).json(data)
    }
    catch{
        res.status(404).json("Unable to Get All Categories")
    }
    return;
}
export const getCategoryByIdController = async(req:Request, res:Response) =>{
    try {
        const data = await getCategory_ById_Model(Number(req.params.id))
        res.status(200).json(data)
    }
    catch{
        res.status(404).json("Unable to Get Category By Id")
    }
    return;
}
export const deleteCategoryController = async(req:Request, res:Response) =>{
    try {
        const data = await delete_Category_Model(Number(req.params.id))
        res.status(200).json(data)
    }
    catch{
        res.status(404).json("Unable to Delete Category")
    }
    return;
}

export const getCategoryByNameController = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        const data = await getCategory_ByName_Model(name);
        res.status(200).json(data);
    } catch {
        res.status(404).json("Unable to Get Category By Name");
    }
    return;
};
