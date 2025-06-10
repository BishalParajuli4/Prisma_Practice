
import { Request,Response } from "express"
import { Create_User_Model, delete_User_Model, getAll_User_Model, getUser_ById_Model, Update_User_Model } from "../models/user_model"


export const createUserContoller=async(req:Request,res:Response)=>{
   try{
     const created=await Create_User_Model(req.body)
    res.status(200).json(created)
   }
   catch{
    res.status(404).json("Unable to create users")
   }
}

export const updteUserController=async(req:Request,res:Response)=>{
    try{
        const u_id =Number(req.params.id)
        const {name,email,password}=req.body
        const updaetd=await Update_User_Model({u_id,name,email,password})
        res.status(200).json(updaetd)
    }
    catch{
        res.status(404).json("Unable to update")
    }
}
export const getUserController=async(req:Request,res:Response)=>{
    try{
        const data=await getAll_User_Model()
        res.status(200).json(data)
    }catch{
        res.status(404).json("Unable to fetch the data")
    }
}

export const getByidController=async(req:Request,res:Response)=>{
    try{
        const u_id = Number(req.params.id)
        const data=await getUser_ById_Model(u_id)
      
        res.status(200).json(data)
    }
    catch{
        res.status(404).json("Unable to find the data")
    }
}
export const deleteUserCOntroller=async(req:Request,res:Response)=>{
    try{
        const id = Number(req.params.id)
        const deleteget=await getUser_ById_Model(id)
        console.log(deleteget)
        const data=await delete_User_Model(id)
        res.status(200).json("User is deleted")
    }catch{
        res.status(404).json("Unable to delete user")
    }
}

