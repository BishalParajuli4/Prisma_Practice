import { prisma } from "../db";

export async function Create_Category_Model(data: {
  name: string;
  u_id: number;
}) {
  const created = await prisma.category.create({
    data: {
      name: data.name,
      u_id: data.u_id,
    },
  });
  return created;
}

export async function Update_Category_Model(id:number, data: {
  name: string;
}) {
      console.log("Model",data.name);
  const updated = await prisma.category.update({
    where: {
      c_id: id,
    },
    data: {
      name: data.name,
    },

  });
      
  return updated;
}
export async function getAll_Category_Model() {
  const data = await prisma.category.findMany();
  return data;
}
export async function getCategory_ById_Model(id: number) {
  const data = await prisma.category.findUnique({
    where: {
      c_id: id,
    },
  });
  return data;
}
export async function delete_Category_Model(id: number) {
  const data = await prisma.category.delete({
    where: {
      c_id: id,
    },
  });
  return data;
}

export async function getCategory_ByName_Model(name: string){
  const data = await prisma.category.findMany({
    where:{
      name:name,
    },
  });
  return data;
}