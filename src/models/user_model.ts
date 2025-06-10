import { prisma } from "../db";

export async function Create_User_Model(data: {
  name: string;
  email: string;
  password: string;
}) {
  const createUser = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });
  return createUser;
}

export async function Update_User_Model(data: {
  u_id: number;
  name: string;
  email: string;
  password: string;
}) {
  const updated = await prisma.user.update({
    where: {
      u_id: data.u_id,
    },
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });
  return updated;
}
export async function getAll_User_Model() {
  const data = await prisma.user.findMany();
  return data;
}

export async function getUser_ById_Model(id: number) {
  const data = await prisma.user.findUnique({
    where: {
      u_id: id,
    },
  });
  return data;
}
export async function delete_User_Model(id: number) {
  const data = await prisma.user.delete({
    where: {
      u_id: id,
    },
  });
  return data;
}
