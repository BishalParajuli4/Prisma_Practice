import { prisma } from "../db";

export const Sign_in_Model = async (u_email: string, u_password: string) => {
  const checkUser = await prisma.user.findMany({
    where: {
      email: u_email,
      password: u_password,
    },
    select: { email: true, password: true },
  });
  return checkUser;
};

export async function Create_Signin_Model(data: {
  email: string;
  password: string;
  u_id: number;
}) {
  const createUser = await prisma.login.create({
    data: {
      u_id: data.u_id,
      email: data.email,
      password: data.password,
    },
  });
  return createUser;
}

export const Get_By_Mail = async (u_email: string) => {
  const checkUser = await prisma.login.findMany({
    where: {
      email: u_email,
    },
    select:{
      email:true
    }
    });
  return checkUser;
};