import { prisma } from "../db";

export async function Create_Todo_Model(data: {
  u_id: number;
  c_id: number;
  name: string;
  updated_at: Date;
}) {
  const createTodo = await prisma.todo.create({
    data: {
      u_id: data.u_id,
      c_id: data.c_id,
      name: data.name,
      updated_at: data.updated_at,
    },
  });
  return createTodo;
}
export async function Update_Todo_Model(data: {
  t_id: number;
  u_id: number;
  c_id: number;
  name: string;
  updated_at: Date;
}) {
  const updated = await prisma.todo.update({
    where: {
      t_id: data.t_id,
    },
    data: {
      u_id: data.u_id,
      c_id: data.c_id,
      name: data.name,
      updated_at: data.updated_at,
    },
  });
  return updated;
}
export async function getAll_Todo_Model() {
  const data = await prisma.todo.findMany();
  return data;
}
export async function getTodo_ById_Model(id: number) {
  const data = await prisma.todo.findUnique({
    where: {
      t_id: id,
    },
  });
  return data;
}
export async function delete_Todo_Model(id: number) {
  const data = await prisma.todo.delete({
    where: {
      t_id: id,
    },
  });
  return data;
}
